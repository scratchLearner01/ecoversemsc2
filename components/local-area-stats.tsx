"use client"

import { Card } from "@/components/ui/card"
import { MapPin, TrendingDown } from "lucide-react"

const LOCAL_STATS = [
  { metric: "Local AIQ", value: 64, unit: "AQI", trend: "down" },
  { metric: "Eco Index", value: 78, unit: "/100", trend: "up" },
  { metric: "Avg Industry Points", value: 7250, unit: "pts", trend: "up" },
]

export default function LocalAreaStats() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        Local Area Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LOCAL_STATS.map((stat, index) => (
          <Card key={index} className="p-6 border-0 bg-card rounded-xl hover:shadow-lg transition-all">
            <p className="text-sm text-muted-foreground mb-2">{stat.metric}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.unit}</p>
              </div>
              <div className={`flex items-center gap-1 ${stat.trend === "down" ? "text-green-600" : "text-blue-600"}`}>
                <TrendingDown className={`w-4 h-4 ${stat.trend === "up" ? "rotate-180" : ""}`} />
                <span className="text-sm font-medium">{stat.trend === "down" ? "↓" : "↑"}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
