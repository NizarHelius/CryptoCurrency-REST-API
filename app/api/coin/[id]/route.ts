import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const cache: { [key: string]: { data: unknown; timestamp: number } } = {}
const CACHE_DURATION = 30000

async function fetchFromCoinGecko(url: string) {
  const cacheKey = url
  const now = Date.now()

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data
  }

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const data = await response.json()
    cache[cacheKey] = { data, timestamp: now }
    return data
  } catch (error) {
    console.error("Error fetching coin details:", error)
    throw error
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`

    const data = await fetchFromCoinGecko(url)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch coin details" }, { status: 500 })
  }
}
