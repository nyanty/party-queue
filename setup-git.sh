#!/bin/bash

echo "🎵 Party Queue - Deployment Setup"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Party Queue app"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. Run these commands (replace YOUR-USERNAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR-USERNAME/party-queue.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Then follow DEPLOY_INSTRUCTIONS.md to deploy to Vercel + Render"
echo ""
