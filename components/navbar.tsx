"use client"

import Link from "next/link"
import { useState } from "react"
import SearchBar from "./search-bar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{"฿"}</span>
            </div>
            <span className="gradient-text font-bold text-xl hidden sm:inline">CryptoScope</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/favorites" className="text-slate-300 hover:text-blue-400 transition-colors">
              Favorites
            </Link>
            <Link href="/compare" className="text-slate-300 hover:text-blue-400 transition-colors">
              Compare
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-blue-400 transition-colors">
              About
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-xs mx-8">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
              Home
            </Link>
            <Link href="/favorites" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
              Favorites
            </Link>
            <Link href="/compare" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
              Compare
            </Link>
            <Link href="/about" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
              About
            </Link>
            <div className="px-4 py-2">
              <SearchBar />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
