// Small fetch helper with retries to avoid transient failures
async function fetchWithRetry(input: RequestInfo, init?: RequestInit, retries = 2, backoffMs = 300) {
  let lastError: unknown
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(input, init)
      if (!res.ok) {
        const body = await res.text().catch(() => "<no body>")
        throw new Error(`HTTP ${res.status} ${res.statusText} - ${body}`)
      }
      return res
    } catch (err) {
      lastError = err
      if (attempt < retries) {
        // linear backoff
        await new Promise((r) => setTimeout(r, backoffMs * (attempt + 1)))
      }
    }
  }

  // If we get here, all attempts failed
  throw lastError
}

export async function getCoins(page = 1, order = "market_cap_desc") {
  const response = await fetchWithRetry(`/api/coins?page=${page}&order=${order}`)
  // response is already checked for ok in fetchWithRetry
  return response.json()
}

export async function getCoinsByIds(ids: string[]) {
  if (!ids || ids.length === 0) return []
  const encoded = encodeURIComponent(ids.join(","))
  const response = await fetchWithRetry(`/api/coins?ids=${encoded}`)
  return response.json()
}

export async function getCoinDetails(id: string) {
  const response = await fetchWithRetry(`/api/coin/${id}`)
  return response.json()
}

export async function getTrendingCoins() {
  const response = await fetchWithRetry("/api/trending")
  return response.json()
}

export async function getGlobalData() {
  const response = await fetchWithRetry("/api/global")
  return response.json()
}
