import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import PerformanceDashboard from './components/PerformanceDashboard'
import NotificationSystem from './components/NotificationSystem'
import ThemeToggle from './components/ThemeToggle'
import { AccountsProvider } from './context/AccountsContext'
import { ThemeProvider } from './context/ThemeContext'
import { Home, BarChart3, Activity } from 'lucide-react'

type Page = 'home' | 'dashboard' | 'analytics'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigationItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'dashboard' as const, label: 'Dashboard', icon: Activity },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <ThemeProvider>
      <AccountsProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:via-dark-200 dark:to-dark-100 transition-colors duration-300">
          <NotificationSystem />
          
          {/* Navigation Header */}
          <div className="border-b border-gray-200/50 dark:border-dark-400/50 bg-white/80 dark:bg-dark-200/80 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between py-4">
                <div>
                  <h1 className="text-2xl font-light tracking-widest text-gray-900 dark:text-white uppercase">
                    Mirror Lake
                  </h1>
                  <p className="text-gray-600 dark:text-gray-500 text-sm">Portfolio sentiment intelligence</p>
                </div>
                
                <div className="flex items-center gap-3">
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
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-300/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                  
                  {/* Theme Toggle */}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6 max-w-7xl mx-auto">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'analytics' && <PerformanceDashboard />}
          </div>
        </div>
      </AccountsProvider>
    </ThemeProvider>
  )
}

export default App