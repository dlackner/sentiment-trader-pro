import React from 'react'
import { TrendingUp, AlertCircle, Activity, BarChart3, RefreshCw, Target, Zap } from 'lucide-react'
import TrendingStocks from './TrendingStocks'
import AlertsFeed from './AlertsFeed'
import MarketOverview from './MarketOverview'
import KeywordMap from './KeywordMap'
import AdvancedSearch from './AdvancedSearch'
import ConnectionStatus from './ConnectionStatus'
import AutoRefresh from './AutoRefresh'
import OptionsFlow from './OptionsFlow'
import VolatilityTracker from './VolatilityTracker'
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Market Pulse"
          value="127"
          subtitle="Trending mentions"
          change="+23%"
          trend="up"
          details="High social activity"
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6" />}
          title="Active Alerts"
          value="14"
          subtitle="Live notifications"
          change="+5 new"
          trend="up"
          details="2 whale alerts"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Trade Opportunities"
          value="5"
          subtitle="High conviction plays"
          change="3 high IV"
          trend="up"
          details="2 momentum, 1 volatility"
        />
      </div>

      {/* Trending Keywords - Featured at top */}
      <KeywordMap />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Primary Content - Trading Opportunities */}
        <div className="xl:col-span-3 space-y-6">
          <TrendingStocks />
          
          {/* Secondary Grid - Options & Volatility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OptionsFlow />
            <VolatilityTracker />
          </div>
        </div>
        
        {/* Sidebar - Alerts & Market Overview */}
        <div className="xl:col-span-1 space-y-6">
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
  subtitle: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  details: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, change, trend, details }) => {
  const trendColor = trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'text-accent-yellow'
  
  return (
    <div className="data-card hover:bg-dark-300/30 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-dark-300 ${trendColor}`}>
          {icon}
        </div>
        <div className="text-right">
          <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
          <div className="text-xs text-gray-500 mt-1">{details}</div>
        </div>
      </div>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  )
}

export default Dashboard