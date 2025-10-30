"use client"

import { Leaf, RotateCw } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-float">
          <Leaf className="w-12 h-12 text-primary/30" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <RotateCw className="w-16 h-16 text-secondary/30" />
        </div>
        <div className="absolute top-1/2 right-10 animate-float" style={{ animationDelay: "2s" }}>
          <Leaf className="w-10 h-10 text-primary/20" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Buy Recycled.
              <br />
              Build Sustainably.
              <br />
              <span className="text-primary">Earn Eco Points.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join 2,40,000+ sustainable buyers helping India reduce 12,000+ tons of waste every month.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform">
                Start Shopping
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-80 animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <RotateCw className="w-32 h-32 text-primary/40 mx-auto animate-spin-slow" />
                <p className="mt-4 text-muted-foreground font-medium">Circular Economy in Action</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
