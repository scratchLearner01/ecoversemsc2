"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Camera, CheckCircle } from "lucide-react"

interface SmartDustbinModalProps {
  onClose: () => void
}

export default function SmartDustbinModal({ onClose }: SmartDustbinModalProps) {
  const [step, setStep] = useState<"scan" | "verifying" | "success">("scan")

  const handleScan = () => {
    setStep("verifying")
    setTimeout(() => {
      setStep("success")
    }, 2000)
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

        {step === "scan" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Use Smart Dustbin</h2>
              <p className="text-muted-foreground mt-1">Scan the QR code on a registered EcoVerse Dustbin</p>
            </div>

            <div className="bg-muted rounded-xl p-8 flex items-center justify-center">
              <Camera className="w-16 h-16 text-muted-foreground" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">QR Code or Dustbin ID</label>
              <Input
                type="text"
                placeholder="Enter QR code or dustbin ID"
                className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
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
                onClick={handleScan}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Verify
              </Button>
            </div>
          </div>
        )}

        {step === "verifying" && (
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Verifying...</h2>
              <p className="text-muted-foreground mt-1">Checking dustbin data and geolocation</p>
            </div>

            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>

            <p className="text-sm text-muted-foreground">This may take a few seconds</p>
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
              <h2 className="text-2xl font-bold text-foreground">Verified!</h2>
              <p className="text-muted-foreground mt-1">Your dustbin usage has been confirmed</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">You earned</p>
              <p className="text-3xl font-bold text-primary">+20 EcoPoints</p>
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
