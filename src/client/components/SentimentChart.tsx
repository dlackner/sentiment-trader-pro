import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const data = [
  { time: '09:30', sentiment: 65, volume: 1200 },
  { time: '10:00', sentiment: 68, volume: 1500 },
  { time: '10:30', sentiment: 72, volume: 1800 },
  { time: '11:00', sentiment: 75, volume: 2200 },
  { time: '11:30', sentiment: 82, volume: 3500 },
  { time: '12:00', sentiment: 79, volume: 3200 },
  { time: '12:30', sentiment: 85, volume: 4100 },
  { time: '13:00', sentiment: 88, volume: 4800 },
]

const SentimentChart: React.FC = () => {
  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Market Sentiment Timeline</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-green rounded-full mr-2" />
            <span className="text-gray-400">Sentiment</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-blue rounded-full mr-2" />
            <span className="text-gray-400">Volume</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00bbff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00bbff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2a2a2a', 
                border: '1px solid #444',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="sentiment" 
              stroke="#00ff88" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#sentimentGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="volume" 
              stroke="#00bbff" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#volumeGradient)" 
              yAxisId="right"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SentimentChart