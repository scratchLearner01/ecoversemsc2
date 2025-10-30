"use client"

import { Card } from "@/components/ui/card"
import { Award } from "lucide-react"

interface BadgesProps {
  ecoPoints: number
}

const BADGES = [
  { name: "Eco Starter", threshold: 1000, icon: "🌱", color: "from-green-500 to-green-600" },
  { name: "Sustainability Partner", threshold: 5000, icon: "🌿", color: "from-emerald-500 to-emerald-600" },
  { name: "Green Titan", threshold: 9000, icon: "🏆", color: "from-yellow-500 to-yellow-600" },
]

export default function EcoBadgesSystem({ ecoPoints }: BadgesProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Award className="w-6 h-6" />
        Eco Badges
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BADGES.map((badge, index) => {
          const isEarned = ecoPoints >= badge.threshold
          return (
            <Card
              key={index}
              className={`p-6 border-0 rounded-xl text-center transition-all ${
                isEarned
                  ? `bg-gradient-to-br ${badge.color} text-white shadow-lg`
                  : "bg-muted/50 text-muted-foreground opacity-50"
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="font-semibold mb-1">{badge.name}</h4>
              <p className="text-sm opacity-80">{badge.threshold.toLocaleString()}+ points</p>
              {isEarned && <p className="text-xs mt-2 opacity-90">Earned</p>}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
