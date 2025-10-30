"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp } from "lucide-react"

const LEADERBOARD_DATA = [
  { rank: 1, name: "Tata Motors", points: 12500, reduction: 18, badge: "Emerald Star" },
  { rank: 2, name: "Infosys", points: 10900, reduction: 15, badge: "Green Titan" },
  { rank: 3, name: "GreenTech Solutions", points: 9250, reduction: 12, badge: "Eco Partner" },
  { rank: 4, name: "Wipro", points: 8700, reduction: 11, badge: "Eco Partner" },
  { rank: 5, name: "HCL Technologies", points: 7900, reduction: 10, badge: "Green Starter" },
]

export default function LeaderboardSection() {
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false)

  return (
    <>
      <Card className="p-8 border-0 bg-card rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Leaderboard
          </h3>
          <Button
            onClick={() => setShowFullLeaderboard(true)}
            variant="outline"
            className="bg-transparent border-border"
          >
            View National Leaderboard
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Industry</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">EcoPoints</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Reduction</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Badge</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD_DATA.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-muted/50 transition-colors group cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {entry.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
                      {entry.rank === 2 && <Trophy className="w-5 h-5 text-gray-400" />}
                      {entry.rank === 3 && <Trophy className="w-5 h-5 text-orange-600" />}
                      <span className="font-semibold text-foreground">#{entry.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-foreground">{entry.name}</td>
                  <td className="py-4 px-4 text-foreground font-semibold">{entry.points.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {entry.reduction}%
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {entry.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
