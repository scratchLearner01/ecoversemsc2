"use client"

import { CheckCircle } from "lucide-react"
import { demoResources } from "@/lib/buy-resources-data"

export default function MarketplaceGrid({ filters, onViewDetails }) {
  const filteredResources = demoResources.filter((resource) => {
    if (filters.category !== "all" && resource.category.toLowerCase() !== filters.category) return false
    if (filters.sellerType !== "all" && resource.sellerType.toLowerCase() !== filters.sellerType) return false
    if (filters.location !== "all" && !resource.location.toLowerCase().includes(filters.location)) return false
    if (resource.price < filters.priceRange[0] || resource.price > filters.priceRange[1]) return false
    if (filters.ecoCertified && !resource.certified) return false
    return true
  })

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Available Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((resource, index) => (
            <div
              key={resource.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer card-hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onViewDetails(resource)}
            >
              {/* Image */}
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                <div className="text-4xl">{resource.icon}</div>
                {resource.certified && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-foreground line-clamp-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.seller}</p>
                <p className="text-xs text-muted-foreground">{resource.location}</p>

                {/* Details */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Price</span>
                    <span className="font-bold text-primary">₹{resource.price}/kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Stock</span>
                    <span className="text-sm">{resource.stock} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Eco Points</span>
                    <span className="text-sm text-primary font-bold">+{resource.ecoPoints}</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors button-pulse">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
