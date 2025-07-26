# Sentiment Trader Pro

A real-time social sentiment analysis dashboard for options trading, tracking X (Twitter) influencers and market trends.

## Features

- 📊 Real-time trending stocks with sentiment analysis
- 🚨 Smart alerts for unusual activity and influencer mentions
- 📈 Interactive charts showing sentiment over time
- 🎯 Sector-based sentiment heatmaps
- ⚡ WebSocket-powered live updates

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Recharts
- **Backend**: Node.js, Express, Socket.io
- **Styling**: TailwindCSS with custom dark theme

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

This will start both the Express backend (port 5000) and Vite frontend (port 3000).

## Scripts

- `npm run dev` - Run both frontend and backend in development
- `npm run client` - Run frontend only
- `npm run server` - Run backend only
- `npm run build` - Build for production
- `npm start` - Run production server

## Future Enhancements

- X API integration for real-time tweet monitoring
- User authentication and watchlists
- Historical data analysis
- Options flow integration
- AI-powered chat assistant