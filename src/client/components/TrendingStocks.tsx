import React from 'react'
import { TrendingUp, TrendingDown, Target, Zap, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

interface Stock {
  ticker: string
  mentions: number
  sentiment: number
  change: number
  volume: string
  iv: number
  optionsFlow: 'high' | 'medium' | 'low'
  catalyst: string
  opportunity: 'momentum' | 'volatility' | 'contrarian' | 'neutral'
}

const mockStocks: Stock[] = [
  { ticker: 'NVDA', mentions: 1247, sentiment: 0.82, change: 4.5, volume: '125M', iv: 45, optionsFlow: 'high', catalyst: 'Earnings approach', opportunity: 'momentum' },
  { ticker: 'TSLA', mentions: 892, sentiment: 0.65, change: -2.1, volume: '98M', iv: 52, optionsFlow: 'high', catalyst: 'Production news', opportunity: 'contrarian' },
  { ticker: 'AMD', mentions: 756, sentiment: 0.78, change: 3.2, volume: '67M', iv: 38, optionsFlow: 'medium', catalyst: 'Sector rotation', opportunity: 'momentum' },
  { ticker: 'AAPL', mentions: 623, sentiment: 0.71, change: 1.8, volume: '54M', iv: 28, optionsFlow: 'low', catalyst: 'iPhone sales', opportunity: 'neutral' },
  { ticker: 'SPY', mentions: 512, sentiment: 0.54, change: 0.3, volume: '234M', iv: 18, optionsFlow: 'medium', catalyst: 'Fed meeting', opportunity: 'volatility' },
]

const TrendingStocks: React.FC = () => {
  const getOpportunityColor = (opportunity: Stock['opportunity']) => {
    switch (opportunity) {
      case 'momentum': return 'text-accent-green'
      case 'volatility': return 'text-accent-yellow'
      case 'contrarian': return 'text-accent-blue'
      case 'neutral': return 'text-gray-400'
    }
  }

  const getOpportunityIcon = (opportunity: Stock['opportunity']) => {
    switch (opportunity) {
      case 'momentum': return <TrendingUp className="w-3 h-3" />
      case 'volatility': return <Activity className="w-3 h-3" />
      case 'contrarian': return <Target className="w-3 h-3" />
      case 'neutral': return null
    }
  }

  const getFlowIcon = (flow: Stock['optionsFlow']) => {
    switch (flow) {
      case 'high': return <Zap className="w-3 h-3 text-accent-red" />
      case 'medium': return <Activity className="w-3 h-3 text-accent-yellow" />
      case 'low': return <Activity className="w-3 h-3 text-gray-400" />
    }
  }

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Trading Opportunities</h2>
          <p className="text-xs text-gray-500 mt-1">Sentiment + options flow analysis</p>
        </div>
        <span className="text-sm text-gray-400">Last 15 minutes</span>
      </div>
      
      <div className="space-y-4">
        {mockStocks.map((stock, index) => (
          <motion.div
            key={stock.ticker}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-dark-300/30 hover:bg-dark-300/50 transition-colors border border-dark-400/30"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold text-accent-blue">${stock.ticker}</div>
                <div className={`flex items-center gap-1 ${getOpportunityColor(stock.opportunity)}`}>
                  {getOpportunityIcon(stock.opportunity)}
                  <span className="text-xs font-medium capitalize">{stock.opportunity}</span>
                </div>
                {getFlowIcon(stock.optionsFlow)}
              </div>
              
              <div className={`flex items-center ${stock.change > 0 ? 'trend-up' : 'trend-down'}`}>
                {stock.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="ml-1 font-medium">{stock.change > 0 ? '+' : ''}{stock.change}%</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3 text-sm">
              <div>
                <div className="text-xs text-gray-400">Sentiment</div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-dark-400 rounded-full h-1.5">
                    <div 
                      className="h-full bg-gradient-to-r from-accent-red via-accent-yellow to-accent-green rounded-full"
                      style={{ width: `${stock.sentiment * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs">{(stock.sentiment * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">IV</div>
                <div className="font-mono font-medium">{stock.iv}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Volume</div>
                <div className="font-mono text-xs">{stock.volume}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Mentions</div>
                <div className="font-mono text-xs">{stock.mentions}</div>
              </div>
            </div>

            <div className="text-xs text-gray-400 italic">
              Catalyst: {stock.catalyst}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TrendingStocks