import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Clock, Zap, Copy, Target } from 'lucide-react'

interface OptionsFlow {
  id: string
  ticker: string
  strike: number
  expiry: string
  type: 'call' | 'put'
  volume: number
  premium: number
  direction: 'bought' | 'sold'
  size: 'small' | 'large' | 'whale'
  time: string
}

const mockOptionsFlow: OptionsFlow[] = [
  {
    id: '1',
    ticker: 'NVDA',
    strike: 900,
    expiry: '12/20',
    type: 'call',
    volume: 2500,
    premium: 1.2,
    direction: 'bought',
    size: 'whale',
    time: '2m ago'
  },
  {
    id: '2',
    ticker: 'TSLA',
    strike: 250,
    expiry: '1/17',
    type: 'put',
    volume: 1800,
    premium: 3.4,
    direction: 'bought',
    size: 'large',
    time: '5m ago'
  },
  {
    id: '3',
    ticker: 'AMD',
    strike: 160,
    expiry: '12/27',
    type: 'call',
    volume: 950,
    premium: 2.1,
    direction: 'sold',
    size: 'large',
    time: '8m ago'
  },
  {
    id: '4',
    ticker: 'SPY',
    strike: 460,
    expiry: '12/22',
    type: 'put',
    volume: 3200,
    premium: 0.8,
    direction: 'bought',
    size: 'whale',
    time: '12m ago'
  },
]

const OptionsFlow: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (flow: OptionsFlow) => {
    const text = `${flow.ticker} ${flow.strike}${flow.type === 'call' ? 'C' : 'P'} ${flow.expiry} - $${flow.premium} - ${flow.direction.toUpperCase()}`
    navigator.clipboard.writeText(text)
    setCopied(flow.id)
    setTimeout(() => setCopied(null), 2000)
  }
  const getSizeColor = (size: OptionsFlow['size']) => {
    switch (size) {
      case 'whale': return 'text-accent-red'
      case 'large': return 'text-accent-yellow'
      case 'small': return 'text-accent-blue'
    }
  }

  const getSizeIcon = (size: OptionsFlow['size']) => {
    switch (size) {
      case 'whale': return <Zap className="w-4 h-4" />
      case 'large': return <TrendingUp className="w-4 h-4" />
      case 'small': return <DollarSign className="w-3 h-3" />
    }
  }

  const getDirectionColor = (direction: OptionsFlow['direction']) => {
    return direction === 'bought' ? 'text-accent-green' : 'text-accent-red'
  }

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Options Flow</h2>
        <div className="flex items-center gap-2">
          <div className="animate-pulse">
            <div className="w-2 h-2 bg-accent-green rounded-full" />
          </div>
          <span className="text-xs text-gray-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {mockOptionsFlow.map((flow, index) => (
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 rounded-lg bg-dark-300/30 hover:bg-dark-300/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${getSizeColor(flow.size)}`}>
                    {getSizeIcon(flow.size)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-accent-blue">${flow.ticker}</span>
                      <span className="text-sm text-gray-400">
                        ${flow.strike}{flow.type === 'call' ? 'C' : 'P'} {flow.expiry}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{flow.volume.toLocaleString()} vol</span>
                      <span>•</span>
                      <span className={getDirectionColor(flow.direction)}>
                        {flow.direction.toUpperCase()}
                      </span>
                      <span>•</span>
                      <span>${flow.premium}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${getSizeColor(flow.size)}`}>
                    {flow.size.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {flow.time}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-dark-400/20">
                <button
                  onClick={() => copyToClipboard(flow)}
                  className="flex items-center gap-1 px-2 py-1 bg-dark-400/30 hover:bg-dark-400/50 
                           text-gray-400 hover:text-white text-xs rounded transition-all"
                >
                  <Copy className="w-3 h-3" />
                  {copied === flow.id ? 'Copied!' : 'Copy'}
                </button>
                
                <button className="flex items-center gap-1 px-2 py-1 bg-accent-green/20 hover:bg-accent-green/30 
                                 text-accent-green text-xs rounded transition-all border border-accent-green/30">
                  <Target className="w-3 h-3" />
                  Follow
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dark-400/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-accent-red text-sm font-medium">Whale Alerts</div>
            <div className="text-xl font-bold">2</div>
          </div>
          <div>
            <div className="text-accent-yellow text-sm font-medium">Large Trades</div>
            <div className="text-xl font-bold">8</div>
          </div>
          <div>
            <div className="text-accent-blue text-sm font-medium">Total Volume</div>
            <div className="text-xl font-bold">12.5K</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsFlow