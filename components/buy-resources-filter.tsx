"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FilterBar({ filters, onFiltersChange }) {
  const [expandedFilter, setExpandedFilter] = useState(null)

  const categories = ["All", "Plastic", "Metal", "Paper", "E-waste", "Compost", "Textile"]
  const sellerTypes = ["All", "Individual", "Industry", "NGO"]
  const locations = ["All India", "Delhi", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai"]
  const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Rating"]

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-4 items-center overflow-x-auto pb-2">
          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setExpandedFilter(expandedFilter === "category" ? null : "category")}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors whitespace-nowrap"
            >
              Category
              <ChevronDown className="w-4 h-4" />
            </button>
            {expandedFilter === "category" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 animate-slide-in-left">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleFilterChange("category", cat.toLowerCase())
                      setExpandedFilter(null)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Seller Type Filter */}
          <div className="relative">
            <button
              onClick={() => setExpandedFilter(expandedFilter === "seller" ? null : "seller")}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors whitespace-nowrap"
            >
              Seller Type
              <ChevronDown className="w-4 h-4" />
            </button>
            {expandedFilter === "seller" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 animate-slide-in-left">
                {sellerTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      handleFilterChange("sellerType", type.toLowerCase())
                      setExpandedFilter(null)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="relative">
            <button
              onClick={() => setExpandedFilter(expandedFilter === "location" ? null : "location")}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors whitespace-nowrap"
            >
              Location
              <ChevronDown className="w-4 h-4" />
            </button>
            {expandedFilter === "location" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 animate-slide-in-left max-h-64 overflow-y-auto">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      handleFilterChange("location", loc.toLowerCase())
                      setExpandedFilter(null)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg whitespace-nowrap">
            <span className="text-sm">₹{filters.priceRange[0]}</span>
            <input
              type="range"
              min="10"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])
              }
              className="w-24"
            />
            <span className="text-sm">₹{filters.priceRange[1]}</span>
          </div>

          {/* Eco Certified Toggle */}
          <button
            onClick={() => handleFilterChange("ecoCertified", !filters.ecoCertified)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filters.ecoCertified ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            Eco Certified Only
          </button>

          {/* Sort By */}
          <div className="relative ml-auto">
            <button
              onClick={() => setExpandedFilter(expandedFilter === "sort" ? null : "sort")}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors whitespace-nowrap"
            >
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
            {expandedFilter === "sort" && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 animate-slide-in-right">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      handleFilterChange("sortBy", opt.toLowerCase())
                      setExpandedFilter(null)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
