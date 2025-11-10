# =====================================
# GitHub Push Script - goodwill-gold
# Author: Chuck Greiner
# =====================================

# 🔧 SETTINGS - EDIT THESE 3 LINES
$githubUser = "chuckgreiner"     # your GitHub username
$githubToken = "github_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"   # your personal access token
$repoName   = "goodwill-gold"    # repository name on GitHub

# ✅ Step 1: Stop any leftover Git processes
Write-Host "🧹 Cleaning up any stuck Git processes..." -ForegroundColor Yellow
taskkill /F /IM "git.exe" /T 2>$null

# ✅ Step 2: Go to your project folder
Set-Location "C:\Users\Chuck\goodwill-gold"

# ✅ Step 3: Reset Git remote to use your credentials
$remoteUrl = "https://$($githubUser):$($githubToken)@github.com/$($githubUser)/$($repoName).git"
git remote remove origin 2>$null
git remote add origin $remoteUrl

# ✅ Step 4: Commit & push
Write-Host "📦 Committing changes..." -ForegroundColor Cyan
git add -A
git commit --no-gpg-sign -m "Automated push to GitHub"
git branch -M main

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

# ✅ Step 5: Confirm success
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Push completed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed. Please check your token or network connection." -ForegroundColor Red
}
