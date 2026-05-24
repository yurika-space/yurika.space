import type { APIRequestContext } from "@playwright/test"
import { test } from "@playwright/test"

export const apiURL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:8000/api"

export function uniqueId(prefix = "pw") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export async function requireDjango(request: APIRequestContext) {
  const health = await request.get(`${apiURL}/health/`)
  test.skip(!health.ok(), "Django API not running")
}

export interface RegisteredUser {
  access: string
  refresh: string
  user: {
    id: number
    username: string
    email: string
    wallet_address: string
    display_name: string
    is_founder: boolean
    is_curator: boolean
    is_verified: boolean
    forge_stage: string
  }
}

export async function registerUser(
  request: APIRequestContext,
  label: string
): Promise<RegisteredUser> {
  const id = uniqueId(label)
  const res = await request.post(`${apiURL}/auth/register/`, {
    data: {
      username: `${label}_${id}`,
      email: `${id}@${label}.test`,
      password: "TestPass123!",
      password_confirm: "TestPass123!",
    },
  })
  if (res.status() !== 201) {
    throw new Error(`register failed: ${res.status()} ${await res.text()}`)
  }
  const body = await res.json()
  return {
    access: body.access as string,
    refresh: body.refresh as string,
    user: body.user as RegisteredUser["user"],
  }
}

export interface VaultedCampaignFixture {
  founder: RegisteredUser
  domain: { id: string; name: string; status: string }
  campaign: { id: string; title: string; domain_name: string }
}

export async function seedVaultedCampaign(
  request: APIRequestContext,
  titlePrefix: string
): Promise<VaultedCampaignFixture> {
  const founder = await registerUser(request, "founder")
  const id = uniqueId(titlePrefix)
  const token = founder.access

  const domainRes = await request.post(`${apiURL}/domains/`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      name: `flow-${id}.test`,
      tld: "test",
      description: "User flow fixture domain",
    },
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
      description: "Playwright fixture project",
      pitch_deck_url: "https://example.com/pitch.pdf",
    },
  })
  const project = await projectRes.json()

  const campaignRes = await request.post(`${apiURL}/domains/campaigns/`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      domain: domain.id,
      project_id: project.id,
      title: `${titlePrefix} ${id}`,
      thesis: "Playwright user-flow fixture campaign",
      total_shards: 100,
      shards_available: 100,
      price_per_shard_usd: "10.000000",
      funding_target_usd: "1000.00",
      quorum_percentage: 51,
      governance_enabled: true,
      forge_stage: "01 Vault",
    },
  })
  const campaign = await campaignRes.json()

  return {
    founder,
    domain: { id: domain.id, name: domain.name, status: "vaulted" },
    campaign: {
      id: campaign.id,
      title: campaign.title as string,
      domain_name: campaign.domain_name as string,
    },
  }
}

export async function seedPendingDomain(
  request: APIRequestContext,
  founder: RegisteredUser
) {
  const id = uniqueId("domain")
  const res = await request.post(`${apiURL}/domains/`, {
    headers: { Authorization: `Bearer ${founder.access}` },
    data: {
      name: `pending-${id}.test`,
      tld: "test",
      description: "Pending domain for wizard flow",
    },
  })
  const domain = await res.json()
  await request.post(`${apiURL}/domains/${domain.id}/submit_proof/`, {
    headers: { Authorization: `Bearer ${founder.access}` },
    data: { ownership_proof_url: "https://example.com/proof.txt" },
  })
  return domain as { id: string; name: string; status: string }
}
