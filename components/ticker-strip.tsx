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
      className="w-full bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-border py-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-semibold text-muted-foreground mb-4 text-center">This week's verified impact</p>
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {tickerItems.map((item, index) => {
            const Icon = item.icon
            const value = stats[item.key as keyof typeof stats]
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center gap-3 px-4 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-foreground">
                    <CountUpNumber value={value} />
                    {item.unit && <span className="text-sm ml-1">{item.unit}</span>}
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
