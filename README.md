# Party Queue 🎵

A collaborative music queue app for parties where guests can add songs, vote to skip, and control playback together.

## Features

- **Room-based system** - Create rooms with QR codes for easy joining
- **YouTube search** - Search and add any song from YouTube
- **Smart queue** - Fair round-robin system that interleaves songs from different users
- **Democratic skip voting** - 60% of users needed to skip a song
- **30-minute no-repeat** - Prevents the same song from being played twice within 30 minutes
- **Duration limits** - 15-minute max for non-host users
- **10 songs per user** - Prevents queue hogging
- **Real-time updates** - All changes sync instantly via Socket.IO
- **Modern UI** - Beautiful dark theme with purple accents

## Tech Stack

**Frontend:**
- Next.js 13
- React 18
- Tailwind CSS
- Socket.IO Client
- react-youtube
- react-qr-code

**Backend:**
- Node.js
- Express
- Socket.IO
- YouTube Data API v3

## Local Development

### Prerequisites
- Node.js 18+ 
- npm
- YouTube API key ([Get one here](https://console.cloud.google.com/apis/credentials))

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/party-queue.git
cd party-queue
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your YOUTUBE_API_KEY
npm start
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. **Open your browser**
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Deployment

See [DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md) for detailed deployment guide to Vercel + Render.

### Quick Deploy

**Backend (Render):**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `YOUTUBE_API_KEY`, `PORT`

**Frontend (Vercel):**
- Root Directory: `frontend`
- Framework: Next.js
- Environment Variables: 
  - `YOUTUBE_API_KEY`
  - `NEXT_PUBLIC_BACKEND_URL`

## Testing

```bash
cd backend
npm test              # Run automated tests
npm run test:manual   # View manual test scenarios
```

See [backend/test/README.md](backend/test/README.md) for test documentation.

## Project Structure

```
party-queue/
├── backend/
│   ├── server.js          # Main server + Socket.IO
│   ├── queueManager.js    # Queue logic
│   ├── youtubeHelper.js   # YouTube API integration
│   ├── test/              # Test files
│   └── package.json
├── frontend/
│   ├── pages/
│   │   ├── index.js       # Home page (create room)
│   │   ├── room/[id].js   # Room page (dynamic)
│   │   └── api/
│   │       └── search.js  # YouTube search API
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── QueueList.jsx
│   │   ├── YouTubePlayer.jsx
│   │   └── PlayerControls.jsx
│   ├── styles/
│   │   └── globals.css
│   └── package.json
└── README.md
```

## Usage

1. **Create a Room**
   - Visit the app
   - Click "Create Room"
   - Share the QR code or room ID

2. **Join a Room**
   - Scan QR code or visit `/room/[room-id]`

3. **Add Songs**
   - Search for songs
   - Click "Add" to add to queue
   - Songs are interleaved fairly

4. **Skip Songs**
   - Click "Vote to Skip Current Song"
   - 60% of users needed to skip

## Business Rules

- ✅ Max 15 minutes per song (host can override)
- ✅ 30-minute cooldown before repeating songs
- ✅ Max 10 songs per user in queue
- ✅ 60% vote required to skip
- ✅ Host has override permissions

## Environment Variables

**Backend (.env):**
```
YOUTUBE_API_KEY=your_api_key_here
PORT=4000
```

**Frontend (.env.local):**
```
YOUTUBE_API_KEY=your_api_key_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT

## Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ for better parties!
