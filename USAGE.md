# 🎯 PromptForge - Usage Guide

## Quick Start

### 1. Start the Application

```bash
chmod +x start.sh
./start.sh
```

This will start:
- **Backend** on http://localhost:8000
- **Frontend** on http://localhost:3000

### 2. Generate Your First App

1. Open http://localhost:3000 in your browser
2. Enter an app idea in the prompt box:
   - "A YouTube video summarizer"
   - "A URL shortener with click tracking"
   - "An expense tracker app"
3. Click **"⚡ Generate App"**
4. Wait ~2 seconds for generation
5. Browse the generated code in tabs:
   - **Frontend** - React + Vite code
   - **Backend** - FastAPI Python code
   - **Database** - Supabase SQL schema
   - **Deploy** - Step-by-step deployment guide

### 3. Use the Generated Code

**Option A: Copy & Use Locally**
```bash
# Create a new directory
mkdir my-new-app
cd my-new-app

# Copy the frontend code into frontend/
# Copy the backend code into backend/
# Copy the database schema into supabase/

# Install and run
cd frontend && npm install && npm run dev
cd ../backend && pip install -r requirements.txt && python main.py
```

**Option B: Deploy to Production**

Follow the deployment instructions in the **Deploy** tab:
1. Setup Supabase database (2 min)
2. Deploy backend to Render (2 min)
3. Deploy frontend to Netlify (1 min)

## Example Prompts

### ✅ Todo & Task Management
- "Simple todo list with categories"
- "Task manager with due dates and priorities"
- "Team collaboration task board"

### 📺 Content & Media
- "YouTube video summarizer"
- "Video transcript extractor"
- "Podcast episode tracker"

### 🔗 Utilities
- "URL shortener with analytics"
- "QR code generator"
- "File converter tool"

### 💰 Finance & Business
- "Expense tracker with charts"
- "Invoice generator with PDF"
- "Budget planner app"

### 🍕 Lifestyle
- "Recipe manager with search"
- "Workout tracker"
- "Habit tracker app"

### 📝 Productivity
- "Note-taking app with markdown"
- "Pomodoro timer"
- "Meeting notes organizer"

## Built-In Templates

PromptForge currently has these templates:

1. **todo** - Task management app
2. **youtube** - YouTube summarizer
3. **url_shortener** - Link shortening service
4. **expense** - Expense tracking app
5. **recipe** - Recipe management (coming soon)
6. **notes** - Note-taking app (coming soon)
7. **weather** - Weather dashboard (coming soon)

More templates are added regularly!

## How It Works

1. **Keyword Matching** - Your prompt is analyzed for keywords
2. **Template Selection** - Best matching template is selected
3. **Code Generation** - Template is customized with your app name
4. **Instant Delivery** - Complete code returned in <2 seconds

## Customizing Generated Apps

### Change Styling
Edit the generated `frontend/src/index.css` file to customize:
- Colors (CSS variables)
- Spacing and layout
- Component styles

### Add Features
- **Frontend**: Add components in `frontend/src/`
- **Backend**: Add routes in `backend/main.py`
- **Database**: Extend schema in `supabase/schema.sql`

### Deploy Configuration
- **Environment Variables**: Add to `.env` files
- **Build Settings**: Modify `vite.config.js` or `package.json`
- **API URLs**: Update in frontend to point to production backend

## Troubleshooting

### Backend not starting
```bash
# Check Python version (need 3.10+)
python --version

# Reinstall dependencies
cd backend
pip install -r requirements.txt
```

### Frontend build errors
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
- Make sure backend is running on port 8000
- Check that frontend is making requests to `http://localhost:8000`
- For production, update CORS settings in `backend/main.py`

### Port already in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## API Reference

### POST /api/generate

Generate a full-stack app from an idea.

**Request:**
```json
{
  "idea": "A URL shortener with analytics"
}
```

**Response:**
```json
{
  "app_name": "UrlShortener",
  "idea": "A URL shortener with analytics",
  "frontend_code": "...",
  "backend_code": "...",
  "database_schema": "...",
  "deploy_instructions": "..."
}
```

## Tips & Best Practices

1. **Be Specific** - "Todo list with categories and filters" is better than "todo app"
2. **Use Keywords** - Include words like "tracker", "manager", "generator" for better matching
3. **Check Examples** - Click example prompts in the sidebar for inspiration
4. **Iterate Quickly** - Generate, customize, test, repeat
5. **Start Simple** - Begin with basic features, add complexity later

## Next Steps

- ⭐ Star the project on GitHub
- 🐛 Report bugs or request features
- 🤝 Contribute templates
- 📣 Share your generated apps!

---

**Made with ⚡ by PromptForge**
