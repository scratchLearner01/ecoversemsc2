"use client"

import { useEffect, useState } from "react"

interface CountUpNumberProps {
  end: number
  duration?: number
  className?: string
}

export default function CountUpNumber({ end, duration = 800, className = "" }: CountUpNumberProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [end, duration])

  return <span className={className}>{count.toLocaleString()}</span>
}
