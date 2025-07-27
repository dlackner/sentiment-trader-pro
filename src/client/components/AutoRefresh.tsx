import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface AutoRefreshProps {
  onRefresh: () => void
  intervalMinutes?: number
}

const AutoRefresh: React.FC<AutoRefreshProps> = ({ onRefresh, intervalMinutes = 15 }) => {
  const [nextRefresh, setNextRefresh] = useState<Date>(new Date(Date.now() + intervalMinutes * 60 * 1000))
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh()
      setNextRefresh(new Date(Date.now() + intervalMinutes * 60 * 1000))
    }, intervalMinutes * 60 * 1000)

    return () => clearInterval(interval)
  }, [onRefresh, intervalMinutes])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = nextRefresh.getTime() - now.getTime()
      
      if (diff > 0) {
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [nextRefresh])

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <Clock className="w-3 h-3" />
      <span>Next refresh: {timeLeft}</span>
    </div>
  )
}

export default AutoRefresh