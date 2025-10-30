"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, CheckCircle } from "lucide-react"

interface RecycleWasteModalProps {
  onClose: () => void
}

export default function RecycleWasteModal({ onClose }: RecycleWasteModalProps) {
  const [step, setStep] = useState<"form" | "verifying" | "success">("form")
  const [category, setCategory] = useState("")
  const [weight, setWeight] = useState("")
  const [center, setCenter] = useState("")

  const handleSubmit = () => {
    if (category && weight) {
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
              <h2 className="text-2xl font-bold text-foreground">Recycle Waste</h2>
              <p className="text-muted-foreground mt-1">Log your recycled materials and earn points</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Waste Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-lg border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="ewaste">E-waste</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="2.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Recycling Center (Optional)</label>
                <Input
                  type="text"
                  placeholder="e.g., Green Cycle Center"
                  value={center}
                  onChange={(e) => setCenter(e.target.value)}
                  className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Photo (Optional)</label>
                <Input
                  type="file"
                  accept="image/*"
                  className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
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
                disabled={!category || !weight}
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
              <p className="text-muted-foreground mt-1">Processing your recycling submission</p>
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
              <h2 className="text-2xl font-bold text-foreground">Submitted!</h2>
              <p className="text-muted-foreground mt-1">Your recycling data is pending verification</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Estimated points</p>
              <p className="text-3xl font-bold text-primary">+30 EcoPoints</p>
              <p className="text-xs text-muted-foreground mt-2">Plastic Recycled: 30.5 kg</p>
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
