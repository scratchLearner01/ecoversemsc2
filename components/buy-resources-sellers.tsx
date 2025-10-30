"use client"

import { Star } from "lucide-react"

const sellers = [
  {
    id: 1,
    name: "RePaper Hub",
    location: "Delhi",
    verified: "MoEFCC",
    rating: 4,
    icon: "📄",
  },
  {
    id: 2,
    name: "GreenCycle India",
    location: "Mumbai",
    verified: "CPCB",
    rating: 5,
    icon: "♻️",
  },
  {
    id: 3,
    name: "EcoRenew Pvt. Ltd.",
    location: "Pune",
    verified: "MPCB",
    rating: 4,
    icon: "🏭",
  },
  {
    id: 4,
    name: "EWaste India",
    location: "Bangalore",
    verified: "CPCB",
    rating: 4,
    icon: "🔌",
  },
]

export default function FeaturedSellers() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Trusted Green Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller, index) => (
            <div
              key={seller.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 card-hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{seller.icon}</div>
              <h3 className="font-bold text-lg mb-2">{seller.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{seller.location}</p>
              <div className="flex items-center gap-2 mb-3">
                {[...Array(seller.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full inline-block">
                Verified by {seller.verified}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
