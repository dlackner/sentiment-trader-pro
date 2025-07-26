import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Hash, TrendingUp } from 'lucide-react'

interface Keyword {
  text: string
  value: number
  trend: 'up' | 'down' | 'neutral'
  accounts: string[]
}

const mockKeywords: Keyword[] = [
  { text: 'NVDA', value: 85, trend: 'up', accounts: ['@DeItaone', '@unusual_whales', '@zerohedge'] },
  { text: 'AI', value: 78, trend: 'up', accounts: ['@DeItaone', '@zerohedge'] },
  { text: 'earnings', value: 65, trend: 'neutral', accounts: ['@unusual_whales', '@FirstSquawk'] },
  { text: 'breakout', value: 62, trend: 'up', accounts: ['@unusual_whales'] },
  { text: 'Fed', value: 58, trend: 'down', accounts: ['@DeItaone', '@zerohedge', '@LiveSquawk'] },
  { text: 'options', value: 55, trend: 'up', accounts: ['@unusual_whales'] },
  { text: 'volume', value: 52, trend: 'up', accounts: ['@unusual_whales', '@FirstSquawk'] },
  { text: 'Tesla', value: 48, trend: 'down', accounts: ['@DeItaone'] },
  { text: 'support', value: 45, trend: 'neutral', accounts: ['@unusual_whales'] },
  { text: 'resistance', value: 42, trend: 'neutral', accounts: ['@unusual_whales'] },
  { text: 'bullish', value: 40, trend: 'up', accounts: ['@unusual_whales', '@zerohedge'] },
  { text: 'crypto', value: 38, trend: 'down', accounts: ['@zerohedge'] },
  { text: 'inflation', value: 35, trend: 'down', accounts: ['@DeItaone', '@zerohedge'] },
  { text: 'rally', value: 32, trend: 'up', accounts: ['@FirstSquawk'] },
  { text: 'dip', value: 30, trend: 'neutral', accounts: ['@unusual_whales'] },
]

const KeywordMap: React.FC = () => {
  const maxValue = Math.max(...mockKeywords.map(k => k.value))
  
  const getSize = (value: number) => {
    const normalized = value / maxValue
    return 0.8 + normalized * 2.2 // Size between 0.8rem and 3rem
  }
  
  const getColor = (trend: string, value: number) => {
    const intensity = value / maxValue
    if (trend === 'up') return `rgba(0, 255, 136, ${0.5 + intensity * 0.5})`
    if (trend === 'down') return `rgba(255, 51, 102, ${0.5 + intensity * 0.5})`
    return `rgba(255, 187, 0, ${0.5 + intensity * 0.5})`
  }

  const sortedKeywords = useMemo(() => 
    [...mockKeywords].sort((a, b) => b.value - a.value),
    []
  )

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Hash className="w-5 h-5 text-accent-blue" />
          Trending Keywords
        </h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent-green rounded-full" />
            <span className="text-gray-400">Bullish</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent-red rounded-full" />
            <span className="text-gray-400">Bearish</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent-yellow rounded-full" />
            <span className="text-gray-400">Neutral</span>
          </div>
        </div>
      </div>

      <div className="relative h-96 overflow-hidden rounded-lg bg-dark-300/30 p-4">
        <div className="flex flex-wrap gap-4 items-center justify-center h-full">
          {sortedKeywords.map((keyword, index) => (
            <motion.div
              key={keyword.text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer"
            >
              <div
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 
                           hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                style={{
                  fontSize: `${getSize(keyword.value)}rem`,
                  color: getColor(keyword.trend, keyword.value),
                  backgroundColor: `${getColor(keyword.trend, keyword.value)}20`,
                  border: `1px solid ${getColor(keyword.trend, keyword.value)}50`
                }}
              >
                {keyword.text}
                {keyword.value > 60 && (
                  <TrendingUp className="inline-block ml-1 w-4 h-4" />
                )}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                              pointer-events-none z-10">
                <div className="bg-dark-200 border border-dark-400 rounded-lg p-3 shadow-xl">
                  <div className="text-sm font-medium mb-1">{keyword.text}</div>
                  <div className="text-xs text-gray-400">
                    <div>Mentions: {keyword.value}</div>
                    <div>Trend: {keyword.trend}</div>
                    <div className="mt-1">Accounts:</div>
                    <div className="text-xs">{keyword.accounts.join(', ')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-blue/20 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-dark-300/50 rounded-lg">
          <div className="text-2xl font-bold text-accent-green">{mockKeywords.filter(k => k.trend === 'up').length}</div>
          <div className="text-xs text-gray-400">Bullish Terms</div>
        </div>
        <div className="p-3 bg-dark-300/50 rounded-lg">
          <div className="text-2xl font-bold text-accent-red">{mockKeywords.filter(k => k.trend === 'down').length}</div>
          <div className="text-xs text-gray-400">Bearish Terms</div>
        </div>
        <div className="p-3 bg-dark-300/50 rounded-lg">
          <div className="text-2xl font-bold text-accent-yellow">{mockKeywords.filter(k => k.trend === 'neutral').length}</div>
          <div className="text-xs text-gray-400">Neutral Terms</div>
        </div>
      </div>
    </div>
  )
}

export default KeywordMap