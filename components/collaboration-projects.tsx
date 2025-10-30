"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Droplet, Zap, Trees } from "lucide-react"

const PROJECTS = [
  {
    title: "Join Local NGO Drives",
    impact: "500+ trees planted",
    reward: "250 EcoPoints",
    icon: Trees,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Sponsor Tree Plantation",
    impact: "1000+ trees/year",
    reward: "500 EcoPoints",
    icon: Leaf,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Adopt a Lake Project",
    impact: "Water quality +40%",
    reward: "750 EcoPoints",
    icon: Droplet,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Fund Solar Installations",
    impact: "100 kW capacity",
    reward: "1000 EcoPoints",
    icon: Zap,
    color: "from-yellow-500 to-yellow-600",
  },
]

export default function CollaborationProjects() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Partner with Change</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROJECTS.map((project, index) => {
          const Icon = project.icon
          return (
            <Card
              key={index}
              className="p-6 border-0 bg-card rounded-xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{project.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{project.impact}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{project.reward}</span>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Join Now
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
