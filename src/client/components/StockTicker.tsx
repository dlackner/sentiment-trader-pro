import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  alerts: number
}

const mockTickerData: TickerItem[] = [
  { symbol: 'NVDA', price: 891.52, change: 12.45, changePercent: 1.42, volume: '45.2M', sentiment: 'bullish', alerts: 3 },
  { symbol: 'TSLA', price: 248.73, change: -5.21, changePercent: -2.05, volume: '89.1M', sentiment: 'bearish', alerts: 7 },
  { symbol: 'AAPL', price: 227.52, change: 2.18, changePercent: 0.97, volume: '52.3M', sentiment: 'bullish', alerts: 2 },
  { symbol: 'MSFT', price: 420.61, change: -1.23, changePercent: -0.29, volume: '28.7M', sentiment: 'neutral', alerts: 1 },
  { symbol: 'GOOGL', price: 175.84, change: 4.67, changePercent: 2.73, volume: '31.5M', sentiment: 'bullish', alerts: 4 },
  { symbol: 'AMD', price: 152.34, change: 8.91, changePercent: 6.21, volume: '67.8M', sentiment: 'bullish', alerts: 6 },
  { symbol: 'META', price: 563.27, change: -7.45, changePercent: -1.31, volume: '19.4M', sentiment: 'bearish', alerts: 2 },
  { symbol: 'AMZN', price: 186.43, change: 3.21, changePercent: 1.75, volume: '41.2M', sentiment: 'bullish', alerts: 3 },
  { symbol: 'SPY', price: 575.82, change: 1.67, changePercent: 0.29, volume: '156.3M', sentiment: 'neutral', alerts: 5 },
  { symbol: 'QQQ', price: 491.23, change: 2.89, changePercent: 0.59, volume: '98.7M', sentiment: 'bullish', alerts: 2 },
]

const StockTicker: React.FC = () => {
  const [tickerData, setTickerData] = useState(mockTickerData)
  const [isPaused, setIsPaused] = useState(false)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5) * 0.5,
        changePercent: stock.changePercent + (Math.random() - 0.5) * 0.1,
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-accent-green'
      case 'bearish': return 'text-accent-red'
      default: return 'text-accent-yellow'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="w-3 h-3" />
      case 'bearish': return <TrendingDown className="w-3 h-3" />
      default: return <Zap className="w-3 h-3" />
    }
  }

  return (
    <div className="bg-dark-200/80 border-b border-dark-400/50 overflow-hidden relative">
      {/* Ticker Header */}
      <div className="flex items-center justify-between px-6 py-2 bg-dark-300/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">LIVE MARKET DATA</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date().toLocaleTimeString()} EST
          </div>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      {/* Scrolling Ticker */}
      <div className="relative h-16 overflow-hidden">
        <motion.div
          className="flex absolute whitespace-nowrap"
          animate={{
            x: isPaused ? 0 : '-100%'
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ width: 'fit-content' }}
        >
          {/* Duplicate the array for seamless loop */}
          {[...tickerData, ...tickerData].map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              className="flex items-center px-8 py-3 min-w-fit border-r border-dark-400/30 hover:bg-dark-300/30 transition-colors cursor-pointer group"
            >
              {/* Stock Symbol */}
              <div className="flex items-center gap-2 mr-4">
                <span className="font-bold text-white group-hover:text-accent-blue transition-colors">
                  {stock.symbol}
                </span>
                <div className={`${getSentimentColor(stock.sentiment)} opacity-70`}>
                  {getSentimentIcon(stock.sentiment)}
                </div>
                {stock.alerts > 0 && (
                  <div className="bg-accent-red text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {stock.alerts}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mr-4">
                <div className="text-white font-mono text-sm">
                  ${stock.price.toFixed(2)}
                </div>
              </div>

              {/* Change */}
              <div className={`mr-4 ${stock.change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                <div className="flex items-center gap-1 font-mono text-sm">
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
                  <span className="text-xs">({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                </div>
              </div>

              {/* Volume */}
              <div className="text-gray-400 text-xs">
                Vol: {stock.volume}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default StockTicker