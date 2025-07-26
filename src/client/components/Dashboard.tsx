import React from 'react'
import { TrendingUp, AlertCircle, Activity, BarChart3 } from 'lucide-react'
import TrendingStocks from './TrendingStocks'
import SentimentChart from './SentimentChart'
import AlertsFeed from './AlertsFeed'
import MarketOverview from './MarketOverview'

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
          Sentiment Trader Pro
        </h1>
        <p className="text-gray-400 mt-2">Real-time social sentiment analysis for options trading</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Trending Now"
          value="127"
          change="+23%"
          trend="up"
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6" />}
          title="Active Alerts"
          value="14"
          change="+5"
          trend="up"
        />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Volatility Spike"
          value="$NVDA"
          change="High"
          trend="neutral"
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Top Sector"
          value="Tech"
          change="+4.2%"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrendingStocks />
          <SentimentChart />
        </div>
        <div className="space-y-6">
          <AlertsFeed />
          <MarketOverview />
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, trend }) => {
  const trendColor = trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'text-accent-yellow'
  
  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-dark-300 ${trendColor}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
      </div>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}

export default Dashboard