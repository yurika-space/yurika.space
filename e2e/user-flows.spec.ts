import { test, expect } from "@playwright/test"
import { seedAuthSession, waitForSessionUI } from "./helpers/auth"
import {
  apiURL,
  registerUser,
  requireDjango,
  seedPendingDomain,
  seedVaultedCampaign,
} from "./helpers/fixtures"

test.describe("User flows (UI)", () => {
  test.beforeEach(async ({ request }) => {
    await requireDjango(request)
  })

  test("Founder wizard — verify and vault from seeded pending domain", async ({ page, request }) => {
    const founder = await registerUser(request, "wiz")
    await seedPendingDomain(request, founder)
    await seedAuthSession(page, founder)

    await page.goto("/app/domains/vault")
    await waitForSessionUI(page)
    await expect(page.getByText(/DOMAIN VAULT WIZARD/i)).toBeVisible({ timeout: 15_000 })

    await expect(page.getByRole("button", { name: /REQUEST VERIFICATION/i })).toBeVisible({
      timeout: 20_000,
    })
    await page.getByRole("button", { name: /REQUEST VERIFICATION/i }).click()

    await expect(page.getByText(/verified/i).first()).toBeVisible({ timeout: 10_000 })
    await page.getByRole("button", { name: /INITIATE VAULT/i }).click()
    await expect(page.getByRole("link", { name: /OPEN TOKENOMICS CONSOLE/i })).toBeVisible({
      timeout: 10_000,
    })
  })

  test("Publish campaign — shows marketplace link", async ({ page, request }) => {
    const founder = await registerUser(request, "pub")
    const id = `pub-${Date.now()}`
    const token = founder.access

    const domainRes = await request.post(`${apiURL}/domains/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: `vaulted-${id}.test`, tld: "test", description: "publish flow" },
    })
    const domain = await domainRes.json()
    await request.post(`${apiURL}/domains/${domain.id}/verify/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    await request.post(`${apiURL}/domains/${domain.id}/vault/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const projectRes = await request.post(`${apiURL}/domains/projects/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: `UI Project ${id}`,
        description: "Publish flow project",
        pitch_deck_url: "https://example.com/deck.pdf",
      },
    })
    const project = await projectRes.json()

    await seedAuthSession(page, founder)
    await page.goto(`/app/launch?domainId=${domain.id}`)
    await waitForSessionUI(page)

    await expect(page.getByRole("heading", { name: /TOKENOMICS CONSOLE/i }).last()).toBeVisible({
      timeout: 15_000,
    })

    const title = `UI Publish ${id}`
    await page.locator("#launch select").nth(0).selectOption(project.id)
    await page.locator("#launch select").nth(1).selectOption(domain.id)
    await page.locator("#launch input").first().fill(title)
    await expect(page.getByRole("button", { name: /PUBLISH CAMPAIGN/i })).toBeEnabled({ timeout: 10_000 })
    await page.getByRole("button", { name: /PUBLISH CAMPAIGN/i }).click()

    await expect(page.getByRole("link", { name: /View public campaign/i })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByRole("link", { name: /Founder dashboard/i })).toBeVisible()
  })

  test("Marketplace browse — row opens campaign detail", async ({ page, request }) => {
    const { campaign } = await seedVaultedCampaign(request, "Browse")

    await page.goto("/marketplace")
    await expect(page.getByRole("heading", { name: /ACTIVE SHARD LISTINGS/i }).first()).toBeVisible({
      timeout: 15_000,
    })

    await page.getByRole("link", { name: new RegExp(campaign.title) }).first().click()
    await expect(page).toHaveURL(new RegExp(`/marketplace/${campaign.id}`))
    await expect(page.getByText(/PROJECT/i).first()).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/Playwright user-flow fixture campaign/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /INVEST IN SHARDS/i })).toBeVisible()
  })

  test("Curator invest — modal updates funding on detail page", async ({ page, request }) => {
    const { campaign } = await seedVaultedCampaign(request, "Invest")
    const curator = await registerUser(request, "curator")
    await seedAuthSession(page, curator)

    await page.goto(`/marketplace/${campaign.id}`)
    await waitForSessionUI(page)
    await expect(page.getByRole("button", { name: /INVEST IN SHARDS/i })).toBeVisible({ timeout: 15_000 })

    await page.getByRole("button", { name: /INVEST IN SHARDS/i }).click()
    await expect(page.getByRole("button", { name: /CONFIRM INVESTMENT/i })).toBeVisible()

    await page.locator('input[type="number"]').fill("5")
    await page.getByRole("button", { name: /CONFIRM INVESTMENT/i }).click()

    await expect(page).toHaveURL(new RegExp(`/marketplace/${campaign.id}/invest/success`), {
      timeout: 15_000,
    })
    await expect(page.getByRole("heading", { name: /SHARDS.*CREDITED/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /VIEW PORTFOLIO/i })).toBeVisible()
  })

  test("Portfolio — shows holding after invest", async ({ page, request }) => {
    const { campaign } = await seedVaultedCampaign(request, "Port")
    const curator = await registerUser(request, "hold")

    await request.post(`${apiURL}/domains/campaigns/${campaign.id}/invest/`, {
      headers: { Authorization: `Bearer ${curator.access}` },
      data: { shards: 3 },
    })

    await seedAuthSession(page, curator)
    await page.goto("/app/portfolio")
    await waitForSessionUI(page)

    await expect(page.getByRole("heading", { name: /SHARD.*PORTFOLIO/i })).toBeVisible()
    await expect(page.getByRole("link", { name: campaign.domain_name })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole("cell", { name: "3", exact: true })).toBeVisible()
  })

  test("Forge — stage button updates current stage", async ({ page, request }) => {
    const { founder, campaign } = await seedVaultedCampaign(request, "Forge")
    await seedAuthSession(page, founder)

    await page.goto(`/app/forge?campaignId=${campaign.id}`)
    await waitForSessionUI(page)
    await expect(page.getByText(new RegExp(`Tracking:.*${campaign.domain_name}`))).toBeVisible({
      timeout: 15_000,
    })

    await page.getByRole("button").filter({ hasText: "MINT SHARDS" }).click()
    await expect(page.getByText(/Current stage:.*02 MINT SHARDS/i)).toBeVisible({ timeout: 10_000 })
  })

  test("Connector graph — landing section visible", async ({ page }) => {
    await page.goto("/")
    const graphSection = page.locator("section#graph")
    await graphSection.scrollIntoViewIfNeeded()
    await expect(graphSection).toBeVisible({ timeout: 15_000 })
    await expect(graphSection.getByText(/KNOWLEDGE/i).first()).toBeVisible()
  })
})
