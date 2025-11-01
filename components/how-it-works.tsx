"use client"

import { useState } from "react"
import { UserPlus, Zap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: UserPlus,
    title: "Join",
    description: "Create your profile and start tracking your sustainability journey",
    details: "Sign up in seconds and connect with your community",
  },
  {
    icon: Zap,
    title: "Act",
    description: "Log your eco-friendly actions or scan smart bins",
    details: "Every action counts towards your EcoPoints",
  },
  {
    icon: Award,
    title: "Earn",
    description: "Receive EcoPoints and unlock exclusive badges",
    details: "Redeem rewards and compete on leaderboards",
  },
]

export default function HowItWorks() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground">Three simple steps to make a difference</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isFlipped = flipped === index

          return (
            <div
              key={index}
              className="h-64 cursor-pointer perspective animate-slide-in-left"
              onClick={() => setFlipped(isFlipped ? null : index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`relative w-full h-full transition-all duration-500 transform-gpu ${
                  isFlipped ? "scale-y-[-1]" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-primary/60 transition-all duration-300 group"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{step.description}</p>
                  <p className="text-xs text-primary mt-4 font-semibold">Click to learn more</p>
                </div>

                {/* Back */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <p className="text-foreground mb-4 flex-grow flex items-center">{step.details}</p>
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <Link href="/signup">
          <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-200 px-8 py-3 text-base animate-fade-in">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  )
}
