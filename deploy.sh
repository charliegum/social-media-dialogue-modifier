#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi

# Add homepage to package.json if not already there
if ! grep -q '"homepage"' package.json; then
  echo "Adding homepage to package.json..."
  sed -i '' 's/"private": true,/"private": true,\n  "homepage": "https:\/\/charliegum.github.io\/social-media-dialogue-modifier",/g' package.json
fi

# Install gh-pages if not already installed
if ! npm list --depth=0 | grep -q 'gh-pages'; then
  echo "Installing gh-pages package..."
  npm install --save-dev gh-pages
fi

# Add deploy scripts to package.json if not already there
if ! grep -q '"predeploy"' package.json; then
  echo "Adding deploy scripts to package.json..."
  sed -i '' 's/"scripts": {/"scripts": {\n    "predeploy": "npm run build",\n    "deploy": "gh-pages -d build",/g' package.json
fi

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npm run deploy

echo "Deployment complete! Your site should be available at https://charliegum.github.io/social-media-dialogue-modifier"
