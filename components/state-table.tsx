"use client"

import { useState } from "react"
import { ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatePanel from "@/components/state-panel"

interface State {
  name: string
  region: string
  avgEcoPoints: number
  aiq: number
  waterPurity: number
  treesPerKm2: number
  populationM: number
}

interface StateTableProps {
  states: State[]
}

type SortKey = keyof State
type SortOrder = "asc" | "desc"

export default function StateTable({ states: initialStates }: StateTableProps) {
  const [states, setStates] = useState(initialStates)
  const [sortKey, setSortKey] = useState<SortKey>("avgEcoPoints")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [selectedState, setSelectedState] = useState<State | null>(null)
  const [showDataSources, setShowDataSources] = useState(false)
  const [displayCount, setDisplayCount] = useState(7)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("desc")
    }

    const sorted = [...states].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })
    setStates(sorted)
  }

  const SortHeader = ({ label, sortableKey }: { label: string; sortableKey: SortKey }) => (
    <button
      onClick={() => handleSort(sortableKey)}
      className="flex items-center gap-1 hover:text-primary transition-colors group"
    >
      {label}
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-300 ${
          sortKey === sortableKey
            ? sortOrder === "desc"
              ? "rotate-0"
              : "rotate-180"
            : "opacity-0 group-hover:opacity-50"
        }`}
      />
    </button>
  )

  const displayedStates = states.slice(0, displayCount)
  const hasMore = displayCount < states.length

  return (
    <>
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">State Rankings</h2>
            <p className="text-muted-foreground">
              Explore local performance across all {states.length} Indian states{" "}
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">Demo data</span>
            </p>
          </div>
          <button
            onClick={() => setShowDataSources(true)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Info className="w-4 h-4" />
            Data & Sources
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">State</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary">
                  <SortHeader label="Avg EcoPoints" sortableKey="avgEcoPoints" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary">
                  <SortHeader label="AIQ (24h)" sortableKey="aiq" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary">
                  <SortHeader label="Water Purity" sortableKey="waterPurity" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary">
                  <SortHeader label="Trees/km²" sortableKey="treesPerKm2" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Population</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedStates.map((state, index) => (
                <tr
                  key={state.name}
                  className="border-b border-border hover:bg-muted/50 transition-all duration-200 group hover:shadow-md hover:-translate-y-1"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{state.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-semibold">{state.avgEcoPoints.toFixed(1)}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{state.aiq}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{state.waterPurity}%</td>
                  <td className="px-6 py-4 text-sm text-foreground">{state.treesPerKm2}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{state.populationM}M</td>
                  <td className="px-6 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedState(state)}
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {displayedStates.map((state, index) => (
            <div
              key={state.name}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-primary font-semibold">#{index + 1}</p>
                  <p className="text-lg font-semibold text-foreground">{state.name}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setSelectedState(state)} className="text-xs">
                  View
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">EcoPoints</p>
                  <p className="font-semibold text-foreground">{state.avgEcoPoints.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">AIQ</p>
                  <p className="font-semibold text-foreground">{state.aiq}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Water Purity</p>
                  <p className="font-semibold text-foreground">{state.waterPurity}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Trees/km²</p>
                  <p className="font-semibold text-foreground">{state.treesPerKm2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setDisplayCount(displayCount + 7)}
              variant="outline"
              className="px-8 py-2 border-primary text-primary hover:bg-primary/10"
            >
              View More States
            </Button>
          </div>
        )}

        {/* Show all states loaded message */}
        {!hasMore && displayCount > 7 && (
          <div className="flex justify-center mt-8">
            <p className="text-sm text-muted-foreground">All {states.length} states loaded</p>
          </div>
        )}
      </section>

      {/* State Panel */}
      {selectedState && <StatePanel state={selectedState} onClose={() => setSelectedState(null)} />}

      {/* Data Sources Modal */}
      {showDataSources && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowDataSources(false)}
        >
          <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-foreground mb-6">Data & Sources</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-foreground mb-1">TERI / CPCB</p>
                <p className="text-sm text-muted-foreground">Municipal solid waste baseline (~62M tonnes/year)</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Global Carbon Project</p>
                <p className="text-sm text-muted-foreground">Global CO₂ emissions 2024 (~37.4 Gt)</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">IQAir / AQICN</p>
                <p className="text-sm text-muted-foreground">City AQI examples and air quality data</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-6 pb-6 border-b border-border">
              All values shown are demo sample data for prototype purposes. Live integration will fetch real-time data
              from official sources.
            </p>
            <Button
              onClick={() => setShowDataSources(false)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
