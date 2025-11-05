# 🤝 Contributing to PromptForge

Thank you for your interest in contributing to PromptForge! We welcome contributions from everyone.

## 🎯 Ways to Contribute

### 1. Add New Templates
The easiest and most impactful way to contribute! We need templates for:
- Blog CMS / Content Management
- Recipe Manager
- Notes App with Markdown
- Pomodoro Timer
- Weather Dashboard
- Quiz/Trivia Generator
- Contact Manager
- Calendar/Event Planner
- And many more!

### 2. Improve Existing Features
- Better template matching algorithm
- UI/UX improvements
- Performance optimizations
- Bug fixes

### 3. Documentation
- Improve README examples
- Add video tutorials
- Write blog posts
- Translate documentation

## 📝 Template Submission Guidelines

### Template Structure

All templates are JSON files in `backend/templates/`. Here's the structure:

```json
{
  "name": "template_name",
  "frontend": "Complete React + Vite code with {APP_NAME} placeholder",
  "backend": "Complete FastAPI code with {APP_NAME} placeholder",
  "database": "Supabase PostgreSQL schema",
  "deploy": "Deployment instructions for Netlify + Render + Supabase"
}
```

### Step-by-Step: Adding a New Template

#### 1. Create Template File

Create `backend/templates/your_template.json`:

```json
{
  "name": "recipe",
  "frontend": "// {APP_NAME} Frontend\\n\\nimport { useState } from 'react'\\n...",
  "backend": "# {APP_NAME} Backend\\n\\nfrom fastapi import FastAPI\\n...",
  "database": "CREATE TABLE recipes (...)...",
  "deploy": "# Deploy {APP_NAME}\\n\\n1. Setup Supabase..."
}
```

**Requirements:**
- ✅ Must include complete working code
- ✅ Use `{APP_NAME}` placeholder for app name
- ✅ Follow our Cursor/Windsurf dark theme styling
- ✅ Include all necessary imports and dependencies
- ✅ Add comments explaining key sections
- ✅ Include package.json and requirements.txt content

#### 2. Add Keywords to Backend

Edit `backend/main.py` and add your template keywords:

```python
templates = {
    'recipe': ['recipe', 'cooking', 'food', 'ingredients', 'meal'],
    # ... other templates
}
```

**Keyword Guidelines:**
- Add 3-5 relevant keywords
- Include common misspellings if applicable
- Think about how users would describe this app
- Be specific but not too narrow

#### 3. Test Your Template

```bash
# Start backend
cd backend
python main.py

# Test the template
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"idea":"Recipe manager with search"}'
```

**Checklist:**
- [ ] Frontend code is valid React
- [ ] Backend code is valid FastAPI
- [ ] Database schema runs in Supabase
- [ ] No syntax errors
- [ ] {APP_NAME} is replaced correctly
- [ ] All dependencies are listed

#### 4. Submit Pull Request

1. Fork the repository
2. Create a feature branch: `git checkout -b add-recipe-template`
3. Add your template: `backend/templates/recipe.json`
4. Update `backend/main.py` with keywords
5. Commit: `git commit -m "Add recipe manager template"`
6. Push: `git push origin add-recipe-template`
7. Open a Pull Request

**PR Title Format:**
- `Add [Template Name] template`
- Example: `Add Recipe Manager template`

**PR Description Must Include:**
- Screenshot or GIF of generated app
- Example prompt that triggers your template
- List of main features included
- Any special dependencies or setup

## 🐛 Reporting Bugs

### Before Submitting
- Check if the bug has already been reported
- Try to reproduce it with minimal steps
- Check if it happens in the latest version

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. Enter prompt '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.0.0]
- Python version: [e.g., 3.11]
```

## 💡 Feature Requests

We love new ideas! Please:
1. Check if it's already been suggested
2. Explain the use case
3. Describe the expected behavior
4. Add mockups if possible

## 🔨 Development Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git

### Local Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/promptforge.git
cd promptforge

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Run both servers
# Terminal 1
cd backend && python main.py

# Terminal 2
cd frontend && npm run dev
```

### Running Tests

```bash
# Backend tests (when available)
cd backend
pytest

# Frontend tests (when available)
cd frontend
npm test
```

## 📋 Code Style Guidelines

### Python (Backend)
- Follow PEP 8
- Use type hints
- Add docstrings to functions
- Keep functions focused and small

```python
def match_template(idea: str) -> tuple[str, dict]:
    \"\"\"Match user idea to the most appropriate template\"\"\"
    # Implementation
```

### JavaScript/React (Frontend)
- Use functional components
- Use hooks (useState, useEffect)
- Keep components small and focused
- Use meaningful variable names

```javascript
function Result({ result, onBack }) {
  const [activeTab, setActiveTab] = useState('frontend')
  // Implementation
}
```

### CSS
- Follow existing Cursor/Windsurf theme
- Use CSS variables for colors
- Mobile-first responsive design
- Add comments for complex styles

## 🎨 Template Design Guidelines

### Frontend
- **Must have:** Sidebar, main content area, responsive design
- **Colors:** Use CSS variables from index.css
- **Layout:** Modern card-based UI
- **Forms:** Clear labels, validation, error messages
- **Loading states:** Spinners for async operations

### Backend
- **Must have:** CORS enabled, error handling, Pydantic models
- **Routes:** RESTful naming (GET /api/items, POST /api/items)
- **Responses:** Consistent JSON structure
- **Storage:** Support both in-memory (demo) and Supabase

### Database
- **Must have:** Timestamps (created_at, updated_at)
- **Security:** Row Level Security policies
- **Performance:** Indexes on foreign keys and common queries
- **UUIDs:** Use gen_random_uuid() for primary keys

## ✅ PR Review Process

1. **Automated Checks** - Linting, tests (when available)
2. **Code Review** - A maintainer will review within 48 hours
3. **Testing** - We'll test the generated code locally
4. **Merge** - Once approved, we'll merge and deploy

## 🏆 Recognition

Contributors will be:
- Added to README.md Contributors section
- Mentioned in release notes
- Featured on our website (coming soon)

## 📞 Questions?

- Open a [GitHub Discussion](https://github.com/LakshmiSravya123/promptforge/discussions)
- Join our Discord (coming soon)
- Email: [Add your email]

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making PromptForge better! 🚀**
