"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingDown, AlertCircle } from "lucide-react"

interface IoTSectionProps {
  data: {
    co2Emission: number
    wasteOutput: number
    energyMix: { solar: number; thermal: number; hydro: number }
  }
}

export default function IoTAnalyticsSection({ data }: IoTSectionProps) {
  const iotReadings = [
    { parameter: "Air Quality (AQI)", value: 64, change: "-7%", trend: "positive" },
    { parameter: "CO₂ Output", value: "280 ppm", change: "-12%", trend: "positive" },
    { parameter: "Waste Output", value: "3.1 tons/week", change: "-8%", trend: "positive" },
  ]

  const co2Data = [
    { time: "Mon", value: 320 },
    { time: "Tue", value: 310 },
    { time: "Wed", value: 300 },
    { time: "Thu", value: 295 },
    { time: "Fri", value: 285 },
    { time: "Sat", value: 280 },
    { time: "Sun", value: 280 },
  ]

  const energyData = [
    { name: "Solar", value: data.energyMix.solar },
    { name: "Thermal", value: data.energyMix.thermal },
    { name: "Hydro", value: data.energyMix.hydro },
  ]

  const COLORS = ["#0f9d58", "#37bfae", "#74B9FF"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4">Live IoT Feed — Monitoring Your Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {iotReadings.map((reading, index) => (
            <Card key={index} className="p-6 border-0 bg-card rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{reading.parameter}</p>
                  <p className="text-2xl font-bold text-foreground">{reading.value}</p>
                </div>
                {reading.trend === "positive" ? (
                  <TrendingDown className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <p className={`text-sm font-medium ${reading.trend === "positive" ? "text-green-500" : "text-red-500"}`}>
                {reading.change} this week
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 bg-card rounded-xl">
          <h4 className="text-lg font-semibold text-foreground mb-4">CO₂ Emission Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={co2Data}>
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
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-0 bg-card rounded-xl">
          <h4 className="text-lg font-semibold text-foreground mb-4">Energy Source Mix</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={energyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {energyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
