"use client"

import { useEffect, useState } from "react"
import { getGlobalData } from "@/lib/api"

export default function GlobalStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getGlobalData()
        setStats(data.data)
      } catch (error) {
        console.error("Error fetching global stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div className="text-slate-400">Loading global stats...</div>
  if (!stats) return null

  const btcDominance = stats.btc_market_cap_percentage?.btc || 0
  const totalMarketCap = stats.total_market_cap?.usd || 0
  const totalVolume = stats.total_volume?.usd || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">Total Market Cap</p>
        <p className="text-2xl font-bold text-slate-50">${(totalMarketCap / 1e12).toFixed(2)}T</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">24h Volume</p>
        <p className="text-2xl font-bold text-slate-50">${(totalVolume / 1e9).toFixed(2)}B</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">BTC Dominance</p>
        <p className="text-2xl font-bold text-slate-50">{btcDominance.toFixed(2)}%</p>
      </div>
    </div>
  )
}
