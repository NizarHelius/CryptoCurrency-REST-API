"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import GlobalStats from "@/components/global-stats"
import CryptoCard from "@/components/crypto-card"
import FilterPanel, { type FilterOptions } from "@/components/filter-panel"
import { getCoins } from "@/lib/api"

export default function Home() {
  const [coins, setCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredCoins, setFilteredCoins] = useState<any[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    priceMin: 0,
    priceMax: 100000,
    marketCapMin: 0,
    marketCapMax: 1000000000000,
    changeDirection: "all",
  })
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true)
        const data = await getCoins()
        setCoins(data)
      } catch (error) {
        console.error("Error fetching coins:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])

  useEffect(() => {
    let filtered = coins

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Price filter
    filtered = filtered.filter(
      (coin) => coin.current_price >= filters.priceMin && coin.current_price <= filters.priceMax,
    )

    // Market cap filter
    filtered = filtered.filter(
      (coin) => coin.market_cap >= filters.marketCapMin && coin.market_cap <= filters.marketCapMax,
    )

    // Change direction filter
    if (filters.changeDirection === "positive") {
      filtered = filtered.filter((coin) => coin.price_change_percentage_24h >= 0)
    } else if (filters.changeDirection === "negative") {
      filtered = filtered.filter((coin) => coin.price_change_percentage_24h < 0)
    }

    setFilteredCoins(filtered)
  }, [searchQuery, coins, filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />

        <GlobalStats />

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Top Cryptocurrencies"}
          </h2>
          <p className="text-slate-400">
            {filteredCoins.length} {filteredCoins.length === 1 ? "coin" : "coins"} found
          </p>
        </div>

        <FilterPanel onFilterChange={setFilters} />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="text-slate-400 mt-4">Loading cryptocurrencies...</p>
          </div>
        ) : filteredCoins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoins.map((coin) => (
              <CryptoCard key={coin.id} {...coin} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No cryptocurrencies found matching your filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
