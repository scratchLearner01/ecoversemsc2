"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Minimize2, Maximize2, X, Mic } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIAdvisorProps {
  data: any
}

export default function IndustryAIAdvisor({ data }: AIAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your EcoVerse AI Advisor. I can help you understand your sustainability metrics, suggest improvements, and answer questions about your environmental impact. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        "co2 trend": `Your CO₂ output has decreased by 12% this week. Current level: ${data.co2Emission} ppm. Keep up the great work!`,
        "suggest improvements":
          "Based on your current metrics, I recommend: 1) Increase solar energy usage by 10%, 2) Implement waste segregation system, 3) Upgrade to energy-efficient machinery.",
        "tax rebate": `You currently have ${data.ecoPoints} EcoPoints. You need 9,000+ points to qualify for tax benefits. You're ${9000 - data.ecoPoints} points away!`,
        "leaderboard rank": `You're ranked #${data.rankCity} in your city. To improve, focus on reducing CO₂ emissions and increasing verified actions.`,
        default: `I understand you're asking about "${input}". Based on your current data, I can provide more specific insights. Could you be more specific?`,
      }

      let response = aiResponses.default
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("co2") || lowerInput.includes("emission")) {
        response = aiResponses["co2 trend"]
      } else if (lowerInput.includes("suggest") || lowerInput.includes("improve")) {
        response = aiResponses["suggest improvements"]
      } else if (lowerInput.includes("tax") || lowerInput.includes("benefit")) {
        response = aiResponses["tax rebate"]
      } else if (lowerInput.includes("rank") || lowerInput.includes("leaderboard")) {
        response = aiResponses["leaderboard rank"]
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 800)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
        aria-label="Open AI Advisor"
      >
        <span className="text-xl">🤖</span>
      </button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-96 border-0 bg-card rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
        isMinimized ? "h-14" : "h-[600px]"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="font-semibold">EcoVerse AI Advisor</h3>
            <p className="text-xs opacity-90">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-border p-4 flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="button" size="icon" variant="ghost" className="hover:bg-muted">
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </>
      )}
    </Card>
  )
}
