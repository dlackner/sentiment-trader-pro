import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import PricingPage from './components/PricingPage'
import PerformanceDashboard from './components/PerformanceDashboard'
import NotificationSystem from './components/NotificationSystem'
import { AccountsProvider } from './context/AccountsContext'
import { Home, BarChart3, Activity, DollarSign } from 'lucide-react'

type Page = 'home' | 'dashboard' | 'analytics' | 'pricing'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigationItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'dashboard' as const, label: 'Dashboard', icon: Activity },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'pricing' as const, label: 'Pricing', icon: DollarSign },
  ]

  return (
    <AccountsProvider>
      <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-100">
        <NotificationSystem />
        
        {/* Navigation Header */}
        {currentPage !== 'pricing' && (
          <div className="border-b border-dark-400/50 bg-dark-200/80 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between py-4">
                <div>
                  <h1 className="text-2xl font-light tracking-widest text-white uppercase">
                    Mirror Lake
                  </h1>
                  <p className="text-gray-500 text-sm">Portfolio sentiment intelligence</p>
                </div>
                
                <nav className="flex items-center gap-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          currentPage === item.id
                            ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30'
                            : 'text-gray-400 hover:text-white hover:bg-dark-300/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'analytics' && <PerformanceDashboard />}
          {currentPage === 'pricing' && (
            <PricingPage onBack={() => setCurrentPage('home')} />
          )}
        </div>
      </div>
    </AccountsProvider>
  )
}

export default App