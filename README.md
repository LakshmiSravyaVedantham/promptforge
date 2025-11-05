# 🚀 PromptForge

> Generate production-ready full-stack applications in 60 seconds from a single prompt.

[![GitHub Stars](https://img.shields.io/github/stars/LakshmiSravya123/promptforge?style=social)](https://github.com/LakshmiSravya123/promptforge)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](Dockerfile)

![PromptForge Demo](https://via.placeholder.com/800x400/1a1a1a/007acc?text=📹+Demo+GIF+Coming+Soon)

*👆 Watch: From prompt to production-ready app in 60 seconds*

## ✨ What is PromptForge?

PromptForge is a **web-based full-stack application generator** that turns your idea into a complete, deployable application in seconds. No AI API keys required - it uses built-in templates matched to your description.

### 🎯 Features

- **⚡ 60-Second Generation** - Complete React + FastAPI + Supabase apps in under a minute
- **🎨 Modern UI** - Cursor/Windsurf-inspired dark theme interface
- **📦 1-Click Deploy** - Ready-to-deploy with Netlify + Render + Supabase
- **💯 100% Free** - No API keys, no subscriptions, fully open source
- **🔧 Template-Based** - Smart template matching (no external AI dependencies)

## 🏗️ Built-In Templates

- ✅ **Todo List** - Task management with filters
- 📺 **YouTube Summarizer** - Video transcript summarization
- 🔗 **URL Shortener** - Link shortening with click tracking
- 💰 **Expense Tracker** - Personal finance management
- 📝 **Notes App** - Markdown note-taking
- 🌤️ **Weather App** - Weather forecasting
- 🍕 **Recipe Manager** - Cooking recipes organizer
- 🧾 **Invoice Generator** - Professional invoicing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git

**OR**

- Docker and Docker Compose (easiest!)

### Option 1: Docker (Recommended)

```bash
# Clone and run with one command
git clone https://github.com/LakshmiSravya123/promptforge.git
cd promptforge
docker-compose up
```

Open **http://localhost:3000** - that's it! 🎉

### Option 2: Manual Installation

```bash
# Clone the repository
git clone https://github.com/LakshmiSravya123/promptforge.git
cd promptforge

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### Run Locally

```bash
# Terminal 1: Start backend (port 8000)
cd backend
python main.py

# Terminal 2: Start frontend (port 3000)
cd frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

## 💡 Usage

1. **Enter your app idea** in the prompt box:
   - "A simple todo list app"
   - "YouTube video summarizer with AI"
   - "URL shortener with analytics"

2. **Click Generate** - PromptForge matches your idea to the best template

3. **View the code** - Browse through:
   - 📁 Frontend (React + Vite)
   - 🚀 Backend (FastAPI)
   - 🗄️ Database (Supabase SQL)
   - 📦 Deploy instructions

4. **Copy and deploy** - Follow the 1-click deploy guide

## 📁 Project Structure

```
promptforge/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Main generator UI
│   │   ├── Result.jsx       # Code display component
│   │   ├── index.css        # Cursor/Windsurf dark theme
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # FastAPI backend
│   ├── templates/           # App templates (JSON)
│   │   ├── todo.json
│   │   ├── youtube.json
│   │   ├── url_shortener.json
│   │   └── expense.json
│   ├── main.py              # API server
│   └── requirements.txt
│
└── README.md
```

## 🛠️ How It Works

1. **User enters prompt** → Frontend sends to `/api/generate`
2. **Backend matches keywords** → Finds best template from `templates/`
3. **Template processing** → Replaces `{APP_NAME}` placeholders
4. **Returns code** → Frontend displays in tabbed interface
5. **User copies code** → Deploys to Netlify + Render + Supabase

## 🎨 Customization

### Add New Templates

Create a new JSON file in `backend/templates/`:

```json
{
  "name": "my_template",
  "frontend": "// Your React code with {APP_NAME} placeholder",
  "backend": "# Your FastAPI code with {APP_NAME} placeholder",
  "database": "-- Your Supabase schema",
  "deploy": "# Deployment instructions"
}
```

Update `match_template()` in `backend/main.py`:

```python
templates = {
    'my_template': ['keyword1', 'keyword2', 'keyword3'],
    # ... other templates
}
```

### Customize UI Theme

Edit `frontend/src/index.css` CSS variables:

```css
:root {
  --accent-primary: #007acc;  /* Change primary color */
  --bg-primary: #1a1a1a;      /* Change background */
}
```

## 🌐 Deployment

### Deploy PromptForge Itself

**Frontend (Netlify):**
```bash
cd frontend
npm run build
# Deploy dist/ folder to Netlify
```

**Backend (Render):**
```bash
cd backend
# Add to Render web service
# Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Contribution Ideas
- 📝 Add new templates (we need 15+ more!)
- 🐛 Report bugs or suggest features
- 📚 Improve documentation
- ⭐ Star the repo to show support

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- UI inspired by [Cursor](https://cursor.sh) and [Windsurf](https://windsurf.ai)
- Built with [React](https://reactjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [Vite](https://vitejs.dev/)
- Deploy powered by [Netlify](https://netlify.com), [Render](https://render.com), and [Supabase](https://supabase.com)

## 📧 Support

- 🐛 [Report Bugs](https://github.com/yourusername/promptforge/issues)
- 💡 [Request Features](https://github.com/yourusername/promptforge/issues)
- ⭐ [Star on GitHub](https://github.com/yourusername/promptforge)

---

**Made with ⚡ by the PromptForge team**

*Generate apps, not excuses.*
