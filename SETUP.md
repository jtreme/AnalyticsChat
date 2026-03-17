# Analytics Tutor — Setup Guide

## What this is
A full tutoring app for your analytics course. Tutor chat, MC quiz, flaw detection, OLS visual, CI calculator, Excel lab — all at one URL. Students need no accounts, no downloads.

## What you need
- A free Netlify account (netlify.com — sign up with Google)
- Your Anthropic API key (platform.anthropic.com → API Keys)

## Step 1 — Create a Netlify account
Go to netlify.com and sign up. Free tier is plenty.

## Step 2 — Deploy the site

### Option A: Drag and drop (easiest)
1. Go to app.netlify.com
2. Find the "Deploy manually" section at the bottom — drag the entire `analytics-tutor` folder onto it
3. Netlify gives you a URL like `https://random-name-123.netlify.app`

### Option B: GitHub (best for updates)
1. Create a GitHub account if you don't have one
2. Create a new public repository called `analytics-tutor`
3. Upload all files from the `analytics-tutor` folder
4. In Netlify: New site → Import from Git → pick your repo
5. Build settings: leave everything blank (no build command needed)
6. Click Deploy

## Step 3 — Add your API key
This is the most important step. Without it the tutor chat won't work.

1. In Netlify, go to your site → **Site configuration** → **Environment variables**
2. Click **Add a variable**
3. Key: `ANTHROPIC_API_KEY`
4. Value: your API key from platform.anthropic.com
5. Click **Save**
6. Go to **Deploys** → **Trigger deploy** → **Deploy site**

## Step 4 — Share the URL
Give students your Netlify URL. That's it. Everything works.

## Updating the site
If we make changes in Claude:
1. Download the new `index.html`
2. If using GitHub: upload to replace the old one — site updates automatically in ~30 seconds
3. If using drag-and-drop: drag the updated folder to Netlify again

## Cost
- Netlify: free (100GB bandwidth/month — more than enough for a class)
- Anthropic API: roughly $0.003 per tutor conversation. A student doing 10 minutes of tutoring costs about $0.01. For 30 students using it regularly, expect $5–15/month.

## Customizing the URL
In Netlify: Site configuration → General → Site name → change to something like `ncstate-analytics-tutor`
Your URL becomes `https://ncstate-analytics-tutor.netlify.app`

## Questions?
The three files in this folder are all you need:
- `index.html` — the entire app
- `netlify/functions/chat.js` — the server function that calls Claude
- `netlify.toml` — tells Netlify where things are
