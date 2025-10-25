import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Simple in-memory cache
const cache: { [key: string]: { data: unknown; timestamp: number } } = {}
const CACHE_DURATION = 30000 // 30 seconds

async function fetchFromCoinGecko(url: string) {
  const cacheKey = url
  const now = Date.now()

  // Check cache
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data
  }

  // Retry loop with handling for 429 (rate limit). Honor Retry-After when provided.
  const maxAttempts = 3
  let attempt = 0
  while (attempt < maxAttempts) {
    try {
      const response = await fetch(url, {
        headers: {
          "Accept-Encoding": "gzip",
        },
      })

      if (response.status === 429) {
        // Rate limited — try to respect Retry-After header if present
        const ra = response.headers.get("Retry-After")
        const waitSeconds = ra ? parseInt(ra, 10) || 1 : Math.pow(2, attempt)
        console.warn(`CoinGecko 429 received, retrying after ${waitSeconds}s (attempt ${attempt + 1})`)
        await new Promise((r) => setTimeout(r, waitSeconds * 1000))
        attempt++
        continue
      }

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }

      const data = await response.json()

      // Cache the result
      cache[cacheKey] = { data, timestamp: now }

      return data
    } catch (error) {
      console.error("Error fetching from CoinGecko (attempt", attempt + 1, "):", error)
      // On last attempt, rethrow
      attempt++
      if (attempt >= maxAttempts) throw error
      // small backoff before retrying
      await new Promise((r) => setTimeout(r, 500 * attempt))
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "1"
    const order = searchParams.get("order") || "market_cap_desc"
    const ids = searchParams.get("ids")

    // If callers pass `ids`, fetch only those coins (avoids paging and hitting rate limits when client requests specific IDs)
    let url: string
    if (ids) {
      // ids expected to be comma-separated coin ids (e.g. bitcoin,ethereum)
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(
        ids,
      )}&sparkline=true&price_change_percentage=24h`
    } else {
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${order}&per_page=20&page=${page}&sparkline=true&price_change_percentage=24h`
    }

    const data = await fetchFromCoinGecko(url)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    // Return error details to the client to aid debugging
    return NextResponse.json({ error: "Failed to fetch coins", details: String(error) }, { status: 500 })
  }
}
