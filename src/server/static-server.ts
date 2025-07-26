import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5002

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../../dist')))

// API routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/trending', (_req, res) => {
  res.json({
    stocks: [
      { ticker: 'NVDA', mentions: 1247, sentiment: 0.82, change: 4.5 },
      { ticker: 'TSLA', mentions: 892, sentiment: 0.65, change: -2.1 },
      { ticker: 'AMD', mentions: 756, sentiment: 0.78, change: 3.2 },
    ]
  })
})

// Serve index.html for all other routes (SPA)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Static server running on http://localhost:${PORT}`)
})