"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ActionCardProps {
  icon: LucideIcon
  title: string
  description: string
  points: string
  onClick: () => void
}

export default function ActionCard({ icon: Icon, title, description, points, onClick }: ActionCardProps) {
  return (
    <Card className="group rounded-xl p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer hover:scale-105 hover:-translate-y-1 animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
            <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary">{points} points</span>
          <Button
            onClick={onClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm h-9 px-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Perform Action
          </Button>
        </div>
      </div>
    </Card>
  )
}
