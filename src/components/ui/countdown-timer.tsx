"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(() =>
    getTimeLeft(targetDate)
  )

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 60000)
    return () => clearInterval(timer)
  }, [targetDate])

  const variant =
    timeLeft.days <= 3 ? "destructive" : timeLeft.days <= 7 ? "outline" : "secondary"

  return (
    <Badge variant={variant} className={className}>
      <Clock className="mr-1 size-3" />
      {timeLeft.days > 0
        ? `J-${timeLeft.days}`
        : timeLeft.hours > 0
          ? `${timeLeft.hours}h restantes`
          : "Expiré"}
    </Badge>
  )
}

function getTimeLeft(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  }
}
