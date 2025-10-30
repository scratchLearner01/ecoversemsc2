"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Card } from "@/components/ui/card"
import { Leaf, ArrowLeft } from "lucide-react"

interface OTPVerificationProps {
  email: string
  onVerify: (otp: string) => void
  onBack: () => void
  isLoading?: boolean
}

export default function OTPVerification({ email, onVerify, onBack, isLoading = false }: OTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleResend = () => {
    setTimeLeft(60)
    setCanResend(false)
    setOtp("")
  }

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl p-8 border-0 backdrop-blur-sm bg-card/95">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary hover:underline mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">EcoVerse</h1>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your Email</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-2">
              <InputOTPSlot
                index={0}
                className="w-12 h-12 text-lg font-semibold rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-12 text-lg font-semibold rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-12 text-lg font-semibold rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <InputOTPSlot
                index={3}
                className="w-12 h-12 text-lg font-semibold rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <InputOTPSlot
                index={4}
                className="w-12 h-12 text-lg font-semibold rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <InputOTPSlot
                index={5}
                className="w-12 h-12 text-lg font-semibold rounded-lg border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>

        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-muted-foreground">
              Resend code in <span className="font-semibold text-foreground">{timeLeft}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-primary hover:underline font-semibold transition-colors"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
