"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PriceChart from "@/components/price-chart"
import CoinStats from "@/components/coin-stats"
import { getCoinDetails } from "@/lib/api"

export default function CoinDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [coin, setCoin] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true)
        const data = await getCoinDetails(id)
        setCoin(data)

        // Process sparkline data for chart
        if (data.market_data?.sparkline_7d?.price) {
          const prices = data.market_data.sparkline_7d.price
          const now = new Date()
          const chartPoints = prices.map((price: number, index: number) => {
            const date = new Date(now.getTime() - (prices.length - index) * 24 * 60 * 60 * 1000)
            return {
              date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              price: Math.round(price * 100) / 100,
            }
          })
          setChartData(chartPoints)
        }

        // Check if favorite
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        setIsFavorite(favorites.includes(id))
      } catch (error) {
        console.error("Error fetching coin details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCoinDetails()
    }
  }, [id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (favorites.includes(id)) {
      const updated = favorites.filter((fav: string) => fav !== id)
      localStorage.setItem("favorites", JSON.stringify(updated))
      setIsFavorite(false)
    } else {
      favorites.push(id)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 mt-4">Loading coin details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-slate-400 text-lg">Coin not found</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentPrice = coin.market_data?.current_price?.usd || 0
  const priceChange24h = coin.market_data?.price_change_percentage_24h || 0
  const isPositive = priceChange24h >= 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={coin.image?.large || "/placeholder.svg"} alt={coin.name} className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="text-4xl font-bold">{coin.name}</h1>
              <p className="text-slate-400 text-lg uppercase">{coin.symbol}</p>
            </div>
          </div>
          <button
            onClick={toggleFavorite}
            className="p-3 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle favorite"
          >
            <svg
              className={`w-8 h-8 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-slate-400"}`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </button>
        </div>

        {/* Price Section */}
        <div className="glass rounded-xl p-8 mb-8">
          <div className="flex items-end gap-4 mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-2">Current Price</p>
              <p className="text-5xl font-bold text-slate-50">${currentPrice.toLocaleString()}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-lg font-semibold ${
                isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && <PriceChart data={chartData} isPositive={isPositive} />}

        {/* Stats */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Market Statistics</h2>
          <CoinStats
            ath={coin.market_data?.ath?.usd || 0}
            atl={coin.market_data?.atl?.usd || 0}
            marketCap={coin.market_data?.market_cap?.usd || 0}
            volume={coin.market_data?.total_volume?.usd || 0}
            circulatingSupply={coin.market_data?.circulating_supply || 0}
            totalSupply={coin.market_data?.total_supply || 0}
            dominance={coin.market_cap_rank || 0}
          />
        </div>

        {/* Description */}
        {coin.description?.en && (
          <div className="glass rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">About {coin.name}</h2>
            <p className="text-slate-300 leading-relaxed line-clamp-4">{coin.description.en.replace(/<[^>]*>/g, "")}</p>
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
