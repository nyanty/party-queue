// queueManager.js
// Weighted round-robin builder and per-user queues


class QueueManager {
    constructor() {
        this.userQueues = {}; // { username: [ { videoId, title, duration } ] }
        this.playbackQueue = []; // merged queue (array of { user, videoId, title, duration })
    }


    addSong(username, song) {
        if (!this.userQueues[username]) this.userQueues[username] = [];

        // Check if user has reached the 10 song limit
        if (this.userQueues[username].length >= 10) {
            throw new Error('You can only add up to 10 songs per user');
        }

        this.userQueues[username].push(song);
        this.rebuildQueue();
    }


    rebuildQueue() {
        const pool = Object.entries(this.userQueues).map(([user, songs]) => ({ user, songs: [...songs] }));
        const result = [];
        let lastPickedUser = null;

        while (pool.some((p) => p.songs.length > 0)) {
            // Filter to users who still have songs
            const available = pool.filter(p => p.songs.length > 0);
            
            if (available.length === 0) break;
            
            // If multiple users have the same number of songs, alternate to avoid favoring one user
            const maxSongs = Math.max(...available.map(p => p.songs.length));
            const candidates = available.filter(p => p.songs.length === maxSongs);
            
            let candidate;
            if (candidates.length === 1) {
                candidate = candidates[0];
            } else {
                // Multiple candidates with same count, pick one that's not the last picked user
                candidate = candidates.find(c => c.user !== lastPickedUser) || candidates[0];
            }

            result.push({ user: candidate.user, ...candidate.songs.shift() });
            lastPickedUser = candidate.user;
        }

        this.playbackQueue = result;
    }


    getQueue() {
        return this.playbackQueue;
    }


    popNext() {
        const nextSong = this.playbackQueue.shift();
        if (nextSong) {
            // Remove the played song from the user's queue
            const userQueue = this.userQueues[nextSong.user];
            if (userQueue) {
                const songIndex = userQueue.findIndex(song => song.videoId === nextSong.videoId);
                if (songIndex !== -1) {
                    userQueue.splice(songIndex, 1);
                }
            }
        }
        return nextSong;
    }


    removeUserSongs(username) {
        delete this.userQueues[username];
        this.rebuildQueue();
    }

    getUserSongCount(username) {
        return this.userQueues[username] ? this.userQueues[username].length : 0;
    }
}


module.exports = QueueManager;