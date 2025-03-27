#!/bin/bash

# Variables
GITHUB_USERNAME="ghanshyamrao"
REPO_NAME="music_player"
BRANCH_NAME="main"

# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub manually, then add the remote origin
echo "Create a new repository on GitHub manually: https://github.com/new"
read -p "Press Enter after creating the repository..."

# Add remote GitHub repository
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Set branch name and push code
git branch -M "$BRANCH_NAME"
git push -u origin "$BRANCH_NAME"

echo "Git repository '$REPO_NAME' successfully set up and pushed to GitHub!"
