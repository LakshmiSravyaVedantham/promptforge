import { useState } from 'react'

function Result({ result, onBack }) {
  const [activeTab, setActiveTab] = useState('frontend')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadZip = async () => {
    setDownloading(true)
    
    try {
      // Dynamically import JSZip (code splitting)
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      
      // Add frontend files
      const frontend = zip.folder('frontend')
      frontend.folder('src')
      frontend.file('src/App.jsx', result.frontend_code)
      frontend.file('src/index.css', '/* Add Cursor/Windsurf theme from PromptForge */')
      frontend.file('src/main.jsx', `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`)
      frontend.file('package.json', '{\n  "name": "' + result.app_name.toLowerCase() + '",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-react": "^4.2.1",\n    "vite": "^5.0.8"\n  }\n}')
      frontend.file('vite.config.js', `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})`)
      frontend.file('index.html', `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${result.app_name}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`)
      
      // Add backend files
      const backend = zip.folder('backend')
      backend.file('main.py', result.backend_code)
      backend.file('requirements.txt', 'fastapi==0.104.1\nuvicorn==0.24.0\npydantic==2.5.0')
      backend.file('.env.example', 'SUPABASE_URL=your_supabase_url\nSUPABASE_KEY=your_supabase_key')
      
      // Add database files
      const supabase = zip.folder('supabase')
      supabase.file('schema.sql', result.database_schema)
      
      // Add root files
      zip.file('README.md', `# ${result.app_name}\n\n${result.idea}\n\n## Quick Start\n\n### Frontend\n\`\`\`bash\ncd frontend\nnpm install\nnpm run dev\n\`\`\`\n\n### Backend\n\`\`\`bash\ncd backend\npip install -r requirements.txt\npython main.py\n\`\`\`\n\n## Deployment\n\nSee DEPLOY.md for deployment instructions.`)
      zip.file('DEPLOY.md', result.deploy_instructions)
      zip.file('.gitignore', 'node_modules/\n__pycache__/\n*.pyc\n.env\ndist/\nbuild/')
      
      // Generate and download ZIP
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${result.app_name.toLowerCase()}-generated.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('ZIP generation failed:', error)
      alert('Failed to create ZIP file. Try copying the code manually.')
    }
    
    setTimeout(() => setDownloading(false), 1000)
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
          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              className="copy-btn secondary"
              onClick={handleDownloadZip}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <div className="spinner" style={{width: '14px', height: '14px'}}></div>
                  Downloading...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download All
                </>
              )}
            </button>
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
