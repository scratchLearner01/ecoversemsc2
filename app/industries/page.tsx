"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import DashboardNavbar from "@/components/dashboard-navbar"
import { realData } from "@/lib/real-data"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Leaf, Star, Users } from "lucide-react"

export default function IndustriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [sortBy, setSortBy] = useState("points")

  const filteredIndustries = useMemo(() => {
    let result = realData.industries

    if (searchQuery) {
      result = result.filter(
        (industry) =>
          industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          industry.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
          industry.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          industry.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedSector !== "all") {
      result = result.filter((industry) => industry.sector === selectedSector)
    }

    if (sortBy === "points") {
      result.sort((a, b) => b.ecoPoints - a.ecoPoints)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "employees") {
      result.sort((a, b) => b.employees - a.employees)
    }

    return result
  }, [searchQuery, selectedSector, sortBy])

  const sectors = ["all", ...new Set(realData.industries.map((i) => i.sector))]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar isDarkMode={false} onToggleDarkMode={() => {}} userName="User" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Industries & Organizations</h1>
          <p className="text-muted-foreground">Explore leading sustainable businesses and initiatives</p>
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
                  placeholder="Search by name, sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Sector Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sector</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector === "all" ? "All Sectors" : sector}
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
                <option value="rating">Rating</option>
                <option value="employees">Employees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <Link key={industry.id} href={`/industries/${industry.id}`}>
              <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{industry.name}</h3>
                    <p className="text-sm text-muted-foreground">{industry.sector}</p>
                  </div>
                  {industry.verified && <Star className="w-5 h-5 fill-primary text-primary" />}
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  {industry.location}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{industry.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Eco Points</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      <Leaf className="w-3 h-3 text-primary" />
                      {industry.ecoPoints}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                    <div className="text-sm font-semibold text-foreground">{industry.rating}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Employees</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      <Users className="w-3 h-3" />
                      {industry.employees}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredIndustries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No industries found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  )
}
