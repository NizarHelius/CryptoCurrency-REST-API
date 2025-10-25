import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function AboutPage() {
  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "TailwindCSS", icon: "🎨" },
    { name: "Recharts", icon: "📊" },
    { name: "CoinGecko API", icon: "🪙" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">About CryptoScope</h1>
          <p className="text-xl text-slate-300">
            A professional cryptocurrency tracking platform built to showcase full-stack web development skills.
          </p>
        </div>

        {/* Project Overview */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            CryptoScope is a comprehensive cryptocurrency tracking web application that demonstrates modern web
            development practices. It features real-time market data, interactive charts, and a clean, professional user
            interface.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The application showcases the ability to build and consume REST APIs, handle dynamic data, create responsive
            designs, and implement advanced features like favorites management and intelligent filtering.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Real-Time Data", desc: "Live cryptocurrency prices and market data" },
              { title: "Interactive Charts", desc: "7-day price history visualization" },
              { title: "Favorites System", desc: "Save and manage your favorite coins" },
              { title: "Advanced Filtering", desc: "Filter by price, market cap, and performance" },
              { title: "Search Functionality", desc: "Quick search by coin name or symbol" },
              { title: "Responsive Design", desc: "Optimized for all device sizes" },
            ].map((feature, idx) => (
              <div key={idx} className="glass rounded-xl p-6">
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="glass rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <p className="font-semibold text-slate-200">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Architecture</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-blue-400 mb-2">Frontend</h3>
              <p className="text-slate-300">
                Built with React and Next.js, featuring server-side rendering, API routes, and optimized performance.
                TailwindCSS provides responsive styling with a modern dark theme.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-purple-400 mb-2">Backend API</h3>
              <p className="text-slate-300">
                Custom REST API layer built with Next.js API routes that fetches data from CoinGecko. Includes
                intelligent caching (30-60 seconds) to optimize performance and reduce API calls.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-pink-400 mb-2">Data Management</h3>
              <p className="text-slate-300">
                Client-side state management using React hooks and localStorage for favorites. Server-side caching for
                API responses to ensure fast load times.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Developer</h2>
          <p className="text-slate-300 mb-4">
            Built by a passionate full-stack developer focused on creating clean, professional, and user-friendly web
            applications.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.956-1.704 1.187 0 1.915.753 1.948 1.704 0 .946-.761 1.704-1.989 1.704zm1.581 11.597H3.635V9.724h3.283v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          Back to Home
        </Link>
      </main>

      <Footer />
    </div>
  )
}
