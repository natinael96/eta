import { useState, useEffect } from 'react'
import './App.css'

const TOTAL_TICKETS = 3000
const TOTAL_PRIZES = 8
const STORAGE_KEY = 'ticketDrawResults'
const REVEAL_DELAY = 800 // milliseconds between each reveal

const PRIZES = [
  { rank: '1st Prize', name: 'Smart Phone' },
  { rank: '2nd Prize', name: 'በገና' },
  { rank: '3rd Prize', name: 'AirPods' },
  { rank: '4th Prize', name: 'መጽሐፍ ቅዱስ' },
  { rank: '5th Prize', name: 'አሐቲ ድንግል' },
  { rank: '6th Prize', name: 'ነጠላ' },
  { rank: '7th Prize', name: 'Unlimited Package' },
  { rank: '8th Prize', name: 'ሰዕለ አድኅኖ' }
]

function App() {
  const [results, setResults] = useState([])
  const [visibleResults, setVisibleResults] = useState([])
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [drawComplete, setDrawComplete] = useState(false)

  // Load results from local storage on mount
  useEffect(() => {
    const storedResults = localStorage.getItem(STORAGE_KEY)
    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults)
        setResults(parsed)
        setVisibleResults(parsed) // Show all results if loaded from storage
        setCurrentRevealIndex(parsed.length)
        setHasDrawn(true)
        setDrawComplete(true)
      } catch (error) {
        console.error('Error loading stored results:', error)
      }
    }
  }, [])

  // Fisher-Yates shuffle algorithm for fair randomization
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleDraw = () => {
    // Create array of all ticket numbers (1 to 3000)
    const allTickets = Array.from({ length: TOTAL_TICKETS }, (_, i) => i + 1)
    
    // Shuffle and select 8 unique tickets
    const shuffled = shuffleArray(allTickets)
    const selectedTickets = shuffled.slice(0, TOTAL_PRIZES)
    
    // Create results array with prize assignments
    const drawResults = selectedTickets.map((ticket, index) => ({
      prize: PRIZES[index].rank,
      prizeName: PRIZES[index].name,
      ticket: ticket,
      timestamp: new Date().toISOString()
    }))
    
    // Save to state and local storage
    setResults(drawResults)
    setVisibleResults([])
    setCurrentRevealIndex(0)
    setHasDrawn(true)
    setDrawComplete(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drawResults))
  }

  const handleRevealNext = () => {
    if (isSpinning || currentRevealIndex >= results.length) return
    
    // Start spinning animation
    setIsSpinning(true)
    
    // After spinning animation, reveal the next winner
    setTimeout(() => {
      const nextIndex = currentRevealIndex
      setVisibleResults(prev => [...prev, results[nextIndex]])
      setCurrentRevealIndex(nextIndex + 1)
      setIsSpinning(false)
      
      // Check if all winners are revealed
      if (nextIndex + 1 >= results.length) {
        setDrawComplete(true)
      }
    }, 2000) // Spinning duration
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the draw? This will clear all results and allow a new draw.'
    )
    
    if (confirmed) {
      setResults([])
      setVisibleResults([])
      setCurrentRevealIndex(0)
      setHasDrawn(false)
      setDrawComplete(false)
      setIsSpinning(false)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <img src="/5kilo-gbigubae-logo.png" alt="Logo" className="logo" />
          <h1>🎟️ Ticket Draw</h1>
          <p className="subtitle">Total Tickets: {TOTAL_TICKETS}</p>
        </header>

        <div className="controls">
          {!hasDrawn ? (
            <button
              className="btn btn-primary"
              onClick={handleDraw}
            >
              Draw Winners
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleRevealNext}
              disabled={isSpinning || drawComplete}
            >
              {isSpinning ? 'Spinning...' : drawComplete ? 'All Winners Revealed' : `Reveal ${PRIZES[currentRevealIndex].rank} - ${PRIZES[currentRevealIndex].name}`}
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSpinning}
          >
            Reset
          </button>
        </div>

        {/* Lottery Wheel Spinner */}
        {isSpinning && (
          <div className="lottery-wheel-container">
            <div className="lottery-wheel">
              <div className="wheel-inner">
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
                <div className="wheel-segment"></div>
              </div>
              <div className="wheel-pointer"></div>
            </div>
            <p className="spinning-text">Drawing Winner...</p>
          </div>
        )}

        <div className="results">
          {results.length > 0 ? (
            <div className="results-list">
              {PRIZES.map((prize, index) => {
                const result = visibleResults.find(r => r.prize === prize.rank)
                const isVisible = result !== undefined
                
                return (
                  <div 
                    key={index} 
                    className={`result-item ${isVisible ? 'revealed' : 'hidden'}`}
                  >
                    <div className="prize-info">
                      <span className="prize-rank">{prize.rank}</span>
                      <span className="prize-name">{prize.name}</span>
                    </div>
                    <span className="arrow">→</span>
                    {isVisible ? (
                      <span className="ticket-number">Ticket #{result.ticket}</span>
                    ) : (
                      <span className="ticket-number placeholder">?</span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="no-results">
              <p>No draw results yet. Click "Draw Winners" to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

