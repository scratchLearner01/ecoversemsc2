"use client"

import { useState } from "react"
import { Leaf, Recycle, Users, MapPin } from "lucide-react"

interface TickerStripProps {
  stats: {
    co2_saved_kg: number
    trees_planted: number
    plastic_recycled_kg: number
    new_contributors: number
    cities_engaged: number
  }
}

const tickerItems = [
  { icon: Leaf, label: "CO₂ Saved", key: "co2_saved_kg", unit: "kg", color: "text-emerald-600" },
  { icon: Leaf, label: "Trees Planted", key: "trees_planted", unit: "", color: "text-emerald-600" },
  { icon: Recycle, label: "Plastic Recycled", key: "plastic_recycled_kg", unit: "kg", color: "text-emerald-600" },
  { icon: Users, label: "New Contributors", key: "new_contributors", unit: "", color: "text-emerald-600" },
  { icon: MapPin, label: "Cities Engaged", key: "cities_engaged", unit: "", color: "text-emerald-600" },
]

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M"
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K"
  }
  return value.toString()
}

export default function TickerStrip({ stats }: TickerStripProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-emerald-950/30 border-y border-emerald-200 dark:border-emerald-900 py-8 overflow-hidden shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-6 text-center uppercase tracking-widest">
          📊 This week's verified impact
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tickerItems.map((item, index) => {
            const Icon = item.icon
            const value = stats[item.key as keyof typeof stats] ?? 0

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-3 px-5 py-5 bg-white dark:bg-slate-800/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/40`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(value)}
                    {item.unit && <span className="text-xs ml-0.5">{item.unit}</span>}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
