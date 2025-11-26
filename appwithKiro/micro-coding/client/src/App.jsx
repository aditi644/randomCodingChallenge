import { useState } from 'react';
import './App.css';

function App() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ language: '', difficulty: '' });

  const fetchChallenge = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let url = '/api/challenge/random';
      const params = new URLSearchParams();
      
      if (filters.language) params.append('language', filters.language);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch challenge');
      }
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setCurrentChallenge(null);
      } else {
        setCurrentChallenge(data.challenge);
      }
    } catch (err) {
      setError('Unable to load challenge. Please try again.');
      console.error('Error fetching challenge:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Micro Coding Challenges</h1>
      
      <div className="filter-panel glass">
        <select 
          className="filter-select"
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        
        <select 
          className="filter-select"
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      <button 
        className="challenge-button glass"
        onClick={fetchChallenge}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Give me a challenge'}
      </button>
      
      <div className="challenge-box glass">
        {error ? (
          <p className="error-text">{error}</p>
        ) : isLoading ? (
          <p className="loading-text">Loading your challenge...</p>
        ) : currentChallenge ? (
          <p className="challenge-text">{currentChallenge}</p>
        ) : (
          <p className="placeholder-text">Click the button to get started!</p>
        )}
      </div>
    </div>
  );
}

export default App;
