import React, { createContext, useContext, useState, useEffect } from 'react'

interface Account {
  id: string
  handle: string
  name: string
  followers: string
  avgEngagement: number
  tracked: boolean
}

interface RedditSource {
  id: string
  subreddit: string
  name: string
  members: string
  avgActivity: number
  tracked: boolean
}

interface AccountsContextType {
  accounts: Account[]
  trackedAccounts: Account[]
  redditSources: RedditSource[]
  trackedRedditSources: RedditSource[]
  addAccount: (account: Account) => void
  removeAccount: (id: string) => void
  toggleTracking: (id: string) => void
  addRedditSource: (source: RedditSource) => void
  removeRedditSource: (id: string) => void
  toggleRedditTracking: (id: string) => void
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined)

const mockAccounts: Account[] = [
  { id: '1', handle: '@DeItaone', name: 'Walter Bloomberg', followers: '2.1M', avgEngagement: 8500, tracked: true },
  { id: '2', handle: '@unusual_whales', name: 'Unusual Whales', followers: '1.8M', avgEngagement: 12000, tracked: true },
  { id: '3', handle: '@FirstSquawk', name: 'First Squawk', followers: '482K', avgEngagement: 5200, tracked: false },
  { id: '4', handle: '@zerohedge', name: 'ZeroHedge', followers: '1.7M', avgEngagement: 7800, tracked: true },
  { id: '5', handle: '@LiveSquawk', name: 'LiveSquawk', followers: '234K', avgEngagement: 3100, tracked: false },
]

const mockRedditSources: RedditSource[] = [
  { id: '1', subreddit: 'r/wallstreetbets', name: 'WallStreetBets', members: '15.1M', avgActivity: 25000, tracked: true },
  { id: '2', subreddit: 'r/investing', name: 'Investing', members: '2.1M', avgActivity: 8500, tracked: true },
  { id: '3', subreddit: 'r/stocks', name: 'Stocks', members: '4.8M', avgActivity: 12000, tracked: false },
  { id: '4', subreddit: 'r/SecurityAnalysis', name: 'Security Analysis', members: '186K', avgActivity: 1200, tracked: true },
  { id: '5', subreddit: 'r/ValueInvesting', name: 'Value Investing', members: '292K', avgActivity: 2100, tracked: false },
  { id: '6', subreddit: 'r/options', name: 'Options', members: '1.2M', avgActivity: 6800, tracked: true },
]

export const AccountsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('mirrorLakeAccounts')
    return saved ? JSON.parse(saved) : mockAccounts
  })

  const [redditSources, setRedditSources] = useState<RedditSource[]>(() => {
    const saved = localStorage.getItem('mirrorLakeRedditSources')
    return saved ? JSON.parse(saved) : mockRedditSources
  })

  const trackedAccounts = accounts.filter(acc => acc.tracked)
  const trackedRedditSources = redditSources.filter(source => source.tracked)

  useEffect(() => {
    localStorage.setItem('mirrorLakeAccounts', JSON.stringify(accounts))
  }, [accounts])

  useEffect(() => {
    localStorage.setItem('mirrorLakeRedditSources', JSON.stringify(redditSources))
  }, [redditSources])

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

  const addRedditSource = (source: RedditSource) => {
    setRedditSources([...redditSources, source])
  }

  const removeRedditSource = (id: string) => {
    setRedditSources(redditSources.filter(source => source.id !== id))
  }

  const toggleRedditTracking = (id: string) => {
    setRedditSources(redditSources.map(source =>
      source.id === id ? { ...source, tracked: !source.tracked } : source
    ))
  }

  return (
    <AccountsContext.Provider value={{ 
      accounts, 
      trackedAccounts, 
      redditSources,
      trackedRedditSources,
      addAccount, 
      removeAccount, 
      toggleTracking,
      addRedditSource,
      removeRedditSource,
      toggleRedditTracking
    }}>
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