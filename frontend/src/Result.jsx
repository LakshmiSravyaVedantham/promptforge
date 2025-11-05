import { useState } from 'react'

function Result({ result, onBack }) {
  const [activeTab, setActiveTab] = useState('frontend')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: '⚛️' },
    { id: 'backend', label: 'Backend', icon: '🚀' },
    { id: 'database', label: 'Database', icon: '🗄️' },
    { id: 'deploy', label: 'Deploy', icon: '📦' }
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="back-btn" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            New App
          </button>
        </div>

        <div className="result-info">
          <div className="result-badge">✅ Generated</div>
          <h2>{result.app_name}</h2>
          <p className="result-idea">{result.idea}</p>
        </div>

        <div className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Project Files</div>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="deploy-cta">
            <strong>Ready to Deploy?</strong>
            <p>Check the Deploy tab for 3 commands</p>
          </div>
        </div>
      </aside>

      <main className="main-content result-content">
        <div className="code-header">
          <h1>
            {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <button 
            className="copy-btn"
            onClick={() => handleCopy(getCurrentContent())}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>

        <div className="code-container">
          {activeTab === 'frontend' && (
            <div className="code-section">
              <div className="file-tree">
                <div className="file-tree-item">📁 frontend/</div>
                <div className="file-tree-item indent">📁 src/</div>
                <div className="file-tree-item indent2">📄 App.jsx</div>
                <div className="file-tree-item indent2">📄 index.css</div>
                <div className="file-tree-item indent2">📄 main.jsx</div>
                <div className="file-tree-item indent">📄 package.json</div>
                <div className="file-tree-item indent">📄 vite.config.js</div>
              </div>
              <pre className="code-block">
                <code>{result.frontend_code}</code>
              </pre>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="code-section">
              <div className="file-tree">
                <div className="file-tree-item">📁 backend/</div>
                <div className="file-tree-item indent">📄 main.py</div>
                <div className="file-tree-item indent">📄 requirements.txt</div>
                <div className="file-tree-item indent">📄 .env.example</div>
              </div>
              <pre className="code-block">
                <code>{result.backend_code}</code>
              </pre>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="code-section">
              <div className="file-tree">
                <div className="file-tree-item">📁 supabase/</div>
                <div className="file-tree-item indent">📄 schema.sql</div>
              </div>
              <pre className="code-block">
                <code>{result.database_schema}</code>
              </pre>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="deploy-section">
              <div className="deploy-steps">
                <h3>🚀 1-Click Deploy Instructions</h3>
                
                <div className="deploy-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Setup Supabase (2 min)</h4>
                    <ol>
                      <li>Go to <a href="https://supabase.com" target="_blank">supabase.com</a></li>
                      <li>Create new project (free tier)</li>
                      <li>SQL Editor → Paste schema → Run</li>
                      <li>Settings → API → Copy URL + anon key</li>
                    </ol>
                  </div>
                </div>

                <div className="deploy-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Push to GitHub (1 min)</h4>
                    <pre className="command-block">
                      <code>{`git init
git add .
git commit -m "Initial commit - ${result.app_name}"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME
git push -u origin main`}</code>
                    </pre>
                  </div>
                </div>

                <div className="deploy-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Deploy Backend (Render) (1 min)</h4>
                    <ol>
                      <li>Go to <a href="https://render.com" target="_blank">render.com</a></li>
                      <li>New → Web Service</li>
                      <li>Connect GitHub repo</li>
                      <li>Root: <code>backend</code></li>
                      <li>Build: <code>pip install -r requirements.txt</code></li>
                      <li>Start: <code>uvicorn main:app --host 0.0.0.0 --port $PORT</code></li>
                      <li>Add env vars: SUPABASE_URL, SUPABASE_KEY</li>
                    </ol>
                  </div>
                </div>

                <div className="deploy-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Deploy Frontend (Netlify) (1 min)</h4>
                    <ol>
                      <li>Go to <a href="https://netlify.com" target="_blank">netlify.com</a></li>
                      <li>New site → Import from Git</li>
                      <li>Base: <code>frontend</code></li>
                      <li>Build: <code>npm run build</code></li>
                      <li>Publish: <code>dist</code></li>
                      <li>Add env var: <code>VITE_API_URL=https://your-app.onrender.com</code></li>
                    </ol>
                  </div>
                </div>

                <div className="deploy-success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div>
                    <strong>Your app is live!</strong>
                    <p>Frontend: https://{result.app_name.toLowerCase()}.netlify.app</p>
                    <p>Backend: https://{result.app_name.toLowerCase()}.onrender.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {activeTab !== 'deploy' && (
          <div className="code-footer">
            <button className="footer-btn" onClick={() => setActiveTab('deploy')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              View Deploy Instructions
            </button>
          </div>
        )}
      </main>
    </div>
  )

  function getCurrentContent() {
    switch (activeTab) {
      case 'frontend':
        return result.frontend_code
      case 'backend':
        return result.backend_code
      case 'database':
        return result.database_schema
      case 'deploy':
        return result.deploy_instructions
      default:
        return ''
    }
  }
}

export default Result
