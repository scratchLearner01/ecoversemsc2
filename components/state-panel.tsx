"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface State {
  name: string
  region: string
  avgEcoPoints: number
  aiq: number
  waterPurity: number
  treesPerKm2: number
  populationM: number
}

interface StatePanelProps {
  state: State
  onClose: () => void
}

export default function StatePanel({ state, onClose }: StatePanelProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-bold text-foreground">{state.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Region */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Region</p>
            <p className="text-lg font-semibold text-foreground">{state.region}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Avg EcoPoints</p>
              <p className="text-2xl font-bold text-primary">{state.avgEcoPoints.toFixed(1)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">AIQ (24h)</p>
              <p className="text-2xl font-bold text-secondary">{state.aiq}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Water Purity</p>
              <p className="text-2xl font-bold text-primary">{state.waterPurity}%</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Trees/km²</p>
              <p className="text-2xl font-bold text-secondary">{state.treesPerKm2}</p>
            </div>
          </div>

          {/* Population */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Population</p>
            <p className="text-lg font-semibold text-foreground">{state.populationM}M</p>
          </div>

          {/* Progress Bar */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Sustainability Score</p>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${(state.avgEcoPoints / 100) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {((state.avgEcoPoints / 100) * 100).toFixed(0)}% of target
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-2 pt-4">
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg">
              Join Challenge
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent">
              Compare States
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
