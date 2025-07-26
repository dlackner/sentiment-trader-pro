#!/bin/bash

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
GITHUB_USERNAME="dlackner"

git remote add origin https://github.com/$GITHUB_USERNAME/sentiment-trader-pro.git
git push -u origin main

echo "Pushed to GitHub! Your repository is at: https://github.com/$GITHUB_USERNAME/sentiment-trader-pro"