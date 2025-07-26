import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp } from 'lucide-react'

const sectorData = [
  { name: 'Technology', value: 35, sentiment: 82 },
  { name: 'Healthcare', value: 20, sentiment: 65 },
  { name: 'Finance', value: 15, sentiment: 71 },
  { name: 'Energy', value: 12, sentiment: 58 },
  { name: 'Consumer', value: 10, sentiment: 76 },
  { name: 'Other', value: 8, sentiment: 62 },
]

const COLORS = ['#00ff88', '#00bbff', '#ffbb00', '#ff3366', '#ff88ff', '#88ffff']

const MarketOverview: React.FC = () => {
  return (
    <div className="data-card">
      <h2 className="text-xl font-bold mb-4">Sector Sentiment</h2>
      
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2a2a2a', 
                border: '1px solid #444',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {sectorData.map((sector, index) => (
          <div key={sector.name} className="flex items-center justify-between p-2 rounded hover:bg-dark-300/50">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">{sector.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-dark-400 rounded-full h-1.5">
                <div 
                  className="h-full bg-gradient-to-r from-accent-red to-accent-green rounded-full"
                  style={{ width: `${sector.sentiment}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{sector.sentiment}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketOverview