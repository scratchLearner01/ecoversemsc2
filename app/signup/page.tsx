"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SignupStep1 from "@/components/signup-step1"
import SignupStep2 from "@/components/signup-step2"
import SignupStep3 from "@/components/signup-step3"

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
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
    // Store user data (demo)
    localStorage.setItem("userType", "individual")
    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userEmail", formData.email)

    // Trigger success animation
    const card = document.querySelector("[data-signup-card]")
    if (card) {
      card.classList.add("animate-slide-in-left")
    }

    setTimeout(() => {
      router.push("/dashboard/individual")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 py-12">
      <Card
        data-signup-card
        className="w-full max-w-2xl shadow-xl rounded-2xl p-8 border-0 backdrop-blur-sm bg-card/95"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Join EcoVerse</h1>
          <p className="text-muted-foreground">Create your account and start making an impact</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-1 mx-1 rounded-full transition-all duration-300 ${
                  step <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              ></div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">Step {currentStep} of 3</p>
        </div>

        {/* Step Content */}
        <div className="min-h-96">
          {currentStep === 1 && <SignupStep1 formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <SignupStep2 formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <SignupStep3 formData={formData} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={handlePrev}
            disabled={currentStep === 1}
            variant="outline"
            className="flex-1 rounded-lg border-border hover:bg-muted transition-colors bg-transparent"
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
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
            >
              Create Account
            </Button>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </Card>
    </div>
  )
}
