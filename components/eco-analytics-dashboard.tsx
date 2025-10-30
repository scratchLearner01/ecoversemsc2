"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsDashboardProps {
  data: {
    ecoPoints: number
  }
}

export default function EcoAnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const ecoPointsData = [
    { month: "Jan", points: 2500 },
    { month: "Feb", points: 3200 },
    { month: "Mar", points: 4100 },
    { month: "Apr", points: 5300 },
    { month: "May", points: 6800 },
    { month: "Jun", points: 7500 },
    { month: "Jul", points: 8200 },
    { month: "Aug", points: 8900 },
    { month: "Sep", points: 9250 },
  ]

  const co2ReductionData = [
    { month: "Jan", reduction: 2 },
    { month: "Feb", reduction: 4 },
    { month: "Mar", reduction: 6 },
    { month: "Apr", reduction: 8 },
    { month: "May", reduction: 10 },
    { month: "Jun", reduction: 11 },
    { month: "Jul", reduction: 12 },
    { month: "Aug", reduction: 12 },
    { month: "Sep", reduction: 12 },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6 animate-fade-in">Eco Analytics Dashboard</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 bg-card rounded-xl hover:shadow-lg transition-all duration-200 animate-fade-in">
          <h4 className="text-lg font-semibold text-foreground mb-4">EcoPoints Growth</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ecoPointsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="points"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card
          className="p-6 border-0 bg-card rounded-xl hover:shadow-lg transition-all duration-200 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <h4 className="text-lg font-semibold text-foreground mb-4">CO₂ Reduction %</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={co2ReductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="reduction" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
