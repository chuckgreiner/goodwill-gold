# 1. Extract the uploaded Manus project
Expand-Archive -Path "./goodwill-gold.zip" -DestinationPath "./goodwill-gold"
cd goodwill-gold

# 2. Inspect structure
Get-ChildItem -Recurse -Depth 1

# 3. Ensure dependencies are installed
npm install

# 4. Run locally to verify it works
npm run dev

# 5. If verified, create vercel.json file in root
@'
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
'@ | Out-File -Encoding utf8 vercel.json

# 6. Initialize git if not already
if (-not (Test-Path .git)) {
    git init
}

git add -A
git commit -m "Deploying Manus build to Vercel"

git branch -M main

git remote remove origin -ErrorAction SilentlyContinue
git remote add origin https://github.com/chuckgreiner/goodwill-gold.git

git push -u origin main

# 7. Visit Vercel dashboard and link this project to the same repo for automatic deployment
