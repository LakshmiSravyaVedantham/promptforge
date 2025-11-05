#!/bin/bash

# 🚀 PromptForge - Quick Start Script
# This script starts both frontend and backend servers

set -e

echo "🚀 Starting PromptForge..."
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the promptforge directory"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Activate venv and check Python dependencies
if [ ! -f "../.venv/bin/python" ]; then
    echo "❌ Error: Python virtual environment not found"
    echo "Please run: python -m venv ../.venv"
    exit 1
fi

# Install Python packages if needed
echo "📦 Checking backend dependencies..."
../.venv/bin/pip install -q -r backend/requirements.txt

# Start backend server
echo "🔧 Starting backend server (port 8000)..."
cd backend
../.venv/bin/python main.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start frontend server
echo "🎨 Starting frontend server (port 3000)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 3

echo ""
echo "✅ PromptForge is running!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend:  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# Keep script running
wait
