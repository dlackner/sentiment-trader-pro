import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Hash, TrendingUp } from 'lucide-react'
import { useAccounts } from '../context/AccountsContext'

interface Keyword {
  text: string
  value: number
  trend: 'up' | 'down' | 'neutral'
  sources: {
    platform: 'x' | 'reddit'
    accounts: string[]
  }[]
}

const allKeywords: Keyword[] = [
  { 
    text: 'NVDA', 
    value: 85, 
    trend: 'up', 
    sources: [
      { platform: 'x', accounts: ['@DeItaone', '@unusual_whales', '@zerohedge'] },
      { platform: 'reddit', accounts: ['r/wallstreetbets', 'r/investing'] }
    ]
  },
  { 
    text: 'AI', 
    value: 78, 
    trend: 'up', 
    sources: [
      { platform: 'x', accounts: ['@DeItaone', '@zerohedge'] },
      { platform: 'reddit', accounts: ['r/investing', 'r/SecurityAnalysis'] }
    ]
  },
  { 
    text: 'earnings', 
    value: 65, 
    trend: 'neutral', 
    sources: [
      { platform: 'x', accounts: ['@unusual_whales', '@FirstSquawk'] },
      { platform: 'reddit', accounts: ['r/investing', 'r/SecurityAnalysis'] }
    ]
  },
  { 
    text: 'breakout', 
    value: 62, 
    trend: 'up', 
    sources: [
      { platform: 'x', accounts: ['@unusual_whales'] },
      { platform: 'reddit', accounts: ['r/wallstreetbets'] }
    ]
  },
  { 
    text: 'Fed', 
    value: 58, 
    trend: 'down', 
    sources: [
      { platform: 'x', accounts: ['@DeItaone', '@zerohedge', '@LiveSquawk'] },
      { platform: 'reddit', accounts: ['r/investing'] }
    ]
  },
  { 
    text: 'options', 
    value: 55, 
    trend: 'up', 
    sources: [
      { platform: 'x', accounts: ['@unusual_whales'] },
      { platform: 'reddit', accounts: ['r/options', 'r/wallstreetbets'] }
    ]
  },
  { 
    text: 'YOLO', 
    value: 52, 
    trend: 'up', 
    sources: [
      { platform: 'reddit', accounts: ['r/wallstreetbets'] }
    ]
  },
  { 
    text: 'Tesla', 
    value: 48, 
    trend: 'down', 
    sources: [
      { platform: 'x', accounts: ['@DeItaone'] },
      { platform: 'reddit', accounts: ['r/wallstreetbets'] }
    ]
  },
  { 
    text: 'DDs', 
    value: 45, 
    trend: 'neutral', 
    sources: [
      { platform: 'reddit', accounts: ['r/wallstreetbets', 'r/SecurityAnalysis'] }
    ]
  },
  { 
    text: 'diamond hands', 
    value: 42, 
    trend: 'up', 
    sources: [
      { platform: 'reddit', accounts: ['r/wallstreetbets'] }
    ]
  },
  { 
    text: 'bullish', 
    value: 40, 
    trend: 'up', 
    sources: [
      { platform: 'x', accounts: ['@unusual_whales', '@zerohedge'] },
      { platform: 'reddit', accounts: ['r/investing'] }
    ]
  },
  { 
    text: 'crypto', 
    value: 38, 
    trend: 'down', 
    sources: [
      { platform: 'x', accounts: ['@zerohedge'] }
    ]
  },
  { 
    text: 'inflation', 
    value: 35, 
    trend: 'down', 
    sources: [
      { platform: 'x', accounts: ['@DeItaone', '@zerohedge'] },
      { platform: 'reddit', accounts: ['r/investing'] }
    ]
  },
  { 
    text: 'to the moon', 
    value: 32, 
    trend: 'up', 
    sources: [
      { platform: 'reddit', accounts: ['r/wallstreetbets'] }
    ]
  },
  { 
    text: 'value play', 
    value: 30, 
    trend: 'neutral', 
    sources: [
      { platform: 'reddit', accounts: ['r/ValueInvesting', 'r/SecurityAnalysis'] }
    ]
  },
]

