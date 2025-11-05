# 🚀 Push PromptForge to GitHub

## Quick Setup (2 minutes)

### Step 1: Create Repository on GitHub
1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name**: `promptforge`
   - **Description**: `⚡ Generate production-ready full-stack apps in 60 seconds - React + FastAPI + Supabase`
   - **Visibility**: ✅ Public (recommended for portfolio)
   - **Initialize**: ❌ Do NOT add README, .gitignore, or license (we have them)
3. Click **"Create repository"**

### Step 2: Push Code
After creating the repository, run these commands:

```bash
cd /Users/sravyalu/uniforge/promptforge

# Verify remote is set
git remote -v

# Push to GitHub
git push -u origin main
```

That's it! Your code is now on GitHub! 🎉

---

## Alternative: Create Directly from Terminal

If you install GitHub CLI, you can create the repo automatically:

```bash
# Install GitHub CLI (macOS)
brew install gh

# Login
gh auth login

# Create and push in one command
cd /Users/sravyalu/uniforge/promptforge
gh repo create LakshmiSravya123/promptforge --public --source=. --remote=origin --push
```

---

## What Will Be Pushed

✅ **20 files, 4,149 lines of code**

```
promptforge/
├── .gitignore              ✅ Git exclusions
├── README.md              ✅ 300+ lines documentation
├── USAGE.md               ✅ Usage guide
├── DELIVERED.md           ✅ Feature list
├── start.sh               ✅ Startup script
├── backend/               ✅ FastAPI with AI
│   ├── main.py           
│   ├── requirements.txt  
│   ├── .env.example      
│   └── templates/        ✅ 4 templates
└── frontend/              ✅ React + Vite
    ├── src/              ✅ 1,300+ lines
    └── package.json      
```

---

## After Pushing

### Add Topics to Repository
1. Go to your repo: `https://github.com/LakshmiSravya123/promptforge`
2. Click **⚙️ About** → **Topics**
3. Add: `react`, `fastapi`, `vite`, `full-stack`, `code-generator`, `ai`, `supabase`, `netlify`, `app-generator`

### Enable GitHub Pages (Optional)
If you want to host the frontend:
1. Settings → Pages
2. Source: Deploy from branch
3. Branch: `main`, folder: `/frontend`

### Add Repository Description
Click **⚙️ About** and add:
> ⚡ Generate production-ready full-stack apps in 60 seconds. No coding required. React + FastAPI + Supabase.

---

## Troubleshooting

### "Repository not found"
- Make sure you created the repo on GitHub first
- Check spelling: `LakshmiSravya123/promptforge`

### "Permission denied"
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/LakshmiSravya123/promptforge.git
git push -u origin main
```

### "Updates were rejected"
```bash
# Force push (first time only)
git push -u origin main --force
```

---

**Ready? Create the repo and push!** 🚀
