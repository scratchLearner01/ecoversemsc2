"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardNavbar from "@/components/dashboard-navbar"
import StatusBar from "@/components/status-bar"
import ActionPanel from "@/components/action-panel"
import ActionSummary from "@/components/action-summary"
import LocalInsights from "@/components/local-insights"
import AIAssistant from "@/components/ai-assistant"
import Footer from "@/components/footer"

export default function IndividualDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    const name = localStorage.getItem("userName")

    if (userType !== "individual") {
      router.push("/login")
      return
    }

    setUserName(name || "User")
  }, [router])

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
      <DashboardNavbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} userName={userName} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <StatusBar />
          <ActionPanel />
          <ActionSummary />
          <LocalInsights />
        </div>
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
