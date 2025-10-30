"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload, CheckCircle } from "lucide-react"

interface PlantTreeModalProps {
  onClose: () => void
}

export default function PlantTreeModal({ onClose }: PlantTreeModalProps) {
  const [step, setStep] = useState<"upload" | "verifying" | "success">("upload")
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (file) {
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

        {step === "upload" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Plant a Tree</h2>
              <p className="text-muted-foreground mt-1">Upload a 5-10 second video or photo with GPS metadata</p>
            </div>

            <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">Video (MP4, MOV) or Image (JPG, PNG)</p>
              <input
                type="file"
                accept="video/*,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="tree-upload"
              />
              <label htmlFor="tree-upload" className="cursor-pointer block mt-4">
                {file && <p className="text-sm text-primary font-medium">{file.name}</p>}
              </label>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-xs text-blue-900 dark:text-blue-200">
                GPS metadata will be automatically extracted from your file. Make sure location services are enabled.
              </p>
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
                onClick={handleUpload}
                disabled={!file}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg disabled:opacity-50"
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
              <p className="text-muted-foreground mt-1">Analyzing GPS data and tree planting proof</p>
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
              <h2 className="text-2xl font-bold text-foreground">Tree Planted!</h2>
              <p className="text-muted-foreground mt-1">Your contribution has been verified and recorded</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">You earned</p>
              <p className="text-3xl font-bold text-primary">+50 EcoPoints</p>
              <p className="text-xs text-muted-foreground mt-2">Trees Planted: 15</p>
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
