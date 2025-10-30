"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, MessageCircle, Send, Loader } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const botResponses: { [key: string]: string } = {
  "how do i earn points":
    "You can earn EcoPoints by completing verified sustainability actions like planting trees (+50), recycling waste (+15-40), using smart dustbins (+20), donating to NGOs (+30-50), and participating in eco events (+10). Each action is verified before points are awarded.",
  "show me my city's aqi":
    "Bengaluru's current AQI is 87 (Moderate). The 7-day trend shows fluctuations between 82-90. You can view the detailed chart in the Local Area Insights section of your dashboard.",
  "switch to metal bottles":
    "Great idea! Switching to reusable metal bottles can save up to 150 plastic bottles per year. You can log this as a lifestyle change in your profile and earn bonus points for sustainable habits.",
  "how do i plant a tree":
    "To plant a tree: 1) Click 'Plant a Tree' in the Action Panel, 2) Upload a 5-10 second video or photo with GPS metadata, 3) Our system verifies the location and tree planting proof, 4) You earn +50 EcoPoints upon verification.",
  "what is my rank":
    "You're currently ranked #3 in Bengaluru with 3,180 EcoPoints and #2,348 globally. Keep contributing to climb higher on the leaderboard!",
  "how do i recycle":
    "To log recycling: 1) Select waste category (Plastic, Paper, Metal, E-waste), 2) Enter the weight in kg, 3) Optionally upload a photo, 4) Submit for verification. You'll earn 15-40 points based on the amount recycled.",
  default:
    "I'm here to help! You can ask me about earning points, local eco stats, how to log actions, or sustainability tips. What would you like to know?",
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm your EcoVerse AI Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let botResponse = botResponses.default

      for (const [key, response] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          botResponse = response
          break
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-96 max-h-[calc(100vh-2rem)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-50 animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border rounded-t-2xl bg-gradient-to-r from-primary/10 to-secondary/10">
            <div>
              <h3 className="font-semibold text-foreground">EcoVerse Assistant</h3>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
