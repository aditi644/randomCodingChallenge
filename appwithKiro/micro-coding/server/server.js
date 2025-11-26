import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;
const CHALLENGES_URL = 'https://raw.githubusercontent.com/aditi644/micro-coding-challenges/main/challenges.json';

// Cache for challenges
let challengesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

app.use(cors());
app.use(express.json());

// Fetch and cache challenges
async function getChallenges() {
  const now = Date.now();
  
  if (challengesCache && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
    return challengesCache;
  }
  
  try {
    const response = await axios.get(CHALLENGES_URL);
    challengesCache = response.data.microChallenges || [];
    cacheTimestamp = now;
    return challengesCache;
  } catch (error) {
    console.error('Error fetching challenges:', error.message);
    throw error;
  }
}

// GET /api/challenges - Return all challenges
app.get('/api/challenges', async (_req, res) => {
  try {
    const challenges = await getChallenges();
    res.json({ challenges });
  } catch (error) {
    res.status(503).json({ error: 'Failed to fetch challenges' });
  }
});

// GET /api/challenge/random - Return a random challenge
app.get('/api/challenge/random', async (req, res) => {
  try {
    let challenges = await getChallenges();
    const { language, difficulty } = req.query;
    
    if (!challenges || challenges.length === 0) {
      return res.status(404).json({ error: 'No challenges available' });
    }
    
    // Filter by language (case-insensitive substring match)
    if (language) {
      challenges = challenges.filter(c => 
        c.toLowerCase().includes(language.toLowerCase())
      );
    }
    
    // Filter by difficulty (basic keyword matching)
    if (difficulty) {
      const difficultyKeywords = {
        easy: ['reverse', 'find', 'sum', 'count'],
        medium: ['sort', 'filter', 'map', 'reduce'],
        hard: ['algorithm', 'optimize', 'complex']
      };
      
      const keywords = difficultyKeywords[difficulty.toLowerCase()] || [];
      if (keywords.length > 0) {
        challenges = challenges.filter(c => 
          keywords.some(keyword => c.toLowerCase().includes(keyword))
        );
      }
    }
    
    if (challenges.length === 0) {
      return res.json({ error: 'No challenges match your filters. Try different options!' });
    }
    
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomIndex];
    
    res.json({ challenge });
  } catch (error) {
    res.status(503).json({ error: 'Failed to fetch challenge' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
