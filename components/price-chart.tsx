"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PriceChartProps {
  data: Array<{ date: string; price: number }>
  isPositive: boolean
}

export default function PriceChart({ data, isPositive }: PriceChartProps) {
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Price History (7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#f1f5f9" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
