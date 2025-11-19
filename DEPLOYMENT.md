# Deploy Party Queue App

## Quick Setup with Ngrok (For Testing)

### 1. Install Ngrok
```bash
brew install ngrok
# Or download from https://ngrok.com/download
```

### 2. Start Your Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Create Ngrok Tunnels
```bash
# Terminal 3 - Backend tunnel
ngrok http 4000

# Terminal 4 - Frontend tunnel
ngrok http 3000
```

### 4. Update Environment Variables
Copy the ngrok URLs (e.g., https://abc123.ngrok.io) and update:

**frontend/.env.local:**
```
NEXT_PUBLIC_BACKEND_URL=https://[your-backend-ngrok-url]
```

**frontend/pages/room/[id].js:**
Change `socket = io('http://localhost:4000')` to your ngrok backend URL

### 5. Share the Frontend URL
Give people the frontend ngrok URL (e.g., https://xyz789.ngrok.io)

---

## Permanent Deployment (Recommended)

### Deploy Backend to Render.com

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repo
5. Settings:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variable: `YOUTUBE_API_KEY`
6. Deploy

### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Set Root Directory to `frontend`
4. Add environment variables:
   - `YOUTUBE_API_KEY`
   - `NEXT_PUBLIC_BACKEND_URL` (your Render backend URL)
5. Deploy

---

## Step-by-Step: Deploy to Vercel + Render

### Part 1: Backend on Render

```bash
# 1. Create render.yaml in backend folder
```

**backend/render.yaml:**
```yaml
services:
  - type: web
    name: party-queue-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: YOUTUBE_API_KEY
        value: AIzaSyCQZOQht6ugDzR_Tnblho_cq1vzDYEFt_E
      - key: PORT
        value: 4000
```

### Part 2: Frontend on Vercel

**frontend/vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "YOUTUBE_API_KEY": "AIzaSyCQZOQht6ugDzR_Tnblho_cq1vzDYEFt_E"
  }
}
```

Update socket connection in room files to use environment variable:
```javascript
socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000');
```

---

## Which Option Should You Choose?

- **Testing with friends now**: Use Ngrok (5 minutes setup)
- **Long-term/production**: Deploy to Vercel + Render (free forever)
- **Need custom domain**: Deploy to cloud services

Would you like me to help you set up any of these options?
