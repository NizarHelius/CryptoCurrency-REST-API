"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getCoins, getCoinDetails } from "@/lib/api"
import Link from "next/link"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const coin1Id = searchParams.get("coin1")
  const coin2Id = searchParams.get("coin2")

  const [coin1, setCoin1] = useState<any>(null)
  const [coin2, setCoin2] = useState<any>(null)
  const [allCoins, setAllCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCoin1, setSelectedCoin1] = useState(coin1Id || "")
  const [selectedCoin2, setSelectedCoin2] = useState(coin2Id || "")

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCoins()
        setAllCoins(data)
      } catch (error) {
        console.error("Error fetching coins:", error)
      }
    }

    fetchCoins()
  }, [])

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true)
        const promises = []

        if (selectedCoin1) {
          promises.push(getCoinDetails(selectedCoin1).then((data) => setCoin1(data)))
        }
        if (selectedCoin2) {
          promises.push(getCoinDetails(selectedCoin2).then((data) => setCoin2(data)))
        }

        await Promise.all(promises)
      } catch (error) {
        console.error("Error fetching coin details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (selectedCoin1 || selectedCoin2) {
      fetchCoinDetails()
    }
  }, [selectedCoin1, selectedCoin2])

  const ComparisonRow = ({ label, value1, value2 }: { label: string; value1: any; value2: any }) => (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-slate-700/50">
      <div className="font-semibold text-slate-300">{label}</div>
      <div className="text-slate-200">{value1}</div>
      <div className="text-slate-200">{value2}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Compare Cryptocurrencies</h1>

        {/* Coin Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <label className="block text-sm font-semibold mb-3">Select First Coin</label>
            <select
              value={selectedCoin1}
              onChange={(e) => setSelectedCoin1(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-blue-500"
            >
              <option value="">Choose a coin...</option>
              {allCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="glass rounded-xl p-6">
            <label className="block text-sm font-semibold mb-3">Select Second Coin</label>
            <select
              value={selectedCoin2}
              onChange={(e) => setSelectedCoin2(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-blue-500"
            >
              <option value="">Choose a coin...</option>
              {allCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="text-slate-400 mt-4">Loading comparison data...</p>
          </div>
        ) : coin1 && coin2 ? (
          <div className="glass rounded-xl p-8">
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-700/50">
              <div className="font-bold text-lg">Metric</div>
              <div className="flex items-center gap-3">
                <img src={coin1.image?.small || "/placeholder.svg"} alt={coin1.name} className="w-8 h-8 rounded-full" />
                <span className="font-bold">{coin1.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={coin2.image?.small || "/placeholder.svg"} alt={coin2.name} className="w-8 h-8 rounded-full" />
                <span className="font-bold">{coin2.name}</span>
              </div>
            </div>

            <ComparisonRow
              label="Current Price"
              value1={`$${coin1.market_data?.current_price?.usd?.toLocaleString()}`}
              value2={`$${coin2.market_data?.current_price?.usd?.toLocaleString()}`}
            />
            <ComparisonRow
              label="24h Change"
              value1={
                <span
                  className={coin1.market_data?.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}
                >
                  {coin1.market_data?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              }
              value2={
                <span
                  className={coin2.market_data?.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}
                >
                  {coin2.market_data?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              }
            />
            <ComparisonRow
              label="Market Cap"
              value1={`$${(coin1.market_data?.market_cap?.usd / 1e9)?.toFixed(2)}B`}
              value2={`$${(coin2.market_data?.market_cap?.usd / 1e9)?.toFixed(2)}B`}
            />
            <ComparisonRow
              label="24h Volume"
              value1={`$${(coin1.market_data?.total_volume?.usd / 1e9)?.toFixed(2)}B`}
              value2={`$${(coin2.market_data?.total_volume?.usd / 1e9)?.toFixed(2)}B`}
            />
            <ComparisonRow
              label="All-Time High"
              value1={`$${coin1.market_data?.ath?.usd?.toLocaleString()}`}
              value2={`$${coin2.market_data?.ath?.usd?.toLocaleString()}`}
            />
            <ComparisonRow
              label="All-Time Low"
              value1={`$${coin1.market_data?.atl?.usd?.toLocaleString()}`}
              value2={`$${coin2.market_data?.atl?.usd?.toLocaleString()}`}
            />
            <ComparisonRow
              label="Circulating Supply"
              value1={`${(coin1.market_data?.circulating_supply / 1e6)?.toFixed(2)}M`}
              value2={`${(coin2.market_data?.circulating_supply / 1e6)?.toFixed(2)}M`}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Select two coins to compare</p>
          </div>
        )}

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </main>

      <Footer />
    </div>
  )
}
