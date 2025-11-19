# Party Queue - Deployment Guide

## Prerequisites
1. GitHub account
2. Vercel account (sign up at vercel.com with GitHub)
3. Render account (sign up at render.com with GitHub)

---

## Step 1: Push Code to GitHub

```bash
cd /Users/nikhita.inamdar/party-queue

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Party Queue app"

# Create a new repository on GitHub.com
# Then connect and push:
git remote add origin https://github.com/YOUR-USERNAME/party-queue.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `party-queue-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   
5. Add Environment Variable:
   - **Key**: `YOUTUBE_API_KEY`
   - **Value**: `AIzaSyCQZOQht6ugDzR_Tnblho_cq1vzDYEFt_E`

6. Click "Create Web Service"

7. **Copy the backend URL** (e.g., `https://party-queue-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

5. Add Environment Variables:
   - **YOUTUBE_API_KEY**: `AIzaSyCQZOQht6ugDzR_Tnblho_cq1vzDYEFt_E`
   - **NEXT_PUBLIC_BACKEND_URL**: `https://party-queue-backend.onrender.com` (use YOUR Render URL)
   - **NEXT_PUBLIC_FRONTEND_URL**: Will be auto-set, or use your Vercel URL

6. Click "Deploy"

7. Wait for deployment (2-3 minutes)

8. **Copy your app URL** (e.g., `https://party-queue.vercel.app`)

---

## Step 4: Update Backend CORS (if needed)

If you want to restrict access to only your frontend domain:

Edit `backend/server.js` line 25:
```javascript
const io = new Server(server, { 
  cors: { 
    origin: 'https://party-queue.vercel.app',  // Your Vercel URL
    methods: ['GET', 'POST']
  } 
});
```

Then push to GitHub - Render will auto-deploy.

---

## Step 5: Test Your App

1. Visit your Vercel URL (e.g., `https://party-queue.vercel.app`)
2. Create a room
3. Share the room link with friends
4. Test on your phone!

---

## Troubleshooting

### Backend Issues:
- Check Render logs: Dashboard → Your Service → Logs
- Make sure PORT environment variable is set
- Verify YOUTUBE_API_KEY is correct

### Frontend Issues:
- Check Vercel deployment logs
- Verify NEXT_PUBLIC_BACKEND_URL points to your Render URL
- Make sure it starts with `https://` not `http://`

### Socket Connection Issues:
- Open browser console (F12) and check for WebSocket errors
- Verify backend URL in environment variables
- Check Render service is running (not sleeping)

---

## Free Tier Limits

**Vercel:**
- Unlimited bandwidth
- 100 GB-hours compute/month
- Perfect for this app ✅

**Render:**
- Free tier spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up when accessed
- 750 hours/month free compute
- For always-on: upgrade to $7/month

---

## Next Steps

1. Test the app thoroughly
2. Share the Vercel URL with friends
3. Consider custom domain (optional)
4. Monitor usage on both platforms

Your app will be live at:
- **Frontend**: https://party-queue.vercel.app (your actual URL)
- **Backend**: https://party-queue-backend.onrender.com (your actual URL)

🎉 Ready to party!
