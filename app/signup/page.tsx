"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SignupStep1 from "@/components/signup-step1"
import SignupStep2 from "@/components/signup-step2"
import SignupStep3 from "@/components/signup-step3"
import OTPVerification from "@/components/otp-verification"
import { Leaf, Moon, Sun, CheckCircle2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showOTP, setShowOTP] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    vehicleType: "none",
    solarUser: false,
    wasteSegregation: false,
    commuteDistance: "",
  })

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType === "individual") {
      router.push("/dashboard/individual")
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [router])

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setShowOTP(true)
  }

  const handleOTPVerify = (otp: string) => {
    localStorage.setItem("userType", "individual")
    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userEmail", formData.email)

    const card = document.querySelector("[data-signup-card]")
    if (card) {
      card.classList.add("animate-slide-in-left")
    }

    setTimeout(() => {
      router.push("/dashboard/individual")
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

  if (showOTP) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
          <button
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors z-50"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
          </button>
          <OTPVerification email={formData.email} onVerify={handleOTPVerify} onBack={() => setShowOTP(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 py-12">
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors z-50"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
        </button>

        <Card
          data-signup-card
          className="w-full max-w-2xl shadow-xl rounded-2xl p-8 border-0 backdrop-blur-sm bg-card/95"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-primary animate-bounce" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Join EcoVerse
              </h1>
            </div>
            <p className="text-muted-foreground font-medium">Create your account and start making an impact</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-1 flex items-center">
                  <div
                    className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
                      step <= currentStep ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                    }`}
                  ></div>
                  {step < 3 && <div className="w-1"></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-muted-foreground">Step {currentStep} of 3</p>
              <p className="text-xs text-muted-foreground">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Eco Preferences"}
                {currentStep === 3 && "Review & Confirm"}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-96 mb-8">
            {currentStep === 1 && <SignupStep1 formData={formData} setFormData={setFormData} />}
            {currentStep === 2 && <SignupStep2 formData={formData} setFormData={setFormData} />}
            {currentStep === 3 && <SignupStep3 formData={formData} />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 1}
              variant="outline"
              className="flex-1 rounded-lg border-border hover:bg-muted transition-colors bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </Button>
            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Create Account
              </Button>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline transition-colors">
              Login here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
