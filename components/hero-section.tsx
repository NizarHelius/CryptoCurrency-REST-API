export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="gradient-text">Track Global Crypto Markets</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Real-time cryptocurrency prices, charts, and market data. Compare, track, and explore the world of digital
          assets.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all">
            Explore Markets
          </button>
          <button className="px-8 py-3 border border-slate-600 rounded-lg font-semibold text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
