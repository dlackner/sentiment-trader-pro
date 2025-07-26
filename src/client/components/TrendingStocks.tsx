import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface Stock {
  ticker: string
  mentions: number
  sentiment: number
  change: number
  volume: string
}

const mockStocks: Stock[] = [
  { ticker: 'NVDA', mentions: 1247, sentiment: 0.82, change: 4.5, volume: '125M' },
  { ticker: 'TSLA', mentions: 892, sentiment: 0.65, change: -2.1, volume: '98M' },
  { ticker: 'AMD', mentions: 756, sentiment: 0.78, change: 3.2, volume: '67M' },
  { ticker: 'AAPL', mentions: 623, sentiment: 0.71, change: 1.8, volume: '54M' },
  { ticker: 'SPY', mentions: 512, sentiment: 0.54, change: 0.3, volume: '234M' },
]

const TrendingStocks: React.FC = () => {
  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Trending Stocks</h2>
        <span className="text-sm text-gray-400">Last 15 minutes</span>
      </div>
      
      <div className="space-y-4">
        {mockStocks.map((stock, index) => (
          <motion.div
            key={stock.ticker}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-dark-300/50 hover:bg-dark-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="text-lg font-bold">{stock.ticker}</div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-dark-400 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-green rounded-full"
                    style={{ width: `${stock.sentiment * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{(stock.sentiment * 100).toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">{stock.mentions} mentions</div>
                <div className="text-xs text-gray-500">Vol: {stock.volume}</div>
              </div>
              <div className={`flex items-center ${stock.change > 0 ? 'trend-up' : 'trend-down'}`}>
                {stock.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="ml-1 font-medium">{Math.abs(stock.change)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TrendingStocks