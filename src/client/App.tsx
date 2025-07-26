import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import PricingPage from './components/PricingPage'
import { AccountsProvider } from './context/AccountsContext'

type Page = 'dashboard' | 'pricing'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  return (
    <AccountsProvider>
      <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-100">
        {currentPage === 'dashboard' && (
          <Dashboard onNavigateToPricing={() => setCurrentPage('pricing')} />
        )}
        {currentPage === 'pricing' && (
          <PricingPage onBack={() => setCurrentPage('dashboard')} />
        )}
      </div>
    </AccountsProvider>
  )
}

export default App