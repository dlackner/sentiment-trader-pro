import React from 'react'
import Dashboard from './components/Dashboard'
import { AccountsProvider } from './context/AccountsContext'

function App() {
  return (
    <AccountsProvider>
      <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-100">
        <Dashboard />
      </div>
    </AccountsProvider>
  )
}

export default App