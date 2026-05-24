/** Split "ai-health.com" into label + tld for Django Domain model. */
export function parseDomainInput(input: string): { name: string; tld: string } {
  const trimmed = input.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0]
  const parts = trimmed.split(".")
  if (parts.length < 2) {
    return { name: trimmed, tld: "com" }
  }
  const tld = parts.pop() || "com"
  const name = parts.join(".")
  return { name: name || trimmed, tld }
}
