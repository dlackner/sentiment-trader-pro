import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, TrendingUp, MessageSquare, Hash, Clock, X, Zap } from 'lucide-react'

interface SearchResult {
  id: string
  type: 'stock' | 'keyword' | 'account' | 'subreddit'
  title: string
  subtitle: string
  data?: any
}

const mockSearchResults: SearchResult[] = [
  { id: '1', type: 'stock', title: 'NVDA', subtitle: 'NVIDIA Corp - High options volume, IV 45%', data: { price: 891.52, change: 1.42, iv: 45, optionsVol: 'High' } },
  { id: '2', type: 'stock', title: 'TSLA', subtitle: 'Tesla Inc - Unusual whale activity detected', data: { price: 248.73, change: -2.05, iv: 52, optionsVol: 'Unusual' } },
  { id: '3', type: 'keyword', title: 'earnings beat', subtitle: 'Options play opportunity - 12 stocks mentioned', data: { mentions: 78, trend: 'up', tradingOpportunity: true } },
  { id: '4', type: 'account', title: '@unusual_whales', subtitle: 'Options flow tracker - Recent NVDA alert', data: { followers: '1.8M', platform: 'x', expertise: 'options' } },
  { id: '5', type: 'subreddit', title: 'r/SecurityAnalysis', subtitle: 'Value plays discussion - 45 new posts', data: { members: '186K', platform: 'reddit', focus: 'analysis' } },
  { id: '6', type: 'keyword', title: 'gamma squeeze', subtitle: 'High volatility play - 8 tickers flagged', data: { mentions: 65, trend: 'up', tradingOpportunity: true } },
  { id: '7', type: 'stock', title: 'AMD', subtitle: 'Advanced Micro - Breaking resistance, high call volume', data: { price: 152.34, change: 6.21, iv: 38, optionsVol: 'High' } },
  { id: '8', type: 'keyword', title: 'short squeeze', subtitle: 'Momentum play - 15 mentions last hour', data: { mentions: 42, trend: 'up', tradingOpportunity: true } },
  { id: '9', type: 'stock', title: 'SPY', subtitle: 'S&P 500 ETF - Put/call ratio 0.8, oversold', data: { price: 456.78, change: -0.32, iv: 18, putCallRatio: 0.8 } },
]

interface Filter {
  id: string
  name: string
  active: boolean
  color: string
}

const AdvancedSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [filters, setFilters] = useState<Filter[]>([
    { id: 'stocks', name: 'High IV', active: true, color: 'accent-blue' },
    { id: 'keywords', name: 'Options Plays', active: true, color: 'accent-green' },
    { id: 'accounts', name: 'Flow Trackers', active: true, color: 'accent-yellow' },
    { id: 'subreddits', name: 'Analysis', active: false, color: 'orange-500' },
  ])
  const [recentSearches, setRecentSearches] = useState(['gamma squeeze', 'NVDA calls', 'earnings plays', 'unusual options'])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSearchResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        
        const typeMap = {
          stock: 'stocks',
          keyword: 'keywords', 
          account: 'accounts',
          subreddit: 'subreddits'
        }
        
        const filterActive = filters.find(f => f.id === typeMap[result.type])?.active
        
        return matchesQuery && filterActive
      })
      
      setSearchResults(filtered.slice(0, 6))
    } else {
      setSearchResults([])
    }
  }, [searchQuery, filters])

  const toggleFilter = (filterId: string) => {
    setFilters(prev => prev.map(f => 
      f.id === filterId ? { ...f, active: !f.active } : f
    ))
  }

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'stock': return <TrendingUp className="w-4 h-4 text-accent-blue" />
      case 'keyword': return <Hash className="w-4 h-4 text-accent-green" />
      case 'account': return <MessageSquare className="w-4 h-4 text-accent-yellow" />
      case 'subreddit': return <MessageSquare className="w-4 h-4 text-orange-500" />
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery(result.title)
    setRecentSearches(prev => [result.title, ...prev.filter(s => s !== result.title)].slice(0, 4))
    setIsSearchFocused(false)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className="relative" ref={searchRef}>
      {/* Compact Search Bar */}
      <div className={`relative transition-all duration-300 ${
        isSearchFocused ? 'transform scale-105' : ''
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search tickers, options plays, sentiment..."
              className={`w-full pl-9 pr-9 transition-all duration-200 text-white placeholder-gray-400 
                         border border-dark-400/50 rounded-lg bg-dark-300/50 
                         focus:border-accent-blue focus:bg-dark-300 focus:outline-none ${
                isSearchFocused ? 'py-3' : 'py-2'
              }`}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          
          {/* Compact Filter Pills - shown inline when not focused */}
          {!isSearchFocused && (
            <div className="flex gap-1">
              {filters.filter(f => f.active).map((filter) => (
                <div
                  key={filter.id}
                  className={`px-2 py-1 rounded-full text-xs bg-${filter.color}/20 text-${filter.color} border border-${filter.color}/30`}
                >
                  {filter.name}
                </div>
              ))}
            </div>
          )}
          
          {/* Filter Button */}
          <button className="p-2 bg-dark-300/50 border border-dark-400/50 rounded-lg
                           hover:bg-dark-300 transition-colors group">
            <Filter className="w-4 h-4 text-gray-400 group-hover:text-white" />
          </button>
        </div>

        {/* Expandable Filter Pills - shown when focused */}
        {isSearchFocused && (
          <div className="flex gap-2 mt-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter.active
                    ? `bg-${filter.color}/20 text-${filter.color} border border-${filter.color}/30`
                    : 'bg-dark-400/30 text-gray-400 border border-dark-400/30'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {(isSearchFocused || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-dark-200 border border-dark-400/50 
                       rounded-lg shadow-2xl backdrop-blur-lg z-50 overflow-hidden"
          >
            {searchQuery.length === 0 ? (
              /* Recent Searches */
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Recent Searches</span>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-dark-300/50 
                                 text-gray-300 text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              /* Search Results */
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    className="w-full p-4 hover:bg-dark-300/50 transition-colors text-left
                               border-b border-dark-400/30 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      {getResultIcon(result.type)}
                      <div className="flex-1">
                        <div className="font-medium text-white">{result.title}</div>
                        <div className="text-sm text-gray-400">{result.subtitle}</div>
                      </div>
                      {result.type === 'stock' && result.data && (
                        <div className="text-right">
                          <div className={`text-sm font-mono ${
                            result.data.change >= 0 ? 'text-accent-green' : 'text-accent-red'
                          }`}>
                            {result.data.change >= 0 ? '+' : ''}{result.data.change}%
                          </div>
                          {result.data.iv && (
                            <div className="text-xs text-gray-400">
                              IV: {result.data.iv}%
                            </div>
                          )}
                        </div>
                      )}
                      {result.type === 'keyword' && result.data?.tradingOpportunity && (
                        <div className="flex items-center text-accent-yellow">
                          <Zap className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="p-4 text-center text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdvancedSearch