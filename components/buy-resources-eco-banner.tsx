"use client"

import { Leaf, Coins } from "lucide-react"

export default function EcoPointsBanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Every Verified Purchase Adds to Your Eco Points!</h2>
              <p className="text-lg text-muted-foreground">
                Earn 1 Eco Point for every ₹10 spent on certified resources. Redeem your points for exclusive rewards
                and recognition.
              </p>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform">
                Redeem Rewards
              </button>
            </div>

            {/* Right Illustration */}
            <div className="flex items-center justify-center gap-8">
              <div className="animate-float">
                <Coins className="w-24 h-24 text-primary/40" />
              </div>
              <div className="animate-float" style={{ animationDelay: "1s" }}>
                <Leaf className="w-20 h-20 text-secondary/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
