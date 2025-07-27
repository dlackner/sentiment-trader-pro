import React from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, AlertTriangle, Target } from 'lucide-react'

interface VolatilityData {
  ticker: string
  currentIV: number
  avgIV: number
  percentile: number
  trend: 'up' | 'down' | 'neutral'
  opportunity: 'high' | 'medium' | 'low'
  reason: string
}

const mockVolatilityData: VolatilityData[] = [
  {
    ticker: 'NVDA',
    currentIV: 45.2,
    avgIV: 38.5,
    percentile: 78,
    trend: 'up',
    opportunity: 'high',
    reason: 'Earnings approach, high demand'
  },
  {
    ticker: 'TSLA',
    currentIV: 52.1,
    avgIV: 49.8,
    percentile: 62,
    trend: 'up',
    opportunity: 'medium',
    reason: 'News-driven volatility'
  },
  {
    ticker: 'AMD',
    currentIV: 38.9,
    avgIV: 42.1,
    percentile: 35,
    trend: 'down',
    opportunity: 'medium',
    reason: 'IV crush opportunity'
  },
  {
    ticker: 'AAPL',
    currentIV: 28.4,
    avgIV: 31.2,
    percentile: 42,
    trend: 'neutral',
    opportunity: 'low',
    reason: 'Stable, low volatility'
  },
]

const VolatilityTracker: React.FC = () => {
  const getOpportunityColor = (opportunity: VolatilityData['opportunity']) => {
    switch (opportunity) {
      case 'high': return 'text-accent-green'
      case 'medium': return 'text-accent-yellow'
      case 'low': return 'text-gray-400'
    }
  }

  const getTrendIcon = (trend: VolatilityData['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-accent-green" />
      case 'down': return <TrendingUp className="w-4 h-4 text-accent-red rotate-180" />
      case 'neutral': return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getOpportunityIcon = (opportunity: VolatilityData['opportunity']) => {
    switch (opportunity) {
      case 'high': return <Target className="w-4 h-4 text-accent-green" />
      case 'medium': return <AlertTriangle className="w-4 h-4 text-accent-yellow" />
      case 'low': return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">IV Tracker</h2>
        <div className="flex items-center gap-2 text-accent-blue">
          <Activity className="w-4 h-4" />
          <span className="text-sm">Implied Volatility</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockVolatilityData.map((data, index) => (
          <motion.div
            key={data.ticker}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-dark-300/30 hover:bg-dark-300/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-accent-blue text-lg">${data.ticker}</span>
                {getTrendIcon(data.trend)}
                <div className={`flex items-center gap-1 ${getOpportunityColor(data.opportunity)}`}>
                  {getOpportunityIcon(data.opportunity)}
                  <span className="text-sm font-medium capitalize">{data.opportunity}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-mono font-bold">{data.currentIV}%</div>
                <div className="text-xs text-gray-400">Current IV</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="text-xs text-gray-400">Avg IV</div>
                <div className="font-mono text-sm">{data.avgIV}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Percentile</div>
                <div className={`font-mono text-sm ${
                  data.percentile > 70 ? 'text-accent-red' : 
                  data.percentile > 30 ? 'text-accent-yellow' : 'text-accent-green'
                }`}>
                  {data.percentile}th
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Difference</div>
                <div className={`font-mono text-sm ${
                  data.currentIV > data.avgIV ? 'text-accent-red' : 'text-accent-green'
                }`}>
                  {data.currentIV > data.avgIV ? '+' : ''}{(data.currentIV - data.avgIV).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 italic">
              {data.reason}
            </div>

            {/* IV Percentile Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Low</span>
                <span>High</span>
              </div>
              <div className="w-full bg-dark-400/50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    data.percentile > 70 ? 'bg-accent-red' : 
                    data.percentile > 30 ? 'bg-accent-yellow' : 'bg-accent-green'
                  }`}
                  style={{ width: `${data.percentile}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dark-400/30">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-accent-green font-medium">High Opp</div>
            <div className="text-lg font-bold">1</div>
          </div>
          <div>
            <div className="text-accent-yellow font-medium">Medium</div>
            <div className="text-lg font-bold">2</div>
          </div>
          <div>
            <div className="text-gray-400 font-medium">Low</div>
            <div className="text-lg font-bold">1</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolatilityTracker