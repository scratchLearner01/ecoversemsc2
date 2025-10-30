"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronRight, Upload, MapPin, Moon, Sun } from "lucide-react"

const INDUSTRY_TYPES = [
  "Manufacturing",
  "Chemical",
  "IT",
  "Automotive",
  "Food",
  "Textile",
  "Energy",
  "Pharmaceuticals",
  "Steel",
  "Cement",
  "Other",
]

const ENERGY_SOURCES = ["Solar", "Thermal", "Hydro", "Wind", "Other"]

export default function IndustrySignupPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Step 1 - Industry Information
  const [industryName, setIndustryName] = useState("")
  const [cin, setCin] = useState("")
  const [industryType, setIndustryType] = useState("")
  const [yearEstablished, setYearEstablished] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [address, setAddress] = useState("")

  // Step 2 - Sustainability
  const [solarPercent, setSolarPercent] = useState("")
  const [thermalPercent, setThermalPercent] = useState("")
  const [hydroPercent, setHydroPercent] = useState("")
  const [otherPercent, setOtherPercent] = useState("")
  const [monthlyWaste, setMonthlyWaste] = useState("")
  const [co2Emission, setCo2Emission] = useState("")
  const [waterUsage, setWaterUsage] = useState("")
  const [hasCertificate, setHasCertificate] = useState(false)
  const [hasRecycling, setHasRecycling] = useState(false)

  // Step 3 - Verification
  const [allowVerification, setAllowVerification] = useState(false)
  const [allowLeaderboard, setAllowLeaderboard] = useState(false)

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem("userType", "industry")
      localStorage.setItem("industryName", industryName)
      localStorage.setItem(
        "industryData",
        JSON.stringify({
          name: industryName,
          type: industryType,
          city: address.split(",")[0],
          ecoPoints: 0,
          co2Emission: Number.parseInt(co2Emission),
          wasteOutput: Number.parseFloat(monthlyWaste),
          energyMix: {
            solar: Number.parseInt(solarPercent) || 0,
            thermal: Number.parseInt(thermalPercent) || 0,
            hydro: Number.parseInt(hydroPercent) || 0,
          },
        }),
      )
      router.push("/dashboard/industry")
    }, 1000)
  }

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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 py-8">
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors z-50"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
        </button>

        <Card className="w-full max-w-2xl shadow-xl rounded-2xl p-8 border-0 backdrop-blur-sm bg-card/95">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 transition-all duration-300 ${s < step ? "bg-primary" : "bg-muted"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {step === 1 && "Industry Information"}
                {step === 2 && "Sustainability & Environment"}
                {step === 3 && "Verification & Consent"}
              </h2>
              <p className="text-muted-foreground">
                {step === 1 && "Tell us about your industry"}
                {step === 2 && "Share your environmental metrics"}
                {step === 3 && "Review and confirm your details"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4 animate-slide-in-right">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Industry Name</label>
                    <Input
                      placeholder="GreenTech Solutions Pvt Ltd"
                      value={industryName}
                      onChange={(e) => setIndustryName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">CIN / Registration Number</label>
                    <Input
                      placeholder="U72900MH2020PTC123456"
                      value={cin}
                      onChange={(e) => setCin(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Industry Type</label>
                    <select
                      value={industryType}
                      onChange={(e) => setIndustryType(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select type</option>
                      {INDUSTRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Year of Establishment</label>
                    <Input
                      type="number"
                      placeholder="2020"
                      value={yearEstablished}
                      onChange={(e) => setYearEstablished(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Contact Email</label>
                    <Input
                      type="email"
                      placeholder="contact@greentech.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Contact Phone</label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <Input
                    placeholder="Pune, Maharashtra, India"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Logo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4 animate-slide-in-right">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Energy Source Mix (%)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ENERGY_SOURCES.map((source) => (
                      <div key={source} className="space-y-1">
                        <label className="text-xs text-muted-foreground">{source}</label>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          max="100"
                          value={
                            source === "Solar"
                              ? solarPercent
                              : source === "Thermal"
                                ? thermalPercent
                                : source === "Hydro"
                                  ? hydroPercent
                                  : otherPercent
                          }
                          onChange={(e) => {
                            if (source === "Solar") setSolarPercent(e.target.value)
                            else if (source === "Thermal") setThermalPercent(e.target.value)
                            else if (source === "Hydro") setHydroPercent(e.target.value)
                            else setOtherPercent(e.target.value)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Monthly Waste Output (tons)</label>
                    <Input
                      type="number"
                      placeholder="3.1"
                      value={monthlyWaste}
                      onChange={(e) => setMonthlyWaste(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Monthly CO₂ Emission (kg)</label>
                    <Input
                      type="number"
                      placeholder="280"
                      value={co2Emission}
                      onChange={(e) => setCo2Emission(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Water Usage (liters/day)</label>
                  <Input
                    type="number"
                    placeholder="50000"
                    value={waterUsage}
                    onChange={(e) => setWaterUsage(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasCertificate}
                      onChange={(e) => setHasCertificate(e.target.checked)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm font-medium text-foreground">Has Pollution Clearance Certificate</span>
                  </label>
                  {hasCertificate && (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                      <p className="text-sm text-muted-foreground">Upload certificate</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRecycling}
                      onChange={(e) => setHasRecycling(e.target.checked)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm font-medium text-foreground">Has Recycling/Reuse System</span>
                  </label>
                  {hasRecycling && (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                      <p className="text-sm text-muted-foreground">Upload proof</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4 animate-slide-in-right">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowVerification}
                      onChange={(e) => setAllowVerification(e.target.checked)}
                      className="w-4 h-4 rounded border-border mt-1"
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground block">Allow EcoVerse Verification</span>
                      <span className="text-xs text-muted-foreground">Via IoT sensors or in-person audit</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowLeaderboard}
                      onChange={(e) => setAllowLeaderboard(e.target.checked)}
                      className="w-4 h-4 rounded border-border mt-1"
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground block">Public Leaderboard Visibility</span>
                      <span className="text-xs text-muted-foreground">
                        Your industry will appear on public rankings
                      </span>
                    </div>
                  </label>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Summary</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Industry: {industryName}</p>
                    <p>Type: {industryType}</p>
                    <p>Location: {address}</p>
                    <p>
                      Energy Mix: {solarPercent}% Solar, {thermalPercent}% Thermal, {hydroPercent}% Hydro
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1 bg-transparent">
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !allowVerification || !allowLeaderboard}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
