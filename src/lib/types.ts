export type DomainStatus =
  | "pending"
  | "verified"
  | "vaulted"
  | "sharding"
  | "active"
  | "completed"
  | "withdrawn"

export interface User {
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

export interface Domain {
  id: string
  name: string
  tld: string
  description: string
  status: DomainStatus
  owner: number
  owner_display: string
  registrar: string
  ownership_proof_url?: string
  expiry_date: string | null
  vault_contract_address: string
  shard_contract_address: string
  chain_id: number
  funding_percentage?: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description: string
  pitch_deck_url?: string
  repository_url?: string
  media_url?: string
  campaign_id?: string | null
  is_attached?: boolean
  created_at: string
  updated_at: string
}

export interface ProjectSummary {
  id: string
  name: string
  description: string
  pitch_deck_url?: string
  repository_url?: string
  media_url?: string
}

export interface ShardCampaign {
  id: string
  domain: string
  domain_name: string
  title: string
  thesis: string
  project?: ProjectSummary | null
  total_shards: number
  shards_available: number
  price_per_shard_usd: string
  funding_target_usd: string
  funding_raised_usd: string
  funding_percentage: number
  starts_at: string | null
  ends_at: string | null
  governance_enabled: boolean
  quorum_percentage: number
  curator_count?: number
  forge_stage: string
  created_at: string
  updated_at: string
}

export interface GraphNode {
  node_type: string
  uid: string
  label: string
  sublabel: string
  sector: string
  geography: string
  metadata: Record<string, unknown>
}

export interface GraphDiscoverResponse {
  count: number
  results: GraphNode[]
  counts_by_type?: Record<string, number>
  offline?: boolean
}

export interface AuthTokens {
  access: string
  refresh: string
  user: User
}

export interface CreateDomainPayload {
  name: string
  tld: string
  description?: string
  registrar?: string
}

export interface CreateProjectPayload {
  name: string
  description?: string
  pitch_deck_url?: string
  repository_url?: string
  media_url?: string
}

export interface CreateCampaignPayload {
  domain: string
  project_id: string
  title: string
  thesis: string
  total_shards: number
  shards_available: number
  price_per_shard_usd: number
  funding_target_usd: number
  quorum_percentage?: number
  governance_enabled?: boolean
  forge_stage?: string
}
