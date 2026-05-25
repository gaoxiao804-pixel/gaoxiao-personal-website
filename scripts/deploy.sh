#!/bin/bash
set -e

echo "Building..."
npm run build

echo "Deploying to gh-pages..."
cd dist
git init
git checkout -b gh-pages
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

REPO="https://github.com/gaoxiao804-pixel/gaoxiao-personal-website.git"
TOKEN=$(gh auth token 2>/dev/null || echo "")
if [ -n "$TOKEN" ]; then
  REPO="https://oauth2:${TOKEN}@github.com/gaoxiao804-pixel/gaoxiao-personal-website.git"
fi

git push -f "$REPO" gh-pages
cd ..
rm -rf dist/.git

echo "Done! https://gaoxiao804-pixel.github.io/gaoxiao-personal-website/"
