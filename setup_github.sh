#!/bin/bash
# Radio25 - GitHub Setup Script
# Run this once from Terminal to create the repo and push your files.

TOKEN="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"
USERNAME="MichaelMoeckli"
REPO="Radio25"

echo "==> Creating GitHub repository '$REPO' (private)..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO\",\"private\":true,\"description\":\"BSc Disposition - Radio 25\"}")

REPO_URL=$(echo "$RESPONSE" | grep -o '"html_url": "[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$REPO_URL" ]; then
  echo "    Repo may already exist, continuing..."
fi

echo "==> Setting up git..."
cd "$(dirname "$0")"

# Remove any broken .git folder and start fresh
rm -rf .git

git init
git branch -m main
git config user.name "$USERNAME"
git config user.email "michael.moeckli@swissonline.ch"

echo "==> Adding files..."
git add Disposition_BSc_Radio25_Moeckli.docx quellen_radion25.bib

echo "==> Committing..."
git commit -m "Initial commit"

echo "==> Pushing to GitHub..."
git remote add origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO.git"
git push -u origin main

echo ""
echo "✅ Done! View your repo at: https://github.com/$USERNAME/$REPO"

# Clean up this script (optional)
# rm -- "$0"
