import React, { createContext, useContext, useState, useEffect } from 'react'

interface Account {
  id: string
  handle: string
  name: string
  followers: string
  avgEngagement: number
  tracked: boolean
}

interface AccountsContextType {
  accounts: Account[]
  trackedAccounts: Account[]
  addAccount: (account: Account) => void
  removeAccount: (id: string) => void
  toggleTracking: (id: string) => void
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined)

const mockAccounts: Account[] = [
  { id: '1', handle: '@DeItaone', name: 'Walter Bloomberg', followers: '2.1M', avgEngagement: 8500, tracked: true },
  { id: '2', handle: '@unusual_whales', name: 'Unusual Whales', followers: '1.8M', avgEngagement: 12000, tracked: true },
  { id: '3', handle: '@FirstSquawk', name: 'First Squawk', followers: '482K', avgEngagement: 5200, tracked: false },
  { id: '4', handle: '@zerohedge', name: 'ZeroHedge', followers: '1.7M', avgEngagement: 7800, tracked: true },
  { id: '5', handle: '@LiveSquawk', name: 'LiveSquawk', followers: '234K', avgEngagement: 3100, tracked: false },
]

export const AccountsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('mirrorLakeAccounts')
    return saved ? JSON.parse(saved) : mockAccounts
  })

  const trackedAccounts = accounts.filter(acc => acc.tracked)

  useEffect(() => {
    localStorage.setItem('mirrorLakeAccounts', JSON.stringify(accounts))
  }, [accounts])

  const addAccount = (account: Account) => {
    setAccounts([...accounts, account])
  }

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id))
  }

  const toggleTracking = (id: string) => {
    setAccounts(accounts.map(acc =>
      acc.id === id ? { ...acc, tracked: !acc.tracked } : acc
    ))
  }

  return (
    <AccountsContext.Provider value={{ accounts, trackedAccounts, addAccount, removeAccount, toggleTracking }}>
      {children}
    </AccountsContext.Provider>
  )
}

export const useAccounts = () => {
  const context = useContext(AccountsContext)
  if (!context) {
    throw new Error('useAccounts must be used within AccountsProvider')
  }
  return context
}