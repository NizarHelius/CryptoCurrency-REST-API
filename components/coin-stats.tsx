interface CoinStatsProps {
  ath: number
  atl: number
  marketCap: number
  volume: number
  circulatingSupply: number
  totalSupply: number
  dominance: number
}

export default function CoinStats({
  ath,
  atl,
  marketCap,
  volume,
  circulatingSupply,
  totalSupply,
  dominance,
}: CoinStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">All-Time High</p>
        <p className="text-2xl font-bold text-slate-50">${ath.toLocaleString()}</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">All-Time Low</p>
        <p className="text-2xl font-bold text-slate-50">${atl.toLocaleString()}</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">Market Cap</p>
        <p className="text-2xl font-bold text-slate-50">${(marketCap / 1e9).toFixed(2)}B</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">24h Volume</p>
        <p className="text-2xl font-bold text-slate-50">${(volume / 1e9).toFixed(2)}B</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">Circulating Supply</p>
        <p className="text-2xl font-bold text-slate-50">{(circulatingSupply / 1e6).toFixed(2)}M</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-400 text-sm mb-2">Market Dominance</p>
        <p className="text-2xl font-bold text-slate-50">{dominance.toFixed(2)}%</p>
      </div>
    </div>
  )
}
