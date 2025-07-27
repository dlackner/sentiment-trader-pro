import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Trophy, Target, TrendingUp, DollarSign, Clock, Zap } from 'lucide-react'

const alertPerformanceData = [
  { source: '@unusual_whales', alerts: 24, accuracy: 78, avgReturn: 12.5 },
  { source: '@DeItaone', alerts: 31, accuracy: 82, avgReturn: 8.3 },
  { source: 'r/wallstreetbets', alerts: 45, accuracy: 65, avgReturn: 15.2 },
  { source: '@zerohedge', alerts: 18, accuracy: 88, avgReturn: 6.7 },
  { source: 'r/investing', alerts: 12, accuracy: 91, avgReturn: 4.8 },
]

const weeklyPerformance = [
  { day: 'Mon', alerts: 8, profitable: 6 },
  { day: 'Tue', alerts: 12, profitable: 9 },
  { day: 'Wed', alerts: 15, profitable: 11 },
  { day: 'Thu', alerts: 9, profitable: 7 },
  { day: 'Fri', alerts: 18, profitable: 14 },
  { day: 'Sat', alerts: 3, profitable: 2 },
  { day: 'Sun', alerts: 2, profitable: 1 },
]

const alertTypeData = [
  { name: 'Volume Spike', value: 35, color: '#00ff88' },
  { name: 'Sentiment Shift', value: 28, color: '#00bbff' },
  { name: 'Influencer Post', value: 22, color: '#ffbb00' },
  { name: 'Breaking News', value: 15, color: '#ff3366' },
]

const PerformanceDashboard: React.FC = () => {
  const totalAlerts = alertPerformanceData.reduce((sum, item) => sum + item.alerts, 0)
  const avgAccuracy = alertPerformanceData.reduce((sum, item) => sum + item.accuracy, 0) / alertPerformanceData.length
  const avgReturn = alertPerformanceData.reduce((sum, item) => sum + item.avgReturn, 0) / alertPerformanceData.length

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="data-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Alerts</p>
              <p className="text-2xl font-bold">{totalAlerts}</p>
              <p className="text-accent-green text-xs">+12% this week</p>
            </div>
            <div className="p-3 bg-accent-blue/20 rounded-lg">
              <Zap className="w-6 h-6 text-accent-blue" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="data-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Accuracy</p>
              <p className="text-2xl font-bold">{avgAccuracy.toFixed(1)}%</p>
              <p className="text-accent-green text-xs">+3.2% this week</p>
            </div>
            <div className="p-3 bg-accent-green/20 rounded-lg">
              <Target className="w-6 h-6 text-accent-green" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="data-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Return</p>
              <p className="text-2xl font-bold">{avgReturn.toFixed(1)}%</p>
              <p className="text-accent-green text-xs">+1.8% this week</p>
            </div>
            <div className="p-3 bg-accent-yellow/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent-yellow" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="data-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Response Time</p>
              <p className="text-2xl font-bold">2.4s</p>
              <p className="text-accent-green text-xs">-0.3s this week</p>
            </div>
            <div className="p-3 bg-accent-red/20 rounded-lg">
              <Clock className="w-6 h-6 text-accent-red" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="data-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-accent-yellow" />
            <h3 className="text-lg font-bold">Source Performance</h3>
          </div>
          
          <div className="space-y-4">
            {alertPerformanceData.map((source, index) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{source.source}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">{source.alerts} alerts</span>
                    <span className="text-accent-green">{source.accuracy}% accuracy</span>
                    <span className="text-accent-blue">+{source.avgReturn}% avg</span>
                  </div>
                </div>
                <div className="w-full bg-dark-400 rounded-full h-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-green rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${source.accuracy}%` }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alert Types Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="data-card"
        >
          <h3 className="text-lg font-bold mb-4">Alert Types</h3>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {alertTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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

          <div className="grid grid-cols-2 gap-2 mt-4">
            {alertTypeData.map((type, index) => (
              <div key={type.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-xs text-gray-400">{type.name}</span>
                <span className="text-xs font-medium">{type.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="data-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent-green" />
          <h3 className="text-lg font-bold">Weekly Alert Performance</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2a2a2a', 
                  border: '1px solid #444',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="alerts" fill="#00bbff" name="Total Alerts" />
              <Bar dataKey="profitable" fill="#00ff88" name="Profitable" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}

export default PerformanceDashboard