"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Leaf, Moon, Sun } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userType, setUserType] = useState<"individual" | "industry" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
        localStorage.setItem("userType", userType)
        if (userType === "individual") {
          localStorage.setItem("userName", "Rohan Mehta")
          router.push("/dashboard/individual")
        } else {
          localStorage.setItem("industryName", "GreenTech Solutions Pvt Ltd")
          router.push("/dashboard/industry")
        }
      } else {
        setError("Please fill in all fields")
      }
      setIsLoading(false)
    }, 800)
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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">EcoVerse</h1>
              </div>
              <p className="text-lg text-muted-foreground">Choose your login type</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setUserType("individual")}
                className="p-6 border-2 border-primary rounded-xl hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">👤</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Individual</h3>
                <p className="text-sm text-muted-foreground">Track your eco actions and earn points</p>
              </button>

              <button
                onClick={() => setUserType("industry")}
                className="p-6 border-2 border-secondary rounded-xl hover:bg-secondary/5 transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">🏭</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Industry</h3>
                <p className="text-sm text-muted-foreground">Monitor sustainability and compliance</p>
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Create a new account
              </Link>
            </p>
          </Card>
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
              onClick={() => setUserType(null)}
              className="text-sm text-primary hover:underline mb-4 inline-block"
            >
              ← Change login type
            </button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {userType === "individual" ? "Welcome Back to EcoVerse" : "Welcome to EcoVerse Industry Portal"}
            </h1>
            <p className="text-muted-foreground">
              {userType === "individual"
                ? "Track your actions. Earn eco points. Lead your city."
                : "Monitor. Improve. Earn EcoPoints."}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email or Phone</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg animate-slide-in-left">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
            >
              {isLoading ? "Logging in..." : "Login"}
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
              className="text-primary font-semibold hover:underline"
            >
              {userType === "individual" ? "Create a new account" : "Register your industry"}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
