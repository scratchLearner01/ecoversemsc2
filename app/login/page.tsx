"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Leaf, Moon, Sun, Mail, Lock, ArrowRight } from "lucide-react"
import OTPVerification from "@/components/otp-verification"

export default function LoginPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userType, setUserType] = useState<"individual" | "industry" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType")
    if (storedUserType === "individual") {
      router.push("/dashboard/individual")
    } else if (storedUserType === "industry") {
      router.push("/dashboard/industry")
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (email && password && userType) {
        setShowOTP(true)
      } else {
        setError("Please fill in all fields")
      }
      setIsLoading(false)
    }, 800)
  }

  const handleOTPVerify = (otp: string) => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("userType", userType!)
      if (userType === "individual") {
        localStorage.setItem("userName", "Rohan Mehta")
        router.push("/dashboard/individual")
      } else {
        localStorage.setItem("industryName", "GreenTech Solutions Pvt Ltd")
        router.push("/dashboard/industry")
      }
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

  if (!userType) {
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

          <Card className="w-full max-w-2xl shadow-xl rounded-2xl p-8 border-0 backdrop-blur-sm bg-card/95">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="w-10 h-10 text-primary animate-bounce" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EcoVerse
                </h1>
              </div>
              <p className="text-lg text-muted-foreground font-medium">Choose your account type</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setUserType("individual")}
                className="group p-8 border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👤</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Individual</h3>
                <p className="text-sm text-muted-foreground mb-4">Track your eco actions and earn points</p>
                <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Get Started <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => setUserType("industry")}
                className="group p-8 border-2 border-secondary/20 rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏭</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Industry</h3>
                <p className="text-sm text-muted-foreground mb-4">Monitor sustainability and compliance</p>
                <div className="flex items-center justify-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                  Get Started <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline transition-colors">
                Create a new account
              </Link>
            </p>
          </Card>
        </div>
      </div>
    )
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
          <OTPVerification
            email={email}
            onVerify={handleOTPVerify}
            onBack={() => setShowOTP(false)}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }

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

        <Card className="w-full max-w-md shadow-xl rounded-2xl p-8 border-0 backdrop-blur-sm bg-card/95">
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setUserType(null)
                setEmail("")
                setPassword("")
                setError("")
              }}
              className="text-sm text-primary hover:underline mb-4 inline-flex items-center gap-1 font-semibold transition-colors"
            >
              ← Change account type
            </button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {userType === "individual" ? "Welcome Back" : "Industry Portal"}
            </h1>
            <p className="text-muted-foreground">
              {userType === "individual"
                ? "Track your actions. Earn eco points. Lead your city."
                : "Monitor. Improve. Earn EcoPoints."}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email or Phone
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg animate-slide-in-left border border-destructive/20">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-primary hover:underline font-semibold transition-colors">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending OTP..." : "Continue with OTP"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-lg border-border hover:bg-muted transition-colors bg-transparent"
          >
            Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              href={userType === "individual" ? "/signup" : "/signup/industry"}
              className="text-primary font-bold hover:underline transition-colors"
            >
              {userType === "individual" ? "Create a new account" : "Register your industry"}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
