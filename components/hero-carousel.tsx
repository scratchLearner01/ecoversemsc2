"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CountUpNumber from "@/components/count-up-number"

const slides = [
  {
    id: 1,
    title: "India's collective impact this week",
    stats: [
      { label: "CO₂ saved", value: 184500, unit: "kg" },
      { label: "Trees planted", value: 2847, unit: "" },
      { label: "Recycled", value: 156800, unit: "kg" },
    ],
    cta1: "Join the Movement",
    cta2: "See City Rankings",
    bgGradient: "from-primary/20 to-secondary/20",
  },
  {
    id: 2,
    title: "Clean City Challenge",
    subtitle: "Join your city's teams and compete for sustainability",
    progress: 78,
    cities: 26,
    cta1: "Participate",
    cta2: "View Leaderboard",
    bgGradient: "from-secondary/20 to-primary/20",
  },
  {
    id: 3,
    title: "Track. Verify. Reward.",
    subtitle: "Make sustainability visible and earn EcoPoints",
    cta1: "How it works",
    cta2: "Get Started",
    bgGradient: "from-primary/10 to-secondary/10",
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  return (
    <div
      className="relative w-full h-96 md:h-[420px] bg-gradient-to-br from-background to-muted overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-600 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />
          <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 text-center">
            <div className="animate-slide-in-left max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{slide.title}</h1>

              {/* Slide 1 - Stats */}
              {index === 0 && (
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
                  {slide.stats?.map((stat, i) => (
                    <div key={i} className="text-center animate-count-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="text-3xl md:text-4xl font-bold text-primary">
                        <CountUpNumber value={stat.value} />
                        {stat.unit && <span className="text-lg">{stat.unit}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Slide 2 - Progress */}
              {index === 1 && (
                <div className="mb-8">
                  <p className="text-lg text-muted-foreground mb-4">{slide.subtitle}</p>
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{slide.cities} cities joined</span>
                      <span className="text-sm font-medium text-primary">{slide.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                        style={{ width: `${slide.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3 - Mission */}
              {index === 2 && <p className="text-lg text-muted-foreground mb-8">{slide.subtitle}</p>}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-200 px-8 py-3 text-base animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.cta1}
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-3 text-base bg-transparent animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.cta2}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-primary w-8" : "bg-white/50 hover:bg-white/70 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
