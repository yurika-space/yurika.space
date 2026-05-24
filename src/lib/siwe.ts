/** Build a minimal EIP-4361 message for Django SIWE verification. */
export function buildSiweMessage(address: string, chainId = 84532): string {
  const domain = typeof window !== "undefined" ? window.location.host : "yurika.space"
  const uri = process.env.NEXT_PUBLIC_SITE_URL || `https://${domain}`
  const nonce = crypto.randomUUID().replace(/-/g, "")
  const issuedAt = new Date().toISOString()

  return `${domain} wants you to sign in with your Ethereum account:
${address}

Sign in to yurika.space Command Center.

URI: ${uri}
Version: 1
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}`
}
