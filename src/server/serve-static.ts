import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 5002

// Serve static files from the dist directory
const distPath = path.join(process.cwd(), 'dist')
app.use(express.static(distPath))

// API routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/trending', (_req, res) => {
  res.json({
    stocks: [
      { ticker: 'NVDA', mentions: 1247, sentiment: 0.82, change: 4.5, volume: '125M' },
      { ticker: 'TSLA', mentions: 892, sentiment: 0.65, change: -2.1, volume: '98M' },
      { ticker: 'AMD', mentions: 756, sentiment: 0.78, change: 3.2, volume: '67M' },
      { ticker: 'AAPL', mentions: 623, sentiment: 0.71, change: 1.8, volume: '54M' },
      { ticker: 'SPY', mentions: 512, sentiment: 0.54, change: 0.3, volume: '234M' },
    ]
  })
})

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Simulate real-time alerts
setInterval(() => {
  const alerts = [
    { ticker: 'NVDA', type: 'spike', message: 'Unusual activity detected' },
    { ticker: 'TSLA', type: 'news', message: 'Breaking news mention' },
    { ticker: 'AMD', type: 'volume', message: 'Volume spike +250%' },
  ]
  
  const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]
  io.emit('alert', { ...randomAlert, timestamp: new Date().toISOString() })
}, 30000)

// Serve index.html for all other routes (SPA)
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Serving static files from: ${distPath}`)
})