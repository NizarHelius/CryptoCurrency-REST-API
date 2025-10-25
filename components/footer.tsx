export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            <p>Built with React, Next.js & TailwindCSS</p>
            <p className="mt-2">© 2025 CryptoScope. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