const KeywordMap: React.FC = () => {
  const { trackedAccounts, trackedRedditSources } = useAccounts()
  const trackedHandles = trackedAccounts.map(acc => acc.handle)
  const trackedSubreddits = trackedRedditSources.map(source => source.subreddit)
  
  // Filter keywords to only show ones from tracked sources
  const filteredKeywords = useMemo(() => {
    return allKeywords.filter(keyword => 
      keyword.sources.some(source => {
        if (source.platform === 'x') {
          return source.accounts.some(account => trackedHandles.includes(account))
        } else if (source.platform === 'reddit') {
          return source.accounts.some(account => trackedSubreddits.includes(account))
        }
        return false
      })
    ).map(keyword => {
      // Filter sources to only include tracked ones
      const filteredSources = keyword.sources.map(source => ({
        ...source,
        accounts: source.accounts.filter(account => 
          source.platform === 'x' 
            ? trackedHandles.includes(account)
            : trackedSubreddits.includes(account)
        )
      })).filter(source => source.accounts.length > 0)
      
      // Calculate total tracked accounts across all platforms
      const totalTrackedAccounts = filteredSources.reduce((sum, source) => sum + source.accounts.length, 0)
      const totalOriginalAccounts = keyword.sources.reduce((sum, source) => sum + source.accounts.length, 0)
      
      return {
        ...keyword,
        sources: filteredSources,
        // Adjust value based on how many tracked accounts mention it
        value: Math.floor(keyword.value * (totalTrackedAccounts / totalOriginalAccounts))
      }
    }).filter(keyword => keyword.sources.length > 0)
  }, [trackedHandles, trackedSubreddits])

  const maxValue = Math.max(...(filteredKeywords.length > 0 ? filteredKeywords.map(k => k.value) : [1]))
  
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
    [...filteredKeywords].sort((a, b) => b.value - a.value),
    [filteredKeywords]
  )

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Hash className="w-5 h-5 text-accent-blue" />
            Trending Keywords
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            From {trackedAccounts.length} X account{trackedAccounts.length !== 1 ? 's' : ''} + {trackedRedditSources.length} subreddit{trackedRedditSources.length !== 1 ? 's' : ''}
          </p>
        </div>
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
                           hover:scale-110 hover:shadow-lg backdrop-blur-sm relative"
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
                
                {/* Platform indicators */}
                <div className="absolute -top-1 -right-1 flex gap-0.5">
                  {keyword.sources.some(s => s.platform === 'x') && (
                    <div className="w-3 h-3 bg-accent-blue rounded-full text-[8px] flex items-center justify-center text-white font-bold">
                      𝕏
                    </div>
                  )}
                  {keyword.sources.some(s => s.platform === 'reddit') && (
                    <div className="w-3 h-3 bg-orange-500 rounded-full text-[8px] flex items-center justify-center text-white font-bold">
                      r
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                              pointer-events-none z-10">
                <div className="bg-dark-200 border border-dark-400 rounded-lg p-3 shadow-xl min-w-48">
                  <div className="text-sm font-medium mb-2">{keyword.text}</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Mentions: {keyword.value}</div>
                    <div>Trend: {keyword.trend}</div>
                    {keyword.sources.map((source, idx) => (
                      <div key={idx} className="mt-2">
                        <div className="flex items-center gap-1 text-gray-300">
                          {source.platform === 'x' ? (
                            <span className="text-accent-blue">𝕏</span>
                          ) : (
                            <span className="text-orange-500">r/</span>
                          )}
                          <span className="capitalize">{source.platform}</span>
                        </div>
                        <div className="text-xs ml-4">{source.accounts.join(', ')}</div>
                      </div>
                    ))}
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
          <div className="text-2xl font-bold text-accent-green">{filteredKeywords.filter(k => k.trend === 'up').length}</div>
          <div className="text-xs text-gray-400">Bullish Terms</div>
        </div>
        <div className="p-3 bg-dark-300/50 rounded-lg">
          <div className="text-2xl font-bold text-accent-red">{filteredKeywords.filter(k => k.trend === 'down').length}</div>
          <div className="text-xs text-gray-400">Bearish Terms</div>
        </div>
        <div className="p-3 bg-dark-300/50 rounded-lg">
          <div className="text-2xl font-bold text-accent-yellow">{filteredKeywords.filter(k => k.trend === 'neutral').length}</div>
          <div className="text-xs text-gray-400">Neutral Terms</div>
        </div>
      </div>
      
      {filteredKeywords.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          <p>No keywords found from tracked sources.</p>
          <p className="text-sm mt-1">Enable tracking for X accounts or Reddit sources to see trending keywords.</p>
        </div>
      )}
    </div>
  )
}

export default KeywordMap