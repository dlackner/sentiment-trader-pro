import React, { useState } from 'react'
import { Plus, X, MessageSquare, TrendingUp, Users, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccounts } from '../context/AccountsContext'

const RedditSourcesManager: React.FC = () => {
  const { redditSources, addRedditSource, removeRedditSource, toggleRedditTracking } = useAccounts()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSubreddit, setNewSubreddit] = useState('')

  const addSource = () => {
    if (newSubreddit.trim()) {
      const cleanSubreddit = newSubreddit.startsWith('r/') ? newSubreddit : `r/${newSubreddit}`
      const newSource = {
        id: Date.now().toString(),
        subreddit: cleanSubreddit,
        name: cleanSubreddit.replace('r/', ''),
        members: '0',
        avgActivity: 0,
        tracked: true
      }
      addRedditSource(newSource)
      setNewSubreddit('')
      setShowAddModal(false)
    }
  }

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            Reddit Sources
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {redditSources.filter(s => s.tracked).length} active / {redditSources.length} total
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 
                     text-orange-500 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Subreddit
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {redditSources.map((source) => (
          <motion.div
            key={source.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`p-4 rounded-lg transition-all ${
              source.tracked ? 'bg-dark-300/70 border border-orange-500/30' : 'bg-dark-300/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  source.tracked ? 'bg-orange-500/20' : 'bg-dark-400/50'
                }`}>
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="font-medium">{source.subreddit}</div>
                  <div className="text-sm text-gray-400">{source.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {source.members}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {source.avgActivity.toLocaleString()} daily
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRedditTracking(source.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      source.tracked 
                        ? 'bg-accent-green/20 text-accent-green hover:bg-accent-green/30' 
                        : 'bg-dark-400/50 text-gray-400 hover:bg-dark-400/70'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeRedditSource(source.id)}
                    className="p-2 rounded-lg bg-dark-400/50 text-gray-400 
                               hover:bg-accent-red/20 hover:text-accent-red transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-dark-200 p-6 rounded-xl border border-dark-400 w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Add Reddit Source</h3>
              <input
                type="text"
                value={newSubreddit}
                onChange={(e) => setNewSubreddit(e.target.value)}
                placeholder="Enter subreddit (e.g., wallstreetbets)"
                className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg 
                           focus:border-orange-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && addSource()}
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addSource}
                  className="flex-1 py-2 bg-orange-500/20 hover:bg-orange-500/30 
                             text-orange-500 rounded-lg transition-colors"
                >
                  Add Subreddit
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-dark-400/50 hover:bg-dark-400/70 
                             text-gray-400 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RedditSourcesManager