# 📦 Party Queue - Upload & Deploy Instructions

## What's in this package

A complete Party Queue application ready to deploy to your own GitHub account.

---

## Step 1: Extract the Package

The file `party-queue-deploy.tar.gz` is located at:
```
/Users/nikhita.inamdar/party-queue-deploy.tar.gz
```

To extract it:
```bash
cd ~/Desktop  # or wherever you want to extract it
tar -xzf ~/party-queue-deploy.tar.gz
cd party-queue
```

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `party-queue` (or whatever you prefer)
3. Make it **Public** (required for free Vercel/Render)
4. **Don't** initialize with README (we have one)
5. Click "Create repository"

---

## Step 3: Upload to GitHub

```bash
# Navigate to the extracted folder
cd party-queue

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Party Queue app"

# Add your GitHub remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/party-queue.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your `party-queue` repository
5. Configure:
   - **Name**: `party-queue-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Click "Advanced" and add Environment Variables:
   - Key: `YOUTUBE_API_KEY`
   - Value: `AIzaSyCQZOQht6ugDzR_Tnblho_cq1vzDYEFt_E`

7. Click "Create Web Service"

8. **Wait 2-3 minutes for deployment**

9. **COPY YOUR BACKEND URL** (e.g., `https://party-queue-backend.onrender.com`)
   - You'll need this for the frontend!

---

## Step 5: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up/login with GitHub
2. Click "Add New" → "Project"
3. Import your `party-queue` repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: Auto-filled
   - **Output Directory**: Auto-filled

5. Click "Environment Variables" and add:
   - **Name**: `YOUTUBE_API_KEY`
     **Value**: `AIzaSyCQZOQht6ugDzR_Tnblho_cq1vzDYEFt_E`
   
   - **Name**: `NEXT_PUBLIC_BACKEND_URL`
     **Value**: `https://party-queue-backend.onrender.com` (YOUR Render URL from Step 4)

6. Click "Deploy"

7. **Wait 2-3 minutes for deployment**

8. **COPY YOUR FRONTEND URL** (e.g., `https://party-queue.vercel.app`)

---

## Step 6: Test Your App! 🎉

1. Visit your Vercel URL (frontend)
2. Click "Create Room"
3. Share the link with friends
4. Test adding songs, voting to skip, etc.

---

## 🔧 Troubleshooting

### "Backend not connecting"
- Check that `NEXT_PUBLIC_BACKEND_URL` in Vercel has your correct Render URL
- Make sure it starts with `https://` not `http://`
- Check Render logs to see if backend is running

### "Search not working"
- Verify `YOUTUBE_API_KEY` is set in both Vercel and Render
- Check the API key is valid

### "Render service sleeping"
- Free tier spins down after 15min inactivity
- First request after sleeping takes ~30 seconds to wake up
- Upgrade to $7/month for always-on

---

## 📱 Sharing Your App

Once deployed, share this URL with anyone:
```
https://YOUR-APP.vercel.app
```

They can:
- Create rooms
- Join rooms via QR code or link
- Add songs and vote
- Works on any device with internet!

---

## 🔄 Making Updates

After initial deployment, updates are automatic:

```bash
# Make your changes
# Then commit and push
git add .
git commit -m "Updated styling"
git push

# Both Vercel and Render auto-deploy in 2-3 minutes!
```

---

## 💰 Costs

**FREE FOREVER for this app:**
- Vercel: Free tier is more than enough
- Render: 750 hours/month free (plenty for testing)

**Optional upgrade:**
- Render $7/month for always-on backend (no spin-down)

---

## 📞 Need Help?

If you run into issues:
1. Check deployment logs on Vercel/Render dashboards
2. Verify all environment variables are set correctly
3. Make sure backend URL in frontend env vars matches Render URL

---

## 🎊 You're Done!

Your Party Queue app is now live and accessible from anywhere in the world!

Deployed URLs:
- **Frontend**: https://YOUR-APP.vercel.app
- **Backend**: https://party-queue-backend.onrender.com

Enjoy your parties! 🎵
