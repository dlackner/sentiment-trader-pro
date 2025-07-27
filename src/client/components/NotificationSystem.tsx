import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, TrendingUp, Zap, Users, X, ExternalLink } from 'lucide-react'

interface Notification {
  id: string
  type: 'alert' | 'spike' | 'news' | 'influencer'
  title: string
  message: string
  ticker?: string
  timestamp: Date
  priority: 'high' | 'medium' | 'low'
  source: string
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'spike',
    title: 'Volume Spike Detected',
    message: 'Unusual options activity detected - 300% above average',
    ticker: 'NVDA',
    timestamp: new Date(),
    priority: 'high',
    source: 'r/wallstreetbets',
    actionUrl: '#'
  },
  {
    id: '2',
    type: 'influencer',
    title: 'Influencer Alert',
    message: '@unusual_whales posted new analysis',
    ticker: 'TSLA',
    timestamp: new Date(Date.now() - 5000),
    priority: 'medium',
    source: 'X (Twitter)',
    actionUrl: '#'
  }
]

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Simulate incoming notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 5 seconds
        const randomNotification = {
          ...mockNotifications[Math.floor(Math.random() * mockNotifications.length)],
          id: Date.now().toString(),
          timestamp: new Date(),
        }
        
        setNotifications(prev => [randomNotification, ...prev.slice(0, 4)]) // Keep max 5
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== randomNotification.id))
        }, 8000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'spike': return <TrendingUp className="w-5 h-5" />
      case 'alert': return <AlertTriangle className="w-5 h-5" />
      case 'news': return <Zap className="w-5 h-5" />
      case 'influencer': return <Users className="w-5 h-5" />
    }
  }

  const getPriorityStyles = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'bg-accent-red/90 border-accent-red'
      case 'medium': return 'bg-accent-yellow/90 border-accent-yellow'
      case 'low': return 'bg-accent-blue/90 border-accent-blue'
    }
  }

  const getTextColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-100'
      case 'medium': return 'text-yellow-100'
      case 'low': return 'text-blue-100'
    }
  }

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: index * 0.1 
            }}
            className={`${getPriorityStyles(notification.priority)} ${getTextColor(notification.priority)} 
                       border-l-4 rounded-lg shadow-2xl backdrop-blur-lg p-4 cursor-pointer
                       hover:scale-105 transition-transform`}
            onClick={() => notification.actionUrl && window.open(notification.actionUrl, '_blank')}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    {notification.ticker && (
                      <span className="bg-white/20 text-xs px-2 py-0.5 rounded font-mono font-bold">
                        {notification.ticker}
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-90 mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between text-xs opacity-75">
                    <span>{notification.source}</span>
                    <span>{notification.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                {notification.actionUrl && (
                  <ExternalLink className="w-4 h-4 opacity-60" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeNotification(notification.id)
                  }}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem