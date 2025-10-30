"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Trophy, TrendingUp } from "lucide-react"

const aqiData = [
  { day: "Mon", aqi: 90 },
  { day: "Tue", aqi: 85 },
  { day: "Wed", aqi: 88 },
  { day: "Thu", aqi: 82 },
  { day: "Fri", aqi: 84 },
  { day: "Sat", aqi: 89 },
  { day: "Sun", aqi: 87 },
]

const leaderboardData = [
  { rank: 1, name: "Aditi Rao", points: 3850, actions: 42, badge: "Emerald" },
  { rank: 2, name: "Rohan Mehta", points: 3460, actions: 37, badge: "Green Hero" },
  { rank: 3, name: "You", points: 3180, actions: 33, badge: "Eco Advocate", isUser: true },
  { rank: 4, name: "Priya Singh", points: 2950, actions: 31, badge: "Green Warrior" },
  { rank: 5, name: "Arjun Kumar", points: 2780, actions: 28, badge: "Eco Champion" },
]

export default function LocalInsights() {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">Local Area Insights</h2>
        <p className="text-muted-foreground mt-1">See how your city is performing and compete with local leaders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AQI Chart */}
        <Card className="rounded-xl p-6 border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Air Quality Index (7-Day Trend)</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aqiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" domain={[70, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "8px",
                }}
                formatter={(value) => [`AQI: ${value}`, "Air Quality"]}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: "var(--color-primary)", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-900 dark:text-blue-200">
              Data source: IQAir & CPCB (Central Pollution Control Board). Values from demo AQI feed for Bengaluru.
            </p>
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="rounded-xl p-6 border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Local Leaderboard</h3>
            <Trophy className="w-5 h-5 text-primary" />
          </div>

          <div className="space-y-2">
            {leaderboardData.map((entry, idx) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                  entry.isUser ? "bg-primary/10 border border-primary/30" : "hover:bg-muted border border-transparent"
                } animate-slide-in-left`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">
                  {entry.rank === 1 && <span className="text-lg">🥇</span>}
                  {entry.rank === 2 && <span className="text-lg">🥈</span>}
                  {entry.rank === 3 && <span className="text-lg">🥉</span>}
                  {entry.rank > 3 && <span className="text-foreground font-semibold">#{entry.rank}</span>}
                </div>

                {/* Name & Badge */}
                <div className="flex-grow">
                  <p className="font-semibold text-foreground text-sm">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.badge}</p>
                </div>

                {/* Points & Actions */}
                <div className="text-right">
                  <p className="font-bold text-primary text-sm">{entry.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{entry.actions} actions</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-xs text-green-900 dark:text-green-200">
              You're ranked #3 in Bengaluru! Keep contributing to climb higher.
            </p>
          </div>
        </Card>
      </div>

      {/* City Stats Summary */}
      <Card className="rounded-xl p-6 border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 hover:shadow-lg transition-all duration-200 animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-4">Bengaluru City Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200">
            <p className="text-sm text-muted-foreground">Active Contributors</p>
            <p className="text-2xl font-bold text-primary mt-1">12,847</p>
          </div>
          <div className="p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200">
            <p className="text-sm text-muted-foreground">Total EcoPoints</p>
            <p className="text-2xl font-bold text-secondary mt-1">2.3M</p>
          </div>
          <div className="p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200">
            <p className="text-sm text-muted-foreground">Trees Planted</p>
            <p className="text-2xl font-bold text-primary mt-1">45,230</p>
          </div>
          <div className="p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200">
            <p className="text-sm text-muted-foreground">CO₂ Saved (kg)</p>
            <p className="text-2xl font-bold text-secondary mt-1">892K</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
