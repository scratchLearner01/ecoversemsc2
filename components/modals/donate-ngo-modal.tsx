"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, CheckCircle } from "lucide-react"

interface DonateNGOModalProps {
  onClose: () => void
}

const suggestedNGOs = ["Goonj", "Akshaya Patra", "The Better India", "Greenpeace India", "WWF India"]

export default function DonateNGOModal({ onClose }: DonateNGOModalProps) {
  const [step, setStep] = useState<"form" | "verifying" | "success">("form")
  const [description, setDescription] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (value: string) => {
    setDescription(value)
    if (value.length > 0) {
      const filtered = suggestedNGOs.filter((ngo) => ngo.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = () => {
    if (description) {
      setStep("verifying")
      setTimeout(() => {
        setStep("success")
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 border-0 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "form" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Donate or NGO Work</h2>
              <p className="text-muted-foreground mt-1">Contribute to verified NGOs and earn points</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Donation Description</label>
                <Input
                  type="text"
                  placeholder="e.g., Donated to Goonj"
                  value={description}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                />

                {suggestions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {suggestions.map((ngo) => (
                      <button
                        key={ngo}
                        onClick={() => {
                          setDescription(`Donated to ${ngo}`)
                          setSuggestions([])
                        }}
                        className="w-full text-left px-3 py-2 text-sm bg-muted hover:bg-primary/10 rounded-lg transition-colors text-foreground"
                      >
                        Donated to {ngo}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Upload Proof</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">Receipt, certificate, or donation proof</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 rounded-lg border-border hover:bg-muted bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!description}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg disabled:opacity-50"
              >
                Submit
              </Button>
            </div>
          </div>
        )}

        {step === "verifying" && (
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Verifying...</h2>
              <p className="text-muted-foreground mt-1">Confirming with NGO database</p>
            </div>

            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>

            <p className="text-sm text-muted-foreground">Status: Pending verification</p>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-bounce-pop">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">Thank You!</h2>
              <p className="text-muted-foreground mt-1">Your contribution is making a difference</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">You earned</p>
              <p className="text-3xl font-bold text-primary">+40 EcoPoints</p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              Done
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
