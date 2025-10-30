"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Leaf, TrendingUp, Shield, Zap, BarChart3, Users, Moon, Sun } from "lucide-react"

export default function IndustryLandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Monitoring",
      description: "Track your environmental metrics with live IoT data and analytics",
      color: "from-primary to-primary/50",
    },
    {
      icon: TrendingUp,
      title: "EcoPoints Rewards",
      description: "Earn points for verified sustainability actions and improvements",
      color: "from-secondary to-secondary/50",
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Manage certifications and compliance documents in one place",
      color: "from-green-500 to-green-500/50",
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations to improve your environmental score",
      color: "from-yellow-500 to-yellow-500/50",
    },
    {
      icon: Users,
      title: "Collaboration Hub",
      description: "Partner with NGOs and other industries on green initiatives",
      color: "from-blue-500 to-blue-500/50",
    },
    {
      icon: Leaf,
      title: "Tax Benefits",
      description: "Qualify for environmental tax benefits with 9000+ EcoPoints",
      color: "from-emerald-500 to-emerald-500/50",
    },
  ]

  const benefits = [
    {
      title: "Boost Your Brand",
      description: "Showcase your commitment to sustainability and attract eco-conscious customers",
    },
    {
      title: "Reduce Costs",
      description: "Identify inefficiencies and optimize operations to save money",
    },
    {
      title: "Regulatory Compliance",
      description: "Stay ahead of environmental regulations with automated tracking",
    },
    {
      title: "Competitive Advantage",
      description: "Lead your industry in sustainability rankings and recognition",
    },
  ]

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-18">
              <Link
                href="/"
                className="flex items-center gap-2 group cursor-pointer hover:scale-102 transition-transform"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-semibold text-lg text-foreground hidden sm:inline">EcoVerse</span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#benefits" className="text-foreground hover:text-primary transition-colors">
                  Benefits
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={toggleDarkMode} className="text-foreground hover:bg-muted">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Link href="/login">
                  <Button variant="ghost" className="text-foreground hover:bg-muted">
                    Login
                  </Button>
                </Link>
                <Link href="/signup/industry">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Building Greener Industries, Smarter Planet
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Monitor your environmental impact, earn EcoPoints, and lead your industry in sustainability with
                  EcoVerse Industry Portal.
                </p>
                <div className="flex gap-4">
                  <Link href="/signup/industry">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg gap-2">
                      Register Your Industry <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="px-8 py-6 text-lg bg-transparent border-border">
                    Watch Demo
                  </Button>
                </div>
              </div>

              <div className="animate-slide-in-right">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                      <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Average EcoPoints Growth</p>
                        <p className="text-2xl font-bold text-foreground">+45% Monthly</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                      <Leaf className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
                        <p className="text-2xl font-bold text-foreground">-12% Average</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                      <Users className="w-6 h-6 text-secondary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Industries Onboarded</p>
                        <p className="text-2xl font-bold text-foreground">500+ Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features for Industry Leaders</h2>
              <p className="text-xl text-muted-foreground">Everything you need to manage sustainability at scale</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="p-6 border-0 bg-card rounded-xl hover:shadow-lg transition-all group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose EcoVerse?</h2>
              <p className="text-xl text-muted-foreground">Transform your industry's environmental impact</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Lead Your Industry?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ industries already transforming their environmental impact with EcoVerse
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup/industry">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-6 text-lg bg-transparent border-border">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground/5 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">EcoVerse</h4>
                <p className="text-sm text-muted-foreground">Building a greener future, one industry at a time.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>EcoVerse™ Industry Portal — In collaboration with MoEFCC, CPCB, and NITI Aayog.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
