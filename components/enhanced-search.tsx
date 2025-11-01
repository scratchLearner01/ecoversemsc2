"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { searchProfiles } from "@/lib/profiles-database"

export default function EnhancedSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (value.trim().length > 0) {
      setIsLoading(true)
      // Simulate API call delay for realistic UX
      const timeout = setTimeout(() => {
        const searchResults = searchProfiles(value)
        setResults(searchResults)
        setIsLoading(false)
        setIsOpen(true)
      }, 150)
      return () => clearTimeout(timeout)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search people, industries..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pl-9 pr-3 py-2 bg-muted text-foreground placeholder:text-muted-foreground rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
        )}
      </div>

      {isOpen && (query.trim().length > 0 || results.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-slide-in-down max-h-96 overflow-y-auto"
        >
          {results.length > 0 ? (
            <div className="divide-y divide-border">
              {results.map((profile, idx) => (
                <Link
                  key={profile.id}
                  href={`/profile/${profile.id}`}
                  onClick={() => {
                    setQuery("")
                    setResults([])
                    setIsOpen(false)
                  }}
                >
                  <div className="px-4 py-3 hover:bg-muted transition-colors duration-150 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white text-xs font-semibold`}
                      >
                        {profile.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                            {profile.name}
                          </p>
                          {profile.verified && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {profile.city}, {profile.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-primary">{profile.level}</p>
                        <p className="text-xs text-muted-foreground">{profile.ecoPoints} pts</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">No profiles found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
