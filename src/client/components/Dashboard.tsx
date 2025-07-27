import React from 'react'
import { TrendingUp, AlertCircle, Activity, BarChart3, RefreshCw } from 'lucide-react'
import TrendingStocks from './TrendingStocks'
import SentimentChart from './SentimentChart'
import AlertsFeed from './AlertsFeed'
import MarketOverview from './MarketOverview'
import KeywordMap from './KeywordMap'
import AdvancedSearch from './AdvancedSearch'
import ConnectionStatus from './ConnectionStatus'
import AutoRefresh from './AutoRefresh'
import { useRefresh } from '../hooks/useRefresh'

const Dashboard: React.FC = () => {
  const { refresh, isRefreshing } = useRefresh()
  
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Dashboard</h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-gray-400">Real-time sentiment analysis and market data</p>
            <AutoRefresh onRefresh={refresh} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ConnectionStatus />
          <button 
            onClick={refresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-dark-300/50 hover:bg-dark-300 
                       text-gray-400 hover:text-white rounded-lg transition-all group
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>
      </div>

      {/* Advanced Search */}
      <AdvancedSearch />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrendingStocks />
          <KeywordMap />
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