/** Unwrap DRF paginated `{ results: T[] }` or pass through a bare array. */
export function unwrapResults<T>(data: T[] | { results: T[] }): T[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === "object" && "results" in data) {
    return (data as { results: T[] }).results
  }
  return []
}
