// queueManager.js
// Weighted round-robin builder and per-user queues


class QueueManager {
    constructor() {
        this.userQueues = {}; // { username: [ { videoId, title, duration } ] }
        this.playbackQueue = []; // merged queue (array of { user, videoId, title, duration })
    }


    addSong(username, song) {
        if (!this.userQueues[username]) this.userQueues[username] = [];
        this.userQueues[username].push(song);
        this.rebuildQueue();
    }


    rebuildQueue() {
        const pool = Object.entries(this.userQueues).map(([user, songs]) => ({ user, songs: [...songs] }));
        const result = [];


        while (pool.some((p) => p.songs.length > 0)) {
            // pick the user with the most songs remaining (weighted by remaining)
            pool.sort((a, b) => b.songs.length - a.songs.length);
            const candidate = pool[0];


            if (candidate.songs.length === 0) break;
            result.push({ user: candidate.user, ...candidate.songs.shift() });
        }


        this.playbackQueue = result;
    }


    getQueue() {
        return this.playbackQueue;
    }


    popNext() {
        return this.playbackQueue.shift();
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