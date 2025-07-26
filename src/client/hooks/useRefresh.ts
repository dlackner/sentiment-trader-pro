import { useState, useCallback } from 'react'

export const useRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setLastRefresh(new Date())
    setIsRefreshing(false)
    
    // Trigger re-render of components
    window.dispatchEvent(new Event('dataRefresh'))
  }, [])

  return { refresh, isRefreshing, lastRefresh }
}