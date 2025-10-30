"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"

interface TaxBenefitProps {
  ecoPoints: number
}

export default function TaxBenefitCenter({ ecoPoints }: TaxBenefitProps) {
  const [showModal, setShowModal] = useState(false)
  const threshold = 9000
  const isEligible = ecoPoints >= threshold
  const estimatedBenefit = isEligible ? 10 : 0

  return (
    <>
      <Card className="p-8 border-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border-l-4 border-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Environmental Tax Benefits</h3>
              <p className="text-muted-foreground">
                Industries with 9,000+ EcoPoints qualify for up to 10% environmental tax benefits
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
          >
            Check Eligibility
          </Button>
        </div>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-card rounded-xl animate-slide-in-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Tax Benefit Eligibility</h2>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Your EcoPoints</p>
                  <p className="text-3xl font-bold text-foreground">{ecoPoints}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Required Threshold</p>
                  <p className="text-3xl font-bold text-foreground">{threshold}</p>
                </div>

                <div
                  className={`rounded-lg p-4 ${isEligible ? "bg-green-500/10 border border-green-500/20" : "bg-yellow-500/10 border border-yellow-500/20"}`}
                >
                  <p className="text-sm text-muted-foreground mb-1">Estimated Tax Benefit</p>
                  <p className={`text-3xl font-bold ${isEligible ? "text-green-600" : "text-yellow-600"}`}>
                    {estimatedBenefit}%
                  </p>
                </div>

                {isEligible && (
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Apply Now</Button>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  In partnership with Ministry of Environment & CPCB
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
