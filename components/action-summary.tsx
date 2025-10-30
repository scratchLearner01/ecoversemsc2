"use client"

import { Card } from "@/components/ui/card"
import CountUpNumber from "@/components/count-up-number"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const summaryData = [
  { label: "CO₂ Saved", value: 245.8, unit: "kg", icon: "🌍" },
  { label: "Trees Planted", value: 14, unit: "", icon: "🌳" },
  { label: "Plastic Recycled", value: 28.5, unit: "kg", icon: "♻️" },
  { label: "Verified Actions", value: 33, unit: "", icon: "✓" },
]

const impactData = [
  { name: "Week 1", impact: 45 },
  { name: "Week 2", impact: 62 },
  { name: "Week 3", impact: 58 },
  { name: "Week 4", impact: 80 },
]

export default function ActionSummary() {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">Your Impact Summary</h2>
        <p className="text-muted-foreground mt-1">Track your overall contribution to sustainability</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, idx) => (
          <Card
            key={idx}
            className="rounded-xl p-6 border-border hover:shadow-lg hover:border-primary/30 transition-all duration-200 hover:bg-card/80 animate-fade-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <CountUpNumber
                    end={Math.floor(item.value)}
                    duration={1200}
                    className="text-3xl font-bold text-primary"
                  />
                  <span className="text-sm text-muted-foreground">{item.unit}</span>
                </div>
              </div>
              <span className="text-2xl">{item.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Impact Chart */}
      <Card className="rounded-xl p-6 border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Impact Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="impact" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
