"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`)
      setQuery("")
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search coins..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  )
}
