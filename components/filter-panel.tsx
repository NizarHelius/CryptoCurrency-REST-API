"use client"

import { useState } from "react"

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void
}

export interface FilterOptions {
  priceMin: number
  priceMax: number
  marketCapMin: number
  marketCapMax: number
  changeDirection: "all" | "positive" | "negative"
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    priceMin: 0,
    priceMax: 100000,
    marketCapMin: 0,
    marketCapMax: 1000000000000,
    changeDirection: "all",
  })

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      priceMin: 0,
      priceMax: 100000,
      marketCapMin: 0,
      marketCapMax: 1000000000000,
      changeDirection: "all",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
      </button>

      {isOpen && (
        <div className="glass rounded-xl p-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold mb-2">Price Range (USD)</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange({ priceMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange({ priceMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Market Cap Range */}
            <div>
              <label className="block text-sm font-semibold mb-2">Market Cap Range (USD)</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.marketCapMin}
                  onChange={(e) => handleFilterChange({ marketCapMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.marketCapMax}
                  onChange={(e) => handleFilterChange({ marketCapMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Change Direction */}
            <div>
              <label className="block text-sm font-semibold mb-2">24h Change</label>
              <select
                value={filters.changeDirection}
                onChange={(e) => handleFilterChange({ changeDirection: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
