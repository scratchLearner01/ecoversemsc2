"use client"

import { useState } from "react"
import { Leaf, Recycle, Users, MapPin } from "lucide-react"
import CountUpNumber from "@/components/count-up-number"

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
  { icon: Leaf, label: "CO₂ Saved", key: "co2_saved_kg", unit: "kg", color: "text-primary" },
  { icon: Leaf, label: "Trees Planted", key: "trees_planted", unit: "", color: "text-secondary" },
  { icon: Recycle, label: "Plastic Recycled", key: "plastic_recycled_kg", unit: "kg", color: "text-primary" },
  { icon: Users, label: "New Contributors", key: "new_contributors", unit: "", color: "text-secondary" },
  { icon: MapPin, label: "Cities Engaged", key: "cities_engaged", unit: "", color: "text-primary" },
]

export default function TickerStrip({ stats }: TickerStripProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-emerald-950/30 border-y border-emerald-200 dark:border-emerald-900 py-6 overflow-hidden shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-5 text-center uppercase tracking-widest">
          📊 This week's verified impact
        </p>
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {tickerItems.map((item, index) => {
            const Icon = item.icon
            const value = stats[item.key as keyof typeof stats]
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-white dark:bg-slate-800/60 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`p-2.5 rounded-lg ${item.color === "text-primary" ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-teal-100 dark:bg-teal-900/40"}`}
                >
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">
                    <CountUpNumber value={value} />
                    {item.unit && <span className="text-sm ml-1 font-semibold">{item.unit}</span>}
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
