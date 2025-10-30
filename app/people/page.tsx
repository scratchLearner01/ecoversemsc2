"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import DashboardNavbar from "@/components/dashboard-navbar"
import { realData } from "@/lib/real-data"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Leaf, Star } from "lucide-react"

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [sortBy, setSortBy] = useState("points")

  const filteredPeople = useMemo(() => {
    let result = realData.people

    if (searchQuery) {
      result = result.filter(
        (person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.bio.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedState !== "all") {
      result = result.filter((person) => person.state === selectedState)
    }

    if (sortBy === "points") {
      result.sort((a, b) => b.ecoPoints - a.ecoPoints)
    } else if (sortBy === "actions") {
      result.sort((a, b) => b.actions - a.actions)
    } else if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    }

    return result
  }, [searchQuery, selectedState, sortBy])

  const states = ["all", ...new Set(realData.people.map((p) => p.state))]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar isDarkMode={false} onToggleDarkMode={() => {}} userName="User" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Members</h1>
          <p className="text-muted-foreground">Discover and connect with sustainability advocates</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state === "all" ? "All States" : state}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="points">Eco Points</option>
                <option value="actions">Actions</option>
                <option value="recent">Recently Joined</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <Link key={person.id} href={`/people/${person.id}`}>
              <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer h-full">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {person.avatar}
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-foreground mb-1">{person.name}</h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  {person.city}, {person.state}
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{person.bio}</p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{person.ecoPoints}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{person.actions} actions</div>
                </div>

                {/* Verified Badge */}
                {person.verified && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                    <Star className="w-3 h-3 fill-primary" />
                    Verified
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredPeople.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No members found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  )
}
