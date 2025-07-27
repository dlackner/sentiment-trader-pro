import React from 'react'
import { motion } from 'framer-motion'
import { Twitter, MessageSquare, Plus, Settings, TrendingUp, Users, Zap } from 'lucide-react'
import AccountsManager from './AccountsManager'
import RedditSourcesManager from './RedditSourcesManager'
import { useAccounts } from '../context/AccountsContext'

const HomePage: React.FC = () => {
  const { trackedAccounts, trackedRedditSources } = useAccounts()

  const totalSources = trackedAccounts.length + trackedRedditSources.length
  const activeAccounts = trackedAccounts.length
  const activeSubreddits = trackedRedditSources.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Data Sources</h1>
          <p className="text-gray-400">Manage your X accounts and Reddit sources for sentiment analysis</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="data-card text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-accent-blue/20 rounded-lg">
                <Zap className="w-6 h-6 text-accent-blue" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{totalSources}</div>
            <div className="text-gray-400 text-sm">Total Sources</div>
            <div className="text-accent-green text-xs mt-1">Active & Tracking</div>
          </div>

          <div className="data-card text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-accent-blue/20 rounded-lg">
                <Twitter className="w-6 h-6 text-accent-blue" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{activeAccounts}</div>
            <div className="text-gray-400 text-sm">X Accounts</div>
            <div className="text-accent-blue text-xs mt-1">Real-time Tracking</div>
          </div>

          <div className="data-card text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{activeSubreddits}</div>
            <div className="text-gray-400 text-sm">Subreddits</div>
            <div className="text-orange-500 text-xs mt-1">Community Data</div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="data-card"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-accent-green" />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-dark-300/50 hover:bg-dark-300 rounded-lg border border-dark-400/50 
                           hover:border-accent-blue/50 transition-all group text-left">
            <div className="flex items-center gap-3 mb-2">
              <Plus className="w-5 h-5 text-accent-blue group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white">Add X Account</span>
            </div>
            <p className="text-gray-400 text-sm">Track influential traders and analysts</p>
          </button>

          <button className="p-4 bg-dark-300/50 hover:bg-dark-300 rounded-lg border border-dark-400/50 
                           hover:border-orange-500/50 transition-all group text-left">
            <div className="flex items-center gap-3 mb-2">
              <Plus className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white">Add Subreddit</span>
            </div>
            <p className="text-gray-400 text-sm">Monitor community discussions</p>
          </button>

          <button className="p-4 bg-dark-300/50 hover:bg-dark-300 rounded-lg border border-dark-400/50 
                           hover:border-accent-green/50 transition-all group text-left">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-accent-green group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white">Import List</span>
            </div>
            <p className="text-gray-400 text-sm">Bulk import from CSV/JSON</p>
          </button>

          <button className="p-4 bg-dark-300/50 hover:bg-dark-300 rounded-lg border border-dark-400/50 
                           hover:border-accent-yellow/50 transition-all group text-left">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-accent-yellow group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white">Presets</span>
            </div>
            <p className="text-gray-400 text-sm">Popular trader lists</p>
          </button>
        </div>
      </motion.div>

      {/* Popular Sources Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="data-card"
      >
        <h2 className="text-xl font-bold mb-4">Recommended Sources</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular X Accounts */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Twitter className="w-5 h-5 text-accent-blue" />
              Popular X Accounts
            </h3>
            <div className="space-y-3">
              {[
                { handle: '@ElonMusk', desc: 'CEO of Tesla & SpaceX', followers: '163M' },
                { handle: '@CathieDWood', desc: 'CEO/CIO ARK Invest', followers: '1.7M' },
                { handle: '@naval', desc: 'Entrepreneur & Investor', followers: '2.1M' },
                { handle: '@chamath', desc: 'Venture Capitalist', followers: '1.9M' },
              ].map((account, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-300/30 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{account.handle}</div>
                    <div className="text-sm text-gray-400">{account.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{account.followers}</div>
                    <button className="text-xs text-accent-blue hover:text-accent-blue/80">Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Subreddits */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              Popular Subreddits
            </h3>
            <div className="space-y-3">
              {[
                { name: 'r/SecurityAnalysis', desc: 'Value investing discussions', members: '186K' },
                { name: 'r/financialindependence', desc: 'FIRE community', members: '1.5M' },
                { name: 'r/personalfinance', desc: 'Money management advice', members: '17.1M' },
                { name: 'r/dataisbeautiful', desc: 'Data visualization', members: '20.4M' },
              ].map((subreddit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-300/30 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{subreddit.name}</div>
                    <div className="text-sm text-gray-400">{subreddit.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{subreddit.members}</div>
                    <button className="text-xs text-orange-500 hover:text-orange-500/80">Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Source Managers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AccountsManager />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RedditSourcesManager />
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage