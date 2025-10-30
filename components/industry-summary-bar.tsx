"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import CountUpNumber from "@/components/count-up-number"
import { CheckCircle, TrendingUp, Award, Calendar } from "lucide-react"

interface SummaryBarProps {
  data: {
    ecoPoints: number
    rankCity: number
    verifiedActions: number
    complianceStatus: string
    lastVerification: string
  }
}

export default function IndustrySummaryBar({ data }: SummaryBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const summaryCards = [
    {
      label: "EcoPoints",
      value: data.ecoPoints,
      icon: Award,
      color: "from-primary to-primary/50",
      note: "Based on verified actions",
    },
    {
      label: "Rank in City",
      value: `#${data.rankCity}`,
      icon: TrendingUp,
      color: "from-secondary to-secondary/50",
      note: "Pune",
    },
    {
      label: "Verified Actions",
      value: data.verifiedActions,
      icon: CheckCircle,
      color: "from-green-500 to-green-500/50",
      note: "Monthly improvements",
    },
    {
      label: "Compliance Status",
      value: data.complianceStatus,
      icon: Calendar,
      color: "from-blue-500 to-blue-500/50",
      note: "Valid till Oct 2026",
    },
  ]

  return (
    <div className="bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-b border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Your Impact Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card
                key={index}
                className={`p-6 border-0 bg-gradient-to-br ${card.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? "animate-slide-in-left" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium opacity-90">{card.label}</p>
                    <div className="text-3xl font-bold mt-2">
                      {typeof card.value === "number" ? <CountUpNumber value={card.value} /> : card.value}
                    </div>
                  </div>
                  <Icon className="w-6 h-6 opacity-80" />
                </div>
                <p className="text-xs opacity-80">{card.note}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
