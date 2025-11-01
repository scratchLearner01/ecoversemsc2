"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import TickerStrip from "@/components/ticker-strip"
import StateTable from "@/components/state-table"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import { demoData } from "@/lib/demo-data"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showReduceMotion, setShowReduceMotion] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setShowReduceMotion(prefersReducedMotion)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 -z-50 overflow-hidden">
          {/* Gradient blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float opacity-40"></div>
          <div
            className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl animate-float opacity-40"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-3xl animate-float opacity-30"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <HeroCarousel />
          <TickerStrip stats={demoData.nationalStats.lastWeek} />
          <StateTable states={demoData.states} />
          <HowItWorks />
        </div>
      </main>
      <Footer />
    </div>
  )
}
