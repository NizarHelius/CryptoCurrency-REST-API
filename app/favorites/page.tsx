"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CryptoCard from "@/components/crypto-card"
import { getCoins, getCoinsByIds } from "@/lib/api"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [allCoins, setAllCoins] = useState<any[]>([])
  const [favoriteCoins, setFavoriteCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(storedFavorites)
  }, [])

  // Fetch favorites by ids (uses server `/api/coins?ids=...`)
  const fetchCoins = async () => {
    try {
      setLoading(true)
      setError(null)

      if (favorites.length === 0) {
        setAllCoins([])
        setFavoriteCoins([])
        return
      }

      const data = await getCoinsByIds(favorites)
      setAllCoins(data)
  const filtered = data.filter((coin: any) => favorites.includes(coin.id))
      setFavoriteCoins(filtered)
    } catch (err: any) {
      console.error("Error fetching favorite coins by ids:", err)
      setError(err?.message ? String(err.message) : String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (favorites.length > 0) {
      fetchCoins()
    } else {
      setLoading(false)
      setFavoriteCoins([])
    }
  }, [favorites])

  const handleRemoveFavorite = (coinId: string) => {
    const updated = favorites.filter((id) => id !== coinId)
    localStorage.setItem("favorites", JSON.stringify(updated))
    setFavorites(updated)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
          <p className="text-slate-400">
            {favoriteCoins.length} {favoriteCoins.length === 1 ? "coin" : "coins"} saved
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="text-slate-400 mt-4">Loading favorites...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="max-w-xl mx-auto bg-red-900/10 border border-red-700/20 rounded-lg p-6">
              <h2 className="text-red-400 font-semibold mb-2">Failed to load favorites</h2>
              <p className="text-sm text-slate-300 mb-4">{error}</p>
              <div>
                <button
                  onClick={() => fetchCoins()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        ) : favoriteCoins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCoins.map((coin: any) => (
              <div key={coin.id} className="relative">
                <CryptoCard {...coin} />
                <button
                  onClick={() => handleRemoveFavorite(coin.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors z-10"
                  aria-label="Remove from favorites"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-slate-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <p className="text-slate-400 text-lg">No favorites yet</p>
            <p className="text-slate-500 text-sm mt-2">Start adding cryptocurrencies to your favorites!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
