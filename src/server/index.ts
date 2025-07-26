import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/trending', (req, res) => {
  res.json({
    stocks: [
      { ticker: 'NVDA', mentions: 1247, sentiment: 0.82, change: 4.5 },
      { ticker: 'TSLA', mentions: 892, sentiment: 0.65, change: -2.1 },
      { ticker: 'AMD', mentions: 756, sentiment: 0.78, change: 3.2 },
    ]
  })
})

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

const PORT = process.env.PORT || 5001
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})