"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, X, Users, Building2, MapPin } from "lucide-react"

interface SearchResult {
  people: any[]
  industries: any[]
  states: string[]
  cities: string[]
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult>({
    people: [],
    industries: [],
    states: [],
    cities: [],
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length < 2) {
      setResults({ people: [], industries: [], states: [], cities: [] })
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results)
        setIsOpen(true)
      } catch (error) {
        console.error("[v0] Search error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(fetchResults, 300)
    return () => clearTimeout(timer)
  }, [query])

  const totalResults = results.people.length + results.industries.length + results.states.length + results.cities.length

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search people, industries, states..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setResults({ people: [], industries: [], states: [], cities: [] })
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Searching...</div>
          ) : totalResults === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No results found</div>
          ) : (
            <div className="divide-y divide-border">
              {/* People Results */}
              {results.people.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    <Users className="w-3 h-3" />
                    People ({results.people.length})
                  </div>
                  <div className="space-y-2">
                    {results.people.slice(0, 3).map((person) => (
                      <Link
                        key={person.id}
                        href={`/profile/${person.id}`}
                        className="block p-2 rounded hover:bg-muted transition-colors"
                      >
                        <div className="font-medium text-sm text-foreground">{person.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {person.city}, {person.state} • {person.ecoPoints} points
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries Results */}
              {results.industries.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    <Building2 className="w-3 h-3" />
                    Industries ({results.industries.length})
                  </div>
                  <div className="space-y-2">
                    {results.industries.slice(0, 3).map((industry) => (
                      <Link
                        key={industry.id}
                        href={`/industry/${industry.id}`}
                        className="block p-2 rounded hover:bg-muted transition-colors"
                      >
                        <div className="font-medium text-sm text-foreground">{industry.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {industry.sector} • {industry.location}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* States Results */}
              {results.states.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    <MapPin className="w-3 h-3" />
                    States ({results.states.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.states.slice(0, 5).map((state) => (
                      <Link
                        key={state}
                        href={`/state/${state}`}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                      >
                        {state}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Cities Results */}
              {results.cities.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    <MapPin className="w-3 h-3" />
                    Cities ({results.cities.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.cities.slice(0, 5).map((city) => (
                      <Link
                        key={city}
                        href={`/city/${city}`}
                        className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-colors"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {totalResults > 10 && (
                <div className="p-3 text-center">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View all {totalResults} results
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
