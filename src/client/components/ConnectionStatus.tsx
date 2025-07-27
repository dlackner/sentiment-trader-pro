import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, WifiOff, Activity, Database, Twitter, MessageSquare } from 'lucide-react'

interface ConnectionState {
  status: 'connected' | 'connecting' | 'disconnected'
  lastUpdate: Date
  latency: number
  sources: {
    x: boolean
    reddit: boolean
    market: boolean
  }
}

const ConnectionStatus: React.FC = () => {
  const [connection, setConnection] = useState<ConnectionState>({
    status: 'connected',
    lastUpdate: new Date(),
    latency: 42,
    sources: {
      x: true,
      reddit: true,
      market: true
    }
  })

  const [isExpanded, setIsExpanded] = useState(false)

  // Simulate connection changes
  useEffect(() => {
    const interval = setInterval(() => {
      setConnection(prev => ({
        ...prev,
        lastUpdate: new Date(),
        latency: 35 + Math.random() * 30,
        sources: {
          x: Math.random() > 0.1,
          reddit: Math.random() > 0.05,
          market: Math.random() > 0.02
        }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (connection.status === 'connected' && Object.values(connection.sources).every(Boolean)) {
      return 'text-accent-green'
    } else if (connection.status === 'connecting' || !Object.values(connection.sources).every(Boolean)) {
      return 'text-accent-yellow'
    } else {
      return 'text-accent-red'
    }
  }

  const getStatusIcon = () => {
    if (connection.status === 'connected' && Object.values(connection.sources).every(Boolean)) {
      return <Wifi className="w-4 h-4" />
    } else if (connection.status === 'connecting') {
      return <Activity className="w-4 h-4 animate-pulse" />
    } else {
      return <WifiOff className="w-4 h-4" />
    }
  }

  const getStatusText = () => {
    const connectedSources = Object.values(connection.sources).filter(Boolean).length
    const totalSources = Object.values(connection.sources).length
    
    if (connectedSources === totalSources) {
      return 'All systems operational'
    } else if (connectedSources > 0) {
      return `${connectedSources}/${totalSources} sources online`
    } else {
      return 'Connection lost'
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border 
                   ${getStatusColor()} bg-dark-300/50 border-current/30 
                   hover:bg-dark-300 transition-all`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getStatusIcon()}
        <span className="text-sm font-medium">{connection.latency.toFixed(0)}ms</span>
      </motion.button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full right-0 mt-2 w-72 bg-dark-200 border border-dark-400/50 
                     rounded-lg shadow-2xl backdrop-blur-lg p-4 z-50"
        >
          <div className="space-y-4">
            {/* Status Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Connection Status</h3>
              <div className={`flex items-center gap-2 ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="text-sm">{getStatusText()}</span>
              </div>
            </div>

            {/* Connection Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Latency</span>
                <div className="font-mono font-medium">{connection.latency.toFixed(0)}ms</div>
              </div>
              <div>
                <span className="text-gray-400">Last Update</span>
                <div className="font-mono font-medium">
                  {connection.lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Data Sources</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-accent-blue" />
                    <span className="text-sm">X (Twitter) API</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    connection.sources.x ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      connection.sources.x ? 'bg-accent-green' : 'bg-accent-red'
                    } ${connection.sources.x ? 'animate-pulse' : ''}`} />
                    <span className="text-xs">
                      {connection.sources.x ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Reddit API</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    connection.sources.reddit ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      connection.sources.reddit ? 'bg-accent-green' : 'bg-accent-red'
                    } ${connection.sources.reddit ? 'animate-pulse' : ''}`} />
                    <span className="text-xs">
                      {connection.sources.reddit ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-accent-yellow" />
                    <span className="text-sm">Market Data</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    connection.sources.market ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      connection.sources.market ? 'bg-accent-green' : 'bg-accent-red'
                    } ${connection.sources.market ? 'animate-pulse' : ''}`} />
                    <span className="text-xs">
                      {connection.sources.market ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="border-t border-dark-400/30 pt-3">
              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div>
                  <div className="text-gray-400">Uptime</div>
                  <div className="font-medium">99.8%</div>
                </div>
                <div>
                  <div className="text-gray-400">Alerts/min</div>
                  <div className="font-medium">2.4</div>
                </div>
                <div>
                  <div className="text-gray-400">Data Points</div>
                  <div className="font-medium">1.2M</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ConnectionStatus