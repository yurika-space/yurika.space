import { test, expect } from "@playwright/test"

const apiURL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:8000/api"

function uniqueId() {
  return `pw-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

test.describe("Phase 2 acceptance checklist", () => {
  test("API health — Django reachable", async ({ request }) => {
    const res = await request.get(`${apiURL}/health/`)
    expect(res.ok()).toBeTruthy()
  })

  test("Protocol stats — public aggregates", async ({ request }) => {
    const res = await request.get(`${apiURL}/stats/`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body).toHaveProperty("campaign_count")
    expect(body).toHaveProperty("genesis_mode")
  })

  test("Public graph teaser — no auth", async ({ request }) => {
    const res = await request.get(`${apiURL}/graph/discover/public/`)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty("count")
    expect(body).toHaveProperty("results")
  })

  test("Marketplace page — loads publicly", async ({ page, request }) => {
    const health = await request.get(`${apiURL}/health/`)
    test.skip(!health.ok(), "Django API not running")
    await page.goto("/marketplace")
    await expect(page.getByRole("heading", { name: /ACTIVE SHARD LISTINGS/i }).first()).toBeVisible({
      timeout: 15_000,
    })
  })

  test("Routes — /app and /pitch-deck production-ready", async ({ page }) => {
    await page.goto("/app")
    await expect(page.getByRole("heading", { name: /COMMAND.*CENTER/i })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByRole("navigation", { name: /Founder pipeline/i })).toBeVisible({
      timeout: 15_000,
    })
    await page.goto("/app/domains/vault")
    await expect(page.getByText(/DOMAIN VAULT WIZARD/i)).toBeVisible({ timeout: 15_000 })

    await page.goto("/pitch-deck")
    await expect(page.getByText(/YURIKA\.SPACE \/\/ PITCH DECK/i)).toBeVisible()
    const nextBtn = page.locator("footer").getByRole("button", { name: "NEXT" })
    await expect(nextBtn).toBeVisible()
    await nextBtn.click()
    await expect(page.getByText(/SLIDE 02/i)).toBeVisible({ timeout: 10_000 })
  })

  test("Landing — graph anchor and CTA modules", async ({ page }) => {
    await page.goto("/")
    const graphSection = page.locator("section#graph")
    await graphSection.scrollIntoViewIfNeeded()
    await expect(graphSection).toBeVisible({ timeout: 15_000 })
    await expect(graphSection.getByText(/KNOWLEDGE/i).first()).toBeVisible()

    await page.goto("/")
    await expect(page.getByRole("link", { name: /LAUNCH APP/i })).toBeVisible()
    await expect(page.getByRole("main").getByRole("button", { name: /JOIN WAITLIST/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /BROWSE SHARDS/i })).toHaveAttribute(
      "href",
      "/marketplace"
    )
  })

  test("Waitlist — Supabase insert via API route", async ({ request }) => {
    const email = `${uniqueId()}@yurika-checklist.test`
    const res = await request.post("/api/waitlist", {
      data: { email, userType: "founder" },
    })
    const body = await res.json()
    expect(res.status(), JSON.stringify(body)).toBe(200)
    expect(body.success).toBe(true)
  })

  test("Founder flow — register, domain create, vault (API)", async ({ request }) => {
    const id = uniqueId()
    const registerRes = await request.post(`${apiURL}/auth/register/`, {
      data: {
        username: `founder_${id}`,
        email: `${id}@founder.test`,
        password: "TestPass123!",
        password_confirm: "TestPass123!",
      },
    })
    expect(registerRes.status(), await registerRes.text()).toBe(201)
    const auth = await registerRes.json()
    const token = auth.access as string
    expect(token).toBeTruthy()

    const domainRes = await request.post(`${apiURL}/domains/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: `${id}.test`,
        tld: "test",
        description: "Playwright checklist domain",
      },
    })
    expect(domainRes.status()).toBe(201)
    const domain = await domainRes.json()
    expect(domain.status).toBe("pending")

    // Vault requires verified — expect 400 until verified
    const vaultFail = await request.post(`${apiURL}/domains/${domain.id}/vault/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    expect(vaultFail.status()).toBe(400)

    const proofRes = await request.post(`${apiURL}/domains/${domain.id}/submit_proof/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { ownership_proof_url: "https://example.com/dns-proof.txt" },
    })
    expect(proofRes.ok()).toBeTruthy()

    const verifyRes = await request.post(`${apiURL}/domains/${domain.id}/verify/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    expect(verifyRes.ok(), await verifyRes.text()).toBeTruthy()

    const vaultOk = await request.post(`${apiURL}/domains/${domain.id}/vault/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    expect(vaultOk.ok()).toBeTruthy()
    const vaulted = await vaultOk.json()
    expect(vaulted.status).toBe("vaulted")
  })

  test("Campaign publish + marketplace list (API)", async ({ request }) => {
    const id = uniqueId()
    const registerRes = await request.post(`${apiURL}/auth/register/`, {
      data: {
        username: `curator_${id}`,
        email: `${id}@curator.test`,
        password: "TestPass123!",
        password_confirm: "TestPass123!",
      },
    })
    expect(registerRes.status(), await registerRes.text()).toBe(201)
    const auth = await registerRes.json()
    const token = auth.access as string

    const domainRes = await request.post(`${apiURL}/domains/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: `campaign-${id}.test`, tld: "test", description: "campaign domain" },
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
        name: `Project ${id}`,
        description: "Checklist project",
        pitch_deck_url: "https://example.com/deck",
      },
    })
    expect(projectRes.status()).toBe(201)
    const project = await projectRes.json()

    const campaignRes = await request.post(`${apiURL}/domains/campaigns/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        domain: domain.id,
        project_id: project.id,
        title: `Checklist Round ${id}`,
        thesis: "Automated Phase 2 verification",
        total_shards: 1000,
        shards_available: 1000,
        price_per_shard_usd: "10.000000",
        funding_target_usd: "10000.00",
        quorum_percentage: 51,
        governance_enabled: true,
      },
    })
    expect(campaignRes.status()).toBe(201)

    const listRes = await request.get(`${apiURL}/domains/campaigns/`)
    expect(listRes.ok()).toBeTruthy()
    const payload = await listRes.json()
    const campaigns = Array.isArray(payload) ? payload : payload.results
    expect(Array.isArray(campaigns)).toBeTruthy()
    expect(campaigns.some((c: { title: string }) => c.title.includes("Checklist Round"))).toBeTruthy()
  })

  test("Curator invest — increases funding (API)", async ({ request }) => {
    const id = uniqueId()
    const reg = await request.post(`${apiURL}/auth/register/`, {
      data: {
        username: `invest_${id}`,
        email: `${id}@invest.test`,
        password: "TestPass123!",
        password_confirm: "TestPass123!",
      },
    })
    expect(reg.status()).toBe(201)
    const { access: founderToken } = await reg.json()

    const domainRes = await request.post(`${apiURL}/domains/`, {
      headers: { Authorization: `Bearer ${founderToken}` },
      data: { name: `invest-${id}.test`, tld: "test", description: "invest test" },
    })
    const domain = await domainRes.json()
    await request.post(`${apiURL}/domains/${domain.id}/verify/`, {
      headers: { Authorization: `Bearer ${founderToken}` },
    })
    await request.post(`${apiURL}/domains/${domain.id}/vault/`, {
      headers: { Authorization: `Bearer ${founderToken}` },
    })

    const projRes = await request.post(`${apiURL}/domains/projects/`, {
      headers: { Authorization: `Bearer ${founderToken}` },
      data: { name: `Invest Project ${id}`, description: "invest" },
    })
    const project = await projRes.json()

    const campRes = await request.post(`${apiURL}/domains/campaigns/`, {
      headers: { Authorization: `Bearer ${founderToken}` },
      data: {
        domain: domain.id,
        project_id: project.id,
        title: `Invest Round ${id}`,
        thesis: "Invest test",
        total_shards: 100,
        shards_available: 100,
        price_per_shard_usd: "5.000000",
        funding_target_usd: "500.00",
      },
    })
    expect(campRes.status()).toBe(201)
    const campaign = await campRes.json()

    const curatorReg = await request.post(`${apiURL}/auth/register/`, {
      data: {
        username: `cur_${id}`,
        email: `cur_${id}@test.com`,
        password: "TestPass123!",
        password_confirm: "TestPass123!",
      },
    })
    const { access: curatorToken } = await curatorReg.json()

    const investRes = await request.post(`${apiURL}/domains/campaigns/${campaign.id}/invest/`, {
      headers: { Authorization: `Bearer ${curatorToken}` },
      data: { shards: 10 },
    })
    expect(investRes.status()).toBe(201)

    const detail = await request.get(`${apiURL}/domains/campaigns/${campaign.id}/`)
    const updated = await detail.json()
    expect(Number(updated.funding_raised_usd)).toBeGreaterThan(0)
    expect(updated.shards_available).toBeLessThan(100)
  })

  test("Graph discover — Neo4j (API, authenticated)", async ({ request }) => {
    const id = uniqueId()
    const registerRes = await request.post(`${apiURL}/auth/register/`, {
      data: {
        username: `graph_${id}`,
        email: `${id}@graph.test`,
        password: "TestPass123!",
        password_confirm: "TestPass123!",
      },
    })
    expect(registerRes.status(), await registerRes.text()).toBe(201)
    const auth = await registerRes.json()
    const token = auth.access as string

    const graphRes = await request.get(`${apiURL}/graph/discover/?type=all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // 200 with empty results is OK; 503 means Neo4j down
    expect([200, 503]).toContain(graphRes.status())
    if (graphRes.status() === 200) {
      const body = await graphRes.json()
      expect(body).toHaveProperty("count")
      expect(body).toHaveProperty("results")
    }
  })

  test("Command Center UI — marketplace loads from API", async ({ page, request }) => {
    const health = await request.get(`${apiURL}/health/`)
    test.skip(!health.ok(), "Django API not running")

    await page.goto("/marketplace")
    await expect(page.getByRole("heading", { name: /ACTIVE SHARD LISTINGS/i }).first()).toBeVisible({
      timeout: 15_000,
    })

    const empty = page.getByText(/NO ACTIVE LISTINGS/i)
    const card = page.locator("a.terminal-window").first()

    await expect(empty.or(card)).toBeVisible({ timeout: 15_000 })
  })
})
