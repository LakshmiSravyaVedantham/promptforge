import { useState } from 'react'
import Result from './Result'
import './index.css'

const EXAMPLE_PROMPTS = [
  "YouTube video summarizer with transcript",
  "Invoice generator with PDF export",
  "Website scraper with data export",
  "Todo list with categories",
  "URL shortener with analytics",
  "Recipe manager with search",
  "Expense tracker with charts"
]

function App() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Please enter an app idea')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim() })
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Failed to generate app')
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (example) => {
    setIdea(example)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  if (result) {
    return <Result result={result} onBack={() => setResult(null)} />
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span>PromptForge</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Quick Examples</div>
            {EXAMPLE_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className="nav-item"
                onClick={() => handleExampleClick(prompt)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                {prompt}
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="info-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <strong>100% Free</strong>
              <p>No API keys • No credits • Open source</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="hero">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Zero-BS Full-Stack Generator
          </div>
          
          <h1 className="hero-title">
            Type Your Idea.<br />
            Get a Complete App.
          </h1>
          
          <p className="hero-subtitle">
            Generate production-ready React + FastAPI + Supabase apps in 60 seconds.<br />
            Deploy to Netlify + Render with 3 commands. No AI API needed.
          </p>

          <div className="generator-box">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your app idea... (e.g., YouTube video summarizer with transcript)"
                className="prompt-input"
                rows="3"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="error-message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !idea.trim()}
              className="generate-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating App...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  Generate Full-Stack App
                </>
              )}
            </button>

            <div className="tech-badges">
              <span className="tech-badge">React</span>
              <span className="tech-badge">FastAPI</span>
              <span className="tech-badge">Supabase</span>
              <span className="tech-badge">Netlify</span>
              <span className="tech-badge">Render</span>
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>60s Generation</h3>
              <p>Complete frontend, backend, and database code instantly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>1-Click Deploy</h3>
              <p>Copy 3 bash commands and go live on free hosting</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>100% Free</h3>
              <p>No API keys, credits, or paid tiers ever</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔓</div>
              <h3>Open Source</h3>
              <p>Full code ownership, modify anything you want</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
