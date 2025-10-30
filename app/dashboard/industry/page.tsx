"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import IndustryDashboardNavbar from "@/components/industry-dashboard-navbar"
import IndustrySummaryBar from "@/components/industry-summary-bar"
import ImprovementReportPanel from "@/components/improvement-report-panel"
import IoTAnalyticsSection from "@/components/iot-analytics-section"
import ComplianceCertificationCenter from "@/components/compliance-certification-center"
import CollaborationProjects from "@/components/collaboration-projects"
import TaxBenefitCenter from "@/components/tax-benefit-center"
import EcoAnalyticsDashboard from "@/components/eco-analytics-dashboard"
import LeaderboardSection from "@/components/leaderboard-section"
import LocalAreaStats from "@/components/local-area-stats"
import EcoBadgesSystem from "@/components/eco-badges-system"
import IndustryAIAdvisor from "@/components/industry-ai-advisor"
import Footer from "@/components/footer"

export default function IndustryDashboardPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [industryData, setIndustryData] = useState<any>(null)

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "industry") {
      router.push("/login")
      return
    }

    const storedData = localStorage.getItem("industryData")
    if (storedData) {
      setIndustryData(JSON.parse(storedData))
    } else {
      setIndustryData({
        name: "GreenTech Solutions Pvt Ltd",
        type: "Manufacturing",
        city: "Pune",
        ecoPoints: 9250,
        rankCity: 3,
        verifiedActions: 12,
        complianceStatus: "Certified",
        lastVerification: "2025-10-18",
        co2Emission: 280,
        wasteOutput: 3.1,
        energyMix: { solar: 35, thermal: 45, hydro: 20 },
      })
    }
  }, [router])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!industryData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <IndustryDashboardNavbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="min-h-screen bg-background">
        <IndustrySummaryBar data={industryData} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <ImprovementReportPanel />
          <IoTAnalyticsSection data={industryData} />
          <ComplianceCertificationCenter />
          <CollaborationProjects />
          <TaxBenefitCenter ecoPoints={industryData.ecoPoints} />
          <EcoAnalyticsDashboard data={industryData} />
          <LeaderboardSection />
          <LocalAreaStats />
          <EcoBadgesSystem ecoPoints={industryData.ecoPoints} />
        </div>
      </main>
      <IndustryAIAdvisor data={industryData} />
      <Footer />
    </div>
  )
}
