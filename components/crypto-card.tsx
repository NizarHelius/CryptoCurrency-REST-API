"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"

interface CryptoCardProps {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
}

export default function CryptoCard({
  id,
  name,
  symbol,
  image,
  current_price,
  price_change_percentage_24h,
  market_cap,
  total_volume,
  circulating_supply,
}: CryptoCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(id))
  }, [id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
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

  const isPositive = price_change_percentage_24h >= 0

  return (
    <Link href={`/coin/${id}`}>
      <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img src={image || "/placeholder.svg"} alt={name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold text-slate-50">{name}</h3>
              <p className="text-slate-400 text-sm uppercase">{symbol}</p>
            </div>
          </div>
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle favorite"
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-slate-400"}`}
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

        <div className="space-y-3">
          <div>
            <p className="text-slate-400 text-sm mb-1">Price</p>
            <p className="text-2xl font-bold text-slate-50">${current_price.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {price_change_percentage_24h.toFixed(2)}%
            </span>
            <span className="text-slate-400 text-sm">24h</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/50">
            <div>
              <p className="text-slate-400 text-xs mb-1">Market Cap</p>
              <p className="text-slate-200 text-sm font-semibold">${(market_cap / 1e9).toFixed(2)}B</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Volume</p>
              <p className="text-slate-200 text-sm font-semibold">${(total_volume / 1e9).toFixed(2)}B</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
