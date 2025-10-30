"use client"

import { useState } from "react"
import { X, Send, MessageCircle } from "lucide-react"

const botResponses = {
  default:
    "Hi! I'm EcoBot. I can help you find recycled materials, explain eco certifications, or guide you on earning more Eco Points. What would you like to know?",
  materials:
    "I can help you find recycled materials! What type are you looking for? We have plastic, metal, paper, e-waste, compost, and textile options.",
  certification:
    "Our eco certifications are verified by CPCB, MoEFCC, and MPCB. These ensure the materials meet environmental standards and are genuinely recycled.",
  points:
    "You earn 1 Eco Point for every ₹10 spent on certified resources. These points can be redeemed for rewards, badges, and recognition in our community!",
  history:
    "You can view your complete buying history in your dashboard. It shows all your purchases, eco points earned, and environmental impact.",
}

export default function EcoBotChat({ onClose }) {
  const [messages, setMessages] = useState([{ id: 1, type: "bot", text: botResponses.default }])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = { id: Date.now(), type: "user", text: input }
    setMessages([...messages, userMessage])

    // Simulate bot response
    setTimeout(() => {
      let botResponse = botResponses.default
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("material") || lowerInput.includes("find")) {
        botResponse = botResponses.materials
      } else if (lowerInput.includes("certif")) {
        botResponse = botResponses.certification
      } else if (lowerInput.includes("point") || lowerInput.includes("earn")) {
        botResponse = botResponses.points
      } else if (lowerInput.includes("history") || lowerInput.includes("purchase")) {
        botResponse = botResponses.history
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, type: "bot", text: botResponse }])
    }, 500)

    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-96 animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-bold">EcoBot Assistant</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              } animate-slide-in-left`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors button-pulse"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
