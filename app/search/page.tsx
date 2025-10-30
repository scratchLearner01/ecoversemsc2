"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import DashboardNavbar from "@/components/dashboard-navbar"
import { Users, Building2, MapPin, Leaf, Star } from "lucide-react"

interface SearchResult {
  people: any[]
  industries: any[]
  states: string[]
  cities: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult>({
    people: [],
    industries: [],
    states: [],
    cities: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results)
      } catch (error) {
        console.error("[v0] Search error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const totalResults = results.people.length + results.industries.length + results.states.length + results.cities.length

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar isDarkMode={false} onToggleDarkMode={() => {}} userName="User" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {isLoading ? "Searching..." : `Found ${totalResults} results for "${query}"`}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-muted-foreground">Searching...</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No results found for "{query}"</p>
            <p className="text-muted-foreground mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* People Results */}
            {results.people.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">People ({results.people.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.people.map((person) => (
                    <Link key={person.id} href={`/people/${person.id}`}>
                      <div className="bg-card rounded-lg border border-border p-4 hover:shadow-lg hover:border-primary transition-all duration-300">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                            {person.avatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{person.name}</h3>
                            <p className="text-xs text-muted-foreground">{person.bio}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Leaf className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{person.ecoPoints}</span>
                          </div>
                          <div className="text-muted-foreground">{person.city}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Industries Results */}
            {results.industries.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Industries ({results.industries.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.industries.map((industry) => (
                    <Link key={industry.id} href={`/industries/${industry.id}`}>
                      <div className="bg-card rounded-lg border border-border p-4 hover:shadow-lg hover:border-primary transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{industry.name}</h3>
                            <p className="text-xs text-muted-foreground">{industry.sector}</p>
                          </div>
                          {industry.verified && <Star className="w-4 h-4 fill-primary text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{industry.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Leaf className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{industry.ecoPoints}</span>
                          </div>
                          <div className="text-muted-foreground">{industry.rating}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* States Results */}
            {results.states.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">States ({results.states.length})</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.states.map((state) => (
                    <Link key={state} href={`/state/${state}`}>
                      <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                        {state}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Cities Results */}
            {results.cities.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">Cities ({results.cities.length})</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.cities.map((city) => (
                    <Link key={city} href={`/city/${city}`}>
                      <div className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors">
                        {city}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
