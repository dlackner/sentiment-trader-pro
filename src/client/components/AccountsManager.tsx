import React, { useState } from 'react'
import { Plus, X, Twitter, TrendingUp, Users, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccounts } from '../context/AccountsContext'

const AccountsManager: React.FC = () => {
  const { accounts, addAccount: addAccountToContext, removeAccount, toggleTracking } = useAccounts()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newHandle, setNewHandle] = useState('')

  const addAccount = () => {
    if (newHandle.trim()) {
      const newAccount = {
        id: Date.now().toString(),
        handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
        name: 'New Account',
        followers: '0',
        avgEngagement: 0,
        tracked: true
      }
      addAccountToContext(newAccount)
      setNewHandle('')
      setShowAddModal(false)
    }
  }

  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Twitter className="w-5 h-5 text-accent-blue" />
            Tracked Accounts
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {accounts.filter(a => a.tracked).length} active / {accounts.length} total
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 
                     text-accent-blue rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Account
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {accounts.map((account) => (
          <motion.div
            key={account.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`p-4 rounded-lg transition-all ${
              account.tracked ? 'bg-dark-300/70 border border-accent-blue/30' : 'bg-dark-300/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  account.tracked ? 'bg-accent-blue/20' : 'bg-dark-400/50'
                }`}>
                  <Twitter className="w-4 h-4 text-accent-blue" />
                </div>
                <div>
                  <div className="font-medium">{account.handle}</div>
                  <div className="text-sm text-gray-400">{account.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {account.followers}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {account.avgEngagement.toLocaleString()} avg
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleTracking(account.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      account.tracked 
                        ? 'bg-accent-green/20 text-accent-green hover:bg-accent-green/30' 
                        : 'bg-dark-400/50 text-gray-400 hover:bg-dark-400/70'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeAccount(account.id)}
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
              <h3 className="text-lg font-bold mb-4">Add X Account</h3>
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                placeholder="Enter @handle"
                className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg 
                           focus:border-accent-blue focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && addAccount()}
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addAccount}
                  className="flex-1 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 
                             text-accent-blue rounded-lg transition-colors"
                >
                  Add Account
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

export default AccountsManager