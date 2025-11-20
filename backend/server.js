// server.js
// Full backend server for Party Queue
// - Express + Socket.IO
// - In-memory rooms, queue manager, song history
// - Enforces: 15-minute limit (host override), 30-minute no-repeat, skip voting (60%), host skip


require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const QueueManager = require('./queueManager');
const { getYouTubeDurationSeconds } = require('./youtubeHelper');


const PORT = process.env.PORT || 4000;


const app = express();
app.use(cors());
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


// In-memory stores (prototype)
const rooms = {}; // roomId -> QueueManager
const songHistory = {}; // roomId -> [{ videoId, timestamp }]
const skipVotes = {}; // roomId -> Set(username)


// Ensure room data structures exist
function ensureRoom(roomId) {
    if (!rooms[roomId]) rooms[roomId] = new QueueManager();
    if (!songHistory[roomId]) songHistory[roomId] = [];
    if (!skipVotes[roomId]) skipVotes[roomId] = new Set();
}


// Helper to clean old history (30 minutes)
function cleanupHistory(roomId) {
    const THIRTY_MIN_MS = 30 * 60 * 1000;
    const now = Date.now();
    songHistory[roomId] = songHistory[roomId].filter((it) => now - it.timestamp < THIRTY_MIN_MS);
}


io.on('connection', (socket) => {
    console.log('socket connected', socket.id);


    // joinRoom: { roomId, username, isHost }
    socket.on('joinRoom', ({ roomId, username, isHost }) => {
        if (!roomId || !username) return;


        socket.join(roomId);
        socket.data.roomId = roomId;
        socket.data.username = username;
        socket.data.isHost = !!isHost;


        ensureRoom(roomId);


        // Send current queue and simple room info
        socket.emit('queueUpdated', rooms[roomId].getQueue());
        socket.emit('roomInfo', { roomId, isHost: !!isHost });


        // Inform room about user list (socket ids) — clients can map to names if needed
        const clients = io.sockets.adapter.rooms.get(roomId) || new Set();
        socket.to(roomId).emit('userJoined', { username });


        console.log(`${username} joined ${roomId}`);
    });


    // addSong: { roomId, username, song: { videoId, title }, isHost }
    socket.on('addSong', async ({ roomId, username, song, isHost }) => {
        try {
            ensureRoom(roomId);
            cleanupHistory(roomId);

            // Check if song was played recently (30 minutes)
            const alreadyPlayed = songHistory[roomId].some((it) => it.videoId === song.videoId);
            if (alreadyPlayed && !isHost) {
                socket.emit('songRejected', { reason: 'This song was played in the last 30 minutes.' });
                return;
            }

            // Get and validate duration
            const durationSec = await getYouTubeDurationSeconds(song.videoId);
            if (durationSec === 0) {
                socket.emit('songRejected', { reason: 'Could not determine video duration.' });
                return;
            }

            // 15-minute limit (unless host)
            if (durationSec > 15 * 60 && !isHost) {
                socket.emit('songRejected', { reason: 'Song must be shorter than 15 minutes unless host adds it.' });
                return;
            }

            // Add song with duration info
            const songWithDuration = { ...song, duration: durationSec };
            rooms[roomId].addSong(username, songWithDuration);

            // Add to history
            songHistory[roomId].push({ videoId: song.videoId, timestamp: Date.now() });

            // Broadcast updated queue
            io.to(roomId).emit('queueUpdated', rooms[roomId].getQueue());
        } catch (err) {
            console.error('addSong error', err);
            if (err.message.includes('10 songs')) {
                socket.emit('songRejected', { reason: err.message });
            } else {
                socket.emit('songRejected', { reason: 'Server error while adding song.' });
            }
        }
    });

    // requestNextSong: { roomId }
    socket.on('requestNextSong', ({ roomId }) => {
        if (!rooms[roomId]) return;
        const next = rooms[roomId].popNext();
        io.to(roomId).emit('playSong', next || null);
        io.to(roomId).emit('queueUpdated', rooms[roomId].getQueue());
    });

    // voteSkip: { roomId, username }
    socket.on('voteSkip', ({ roomId, username }) => {
        ensureRoom(roomId);
        skipVotes[roomId].add(username);

        const clients = io.sockets.adapter.rooms.get(roomId);
        const userCount = clients ? clients.size : 1;
        const voters = skipVotes[roomId].size;

        // 60% threshold
        if (voters / userCount >= 0.6) {
            skipVotes[roomId].clear();
            io.to(roomId).emit('forceSkip');
        } else {
            io.to(roomId).emit('skipStatus', { voters, userCount });
        }
    });

    // hostSkip: { roomId }
    socket.on('hostSkip', ({ roomId }) => {
        if (skipVotes[roomId]) skipVotes[roomId].clear();
        io.to(roomId).emit('forceSkip');
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
    });
});

// Simple health endpoint
app.get('/health', (req, res) => res.json({ ok: true }));

server.listen(PORT, () => console.log(`Server running on ${PORT}`));