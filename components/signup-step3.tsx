"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface SignupStep3Props {
  formData: any
}

export default function SignupStep3({ formData }: SignupStep3Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-foreground">Review Your Information</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-primary/10">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-semibold text-foreground">{formData.name || "Not provided"}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-primary/10">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-semibold text-foreground">{formData.email || "Not provided"}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-primary/10">
            <span className="text-muted-foreground">Address:</span>
            <span className="font-semibold text-foreground">{formData.address || "Not provided"}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-primary/10">
            <span className="text-muted-foreground">Vehicle Type:</span>
            <span className="font-semibold text-foreground capitalize">{formData.vehicleType || "None"}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Solar User:</span>
            <span className="font-semibold text-foreground">{formData.solarUser ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
        <Checkbox id="consent" className="mt-1" />
        <label htmlFor="consent" className="text-sm text-foreground cursor-pointer leading-relaxed">
          I allow EcoVerse to use my anonymized data for sustainability insights and research purposes.
        </label>
      </div>

      <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          By creating an account, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and
          secure.
        </p>
      </div>
    </div>
  )
}
