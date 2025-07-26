import React from 'react'
import { AlertTriangle, TrendingUp, Zap, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface Alert {
  id: string
  type: 'spike' | 'volume' | 'influencer' | 'breaking'
  ticker: string
  message: string
  time: string
  priority: 'high' | 'medium' | 'low'
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'spike',
    ticker: 'NVDA',
    message: '5 influencers mentioned in 10 min',
    time: '2 min ago',
    priority: 'high'
  },
  {
    id: '2',
    type: 'volume',
    ticker: 'AMD',
    message: 'Volume spike detected +300%',
    time: '5 min ago',
    priority: 'high'
  },
  {
    id: '3',
    type: 'influencer',
    ticker: 'TSLA',
    message: '@WallStWhale posted analysis',
    time: '12 min ago',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'breaking',
    ticker: 'AAPL',
    message: 'Breaking: New product launch',
    time: '18 min ago',
    priority: 'medium'
  },
]

const AlertsFeed: React.FC = () => {
  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'spike': return <TrendingUp className="w-4 h-4" />
      case 'volume': return <Zap className="w-4 h-4" />
      case 'influencer': return <Users className="w-4 h-4" />
      case 'breaking': return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return 'bg-accent-red'
      case 'medium': return 'bg-accent-yellow'
      case 'low': return 'bg-accent-blue'
    }
  }

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Live Alerts</h2>
        <div className="animate-pulse">
          <div className="w-2 h-2 bg-accent-green rounded-full" />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {mockAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 rounded-lg bg-dark-300/50 hover:bg-dark-300 transition-all cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getPriorityColor(alert.priority)} bg-opacity-20`}>
                <div className={getPriorityColor(alert.priority).replace('bg-', 'text-')}>
                  {getIcon(alert.type)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent-blue">${alert.ticker}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{alert.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AlertsFeed