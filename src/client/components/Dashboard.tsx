import React, { useState } from 'react'
import { TrendingUp, AlertCircle, Activity, BarChart3, RefreshCw, DollarSign, Search, BarChart } from 'lucide-react'
import TrendingStocks from './TrendingStocks'
import SentimentChart from './SentimentChart'
import AlertsFeed from './AlertsFeed'
import MarketOverview from './MarketOverview'
import AccountsManager from './AccountsManager'
import RedditSourcesManager from './RedditSourcesManager'
import KeywordMap from './KeywordMap'
import AutoRefresh from './AutoRefresh'
import StockTicker from './StockTicker'
import NotificationSystem from './NotificationSystem'
import PerformanceDashboard from './PerformanceDashboard'
import AdvancedSearch from './AdvancedSearch'
import ConnectionStatus from './ConnectionStatus'
import { useRefresh } from '../hooks/useRefresh'

interface DashboardProps {
  onNavigateToPricing: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToPricing }) => {
  const { refresh, isRefreshing } = useRefresh()
  const [currentView, setCurrentView] = useState<'dashboard' | 'performance'>('dashboard')
  
  return (
    <div className="min-h-screen">
      {/* Stock Ticker */}
      <StockTicker />
      
      {/* Notification System */}
      <NotificationSystem />
      
      <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-widest text-white uppercase">
            Mirror Lake
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-gray-500 text-sm">Portfolio sentiment intelligence</p>
            <AutoRefresh onRefresh={refresh} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView(currentView === 'dashboard' ? 'performance' : 'dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'performance' 
                ? 'bg-accent-green/20 text-accent-green border border-accent-green/30' 
                : 'bg-dark-300/50 hover:bg-dark-300 text-gray-400 hover:text-white'
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span className="text-sm">Analytics</span>
          </button>
          <button 
            onClick={onNavigateToPricing}
            className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 
                       text-accent-blue rounded-lg transition-all group"
          >
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Pricing</span>
          </button>
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
      </header>

      {/* Advanced Search */}
      <div className="mb-8">
        <AdvancedSearch />
      </div>

      {currentView === 'dashboard' ? (
        <>
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
              <KeywordMap />
              <SentimentChart />
            </div>
            <div className="space-y-6">
              <AccountsManager />
              <RedditSourcesManager />
              <AlertsFeed />
              <MarketOverview />
            </div>
          </div>
        </>
      ) : (
        <PerformanceDashboard />
      )}
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