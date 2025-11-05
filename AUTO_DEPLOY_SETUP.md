# 🚀 Auto-Deployment Setup

PromptForge now **automatically deploys generated apps** and returns live URLs!

## How It Works

1. **Generate**: User describes their app idea
2. **Deploy**: Backend automatically deploys to Netlify
3. **Live URL**: User gets instant live link to their working app

## Setup (Optional)

### Without NETLIFY_TOKEN
- ✅ App generation works fine
- ✅ Users get full source code
- ❌ No auto-deployment (code-only mode)

### With NETLIFY_TOKEN  
- ✅ App generation works
- ✅ Users get full source code
- ✅ **Auto-deployment to live URL!**

## Get Your Netlify Token

1. Go to https://app.netlify.com/user/applications#personal-access-tokens
2. Click **"New access token"**
3. Give it a name: "PromptForge Auto Deploy"
4. Copy the token (starts with `nfp_...`)

## Add Token to Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add new variable:
   - **Name**: `NETLIFY_TOKEN`
   - **Value**: `nfp_your_token_here`
   - **Environments**: Production, Preview, Development
3. Click **Save**
4. **Redeploy** your app

## Test It

```bash
# Generate an app
curl -X POST https://your-promptforge.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"idea":"Todo list with categories"}'

# Response includes:
{
  "app_name": "TodoListWith",
  "live_url": "https://promptforge-todolistwith-123456.netlify.app",
  "deployment_status": "deployed",
  "frontend_code": "...",
  "backend_code": "...",
  ...
}
```

## User Experience

### Before (Code Only):
1. User submits idea
2. Gets 4 code tabs (Frontend/Backend/Database/Deploy)
3. Must manually deploy themselves

### After (Live URL):
1. User submits idea
2. Gets **live working app URL** immediately
3. Can click "Open Live App →" button
4. Still has access to source code

## Free Tier Limits

**Netlify Free:**
- 300 build minutes/month
- 100 GB bandwidth/month
- Unlimited sites
- Perfect for demos!

## Disable Auto-Deploy

Remove `NETLIFY_TOKEN` from Vercel environment variables. App will continue working in code-only mode.

## FAQ

**Q: What if deployment fails?**  
A: User still gets full source code. Deployment is a bonus feature.

**Q: Can users customize deployed apps?**  
A: No, these are demo deployments. Users should download code and deploy their own copy for customization.

**Q: Which templates auto-deploy?**  
A: All of them! (todo, youtube, url_shortener, expense, etc.)

**Q: Cost?**  
A: Netlify free tier is generous. 300 deploys/month easily.
