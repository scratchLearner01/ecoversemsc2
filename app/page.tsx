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
      <main className="min-h-screen bg-background">
        <HeroCarousel />
        <TickerStrip stats={demoData.nationalStats.lastWeek} />
        <StateTable states={demoData.states} />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
