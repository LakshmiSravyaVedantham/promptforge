from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from pathlib import Path
from typing import Optional
from difflib import SequenceMatcher

app = FastAPI()

# Optional AI integration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
USE_AI = OPENAI_API_KEY is not None

if USE_AI:
    try:
        from openai import OpenAI
        ai_client = OpenAI(api_key=OPENAI_API_KEY)
        print("✅ AI integration enabled (OpenAI)")
    except ImportError:
        USE_AI = False
        print("⚠️  OpenAI package not installed. Install with: pip install openai")
else:
    print("ℹ️  Running in template-only mode (set OPENAI_API_KEY for AI features)")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str

class GenerateResponse(BaseModel):
    app_name: str
    idea: str
    frontend_code: str
    backend_code: str
    database_schema: str
    deploy_instructions: str

# Load templates
templates_dir = Path(__file__).parent / "templates"

def load_template(name: str) -> dict:
    """Load a template JSON file"""
    template_path = templates_dir / f"{name}.json"
    if not template_path.exists():
        return None
    with open(template_path, 'r') as f:
        return json.load(f)

def match_template(idea: str) -> tuple[str, dict]:
    """Match user idea to the most appropriate template using fuzzy matching"""
    idea_lower = idea.lower()
    
    # Template matching keywords
    templates = {
        'youtube': ['youtube', 'video', 'transcript', 'summarize video', 'video summary'],
        'invoice': ['invoice', 'bill', 'receipt', 'billing', 'payment tracker'],
        'scraper': ['scrape', 'scraper', 'web scraping', 'extract data', 'crawl'],
        'todo': ['todo', 'task', 'to-do', 'task manager', 'checklist'],
        'url_shortener': ['url', 'link', 'shortener', 'shorten', 'tiny url'],
        'recipe': ['recipe', 'cooking', 'food', 'ingredients', 'meal'],
        'expense': ['expense', 'budget', 'spending', 'finance', 'money tracker'],
        'notes': ['notes', 'note-taking', 'notebook', 'markdown', 'memo'],
        'weather': ['weather', 'forecast', 'temperature', 'climate'],
        'quiz': ['quiz', 'trivia', 'questions', 'test', 'exam'],
    }
    
    # First try exact keyword matching
    for template_name, keywords in templates.items():
        if any(keyword in idea_lower for keyword in keywords):
            template = load_template(template_name)
            if template:
                print(f"✅ Exact match: {template_name}")
                return template_name, template
    
    # If no exact match, try fuzzy matching
    best_match = None
    best_score = 0.0
    similarity_threshold = 0.6  # 60% similarity
    
    for template_name, keywords in templates.items():
        for keyword in keywords:
            similarity = SequenceMatcher(None, idea_lower, keyword).ratio()
            if similarity > best_score:
                best_score = similarity
                best_match = template_name
    
    if best_score >= similarity_threshold:
        template = load_template(best_match)
        if template:
            print(f"🔍 Fuzzy match: {best_match} (similarity: {best_score:.2%})")
            return best_match, template
    
    # No match found - return None to trigger AI generation if available
    print(f"⚠️  No template match for: '{idea}' (best similarity: {best_score:.2%})")
    return None, None

def generate_app_name(idea: str, template_name: str) -> str:
    """Generate a clean app name"""
    # Use first 3 words of idea or template name
    words = idea.split()[:3]
    if len(words) >= 2:
        return ''.join(word.capitalize() for word in words)
    return template_name.capitalize() + 'App' if template_name else 'CustomApp'

def generate_with_ai(idea: str) -> dict:
    """Generate app code using AI when no template matches"""
    if not USE_AI:
        raise HTTPException(
            status_code=400, 
            detail="No template match found. Enable AI by setting OPENAI_API_KEY environment variable."
        )
    
    prompt = f"""Generate a complete full-stack web application for this idea: "{idea}"

Return a JSON object with these fields:
- app_name: A PascalCase name for the app
- frontend_code: Complete React + Vite app code with all files (App.jsx, package.json, etc.)
- backend_code: Complete FastAPI Python code with all routes
- database_schema: Supabase PostgreSQL schema with tables
- deploy_instructions: Step-by-step deployment guide for Netlify + Render + Supabase

Make the code production-ready, well-commented, and include modern UI styling similar to Cursor/Windsurf dark theme."""

    try:
        response = ai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert full-stack developer who generates complete, production-ready web applications."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=4000
        )
        
        # Parse AI response
        content = response.choices[0].message.content
        # Try to extract JSON from response
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        
        return json.loads(content)
    except Exception as e:
        print(f"AI generation error: {e}")
        # Fallback to todo template
        return {
            'app_name': generate_app_name(idea, 'todo'),
            **load_template('todo')
        }

@app.get("/")
def read_root():
    return {"status": "PromptForge API is running"}

@app.get("/api/health")
def health_check():
    return {"ok": True, "service": "promptforge-backend"}

@app.post("/api/generate", response_model=GenerateResponse)
async def generate_app(request: IdeaRequest):
    """Generate a full-stack app from an idea"""
    if not request.idea or len(request.idea.strip()) < 10:
        raise HTTPException(status_code=400, detail="Idea must be at least 10 characters")
    
    # Try template matching first
    template_name, template = match_template(request.idea)
    
    # If no template match and AI is available, use AI
    if not template and USE_AI:
        print(f"🤖 Using AI to generate app for: {request.idea}")
        ai_result = generate_with_ai(request.idea)
        return GenerateResponse(
            app_name=ai_result.get('app_name', 'CustomApp'),
            idea=request.idea,
            frontend_code=ai_result.get('frontend_code', ''),
            backend_code=ai_result.get('backend_code', ''),
            database_schema=ai_result.get('database_schema', ''),
            deploy_instructions=ai_result.get('deploy_instructions', '')
        )
    
    # If no template and no AI, use todo as fallback
    if not template:
        print(f"⚠️  No template match for '{request.idea}', using Todo template as fallback")
        template_name = 'todo'
        template = load_template('todo')
    
    if not template:
        raise HTTPException(status_code=500, detail="Could not find appropriate template")
    
    # Generate app name
    app_name = generate_app_name(request.idea, template_name)
    
    print(f"✅ Generated {app_name} using template: {template_name}")
    
    # Replace placeholders in template
    frontend_code = template['frontend'].replace('{APP_NAME}', app_name)
    backend_code = template['backend'].replace('{APP_NAME}', app_name)
    database_schema = template['database'].replace('{APP_NAME}', app_name)
    deploy_instructions = template['deploy'].replace('{APP_NAME}', app_name)
    
    return GenerateResponse(
        app_name=app_name,
        idea=request.idea,
        frontend_code=frontend_code,
        backend_code=backend_code,
        database_schema=database_schema,
        deploy_instructions=deploy_instructions
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
