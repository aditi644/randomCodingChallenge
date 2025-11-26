# Micro Coding Challenges

A minimal web application that displays random micro coding challenges with a beautiful glassmorphism UI.

## Features

- 🎯 Random coding challenges at the click of a button
- 🎨 Modern glassmorphism design
- 🔍 Optional filters by language and difficulty
- ⚡ Fast response with caching
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js + Node.js
- **Styling**: CSS3 with glassmorphism effects
- **API**: GitHub raw content

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install server dependencies:
```bash
cd server
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
```

### Running the Application

1. Start the backend server (from the `server` directory):
```bash
npm start
```
The server will run on http://localhost:5000

2. Start the frontend (from the `client` directory):
```bash
npm run dev
```
The app will run on http://localhost:3000

3. Open your browser and navigate to http://localhost:3000

## Project Structure

```
micro-coding/
├── client/              # React frontend
│   ├── src/
│   │   ├── App.jsx     # Main app component
│   │   ├── App.css     # Glassmorphism styles
│   │   └── main.jsx    # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/              # Express backend
│   ├── server.js       # API server
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/challenges` - Fetch all challenges
- `GET /api/challenge/random` - Get a random challenge
  - Query params: `language`, `difficulty`

## Usage

1. Click "Give me a challenge" to get a random coding challenge
2. Use the filter dropdowns to narrow challenges by language or difficulty
3. Click again to get a new challenge

## Notes

- Challenges are cached for 24 hours to improve performance
- Filter functionality uses keyword matching on challenge text
- The external API provides plain text challenges without metadata
