#!/bin/bash

# Quiz App Deployment Script
echo "🚀 Starting Quiz App deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are ready in the 'build' directory"
    echo ""
    echo "🌐 Deployment options:"
    echo "1. Netlify: Drag and drop the 'build' folder to netlify.com"
    echo "2. Vercel: Run 'npx vercel' in the project directory"
    echo "3. GitHub Pages: Run 'npm install -g gh-pages && npm run deploy'"
    echo ""
    echo "📋 To start development server: npm start"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

