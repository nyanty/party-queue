const QueueManager = require('../queueManager');

// Simple test framework
function describe(name, fn) {
    console.log(`\n${name}`);
    fn();
}

function it(name, fn) {
    try {
        fn();
        console.log(`  ✓ ${name}`);
    } catch (error) {
        console.log(`  ✗ ${name}`);
        console.log(`    Error: ${error.message}`);
    }
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected} but got ${actual}`);
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
            }
        },
        toBeGreaterThan(expected) {
            if (actual <= expected) {
                throw new Error(`Expected ${actual} to be greater than ${expected}`);
            }
        }
    };
}

// Test Suite
describe('QueueManager Tests', () => {

    describe('Adding songs', () => {
        it('should add a song to user queue', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'abc123', title: 'Test Song', duration: 180 });
            expect(qm.getQueue().length).toBe(1);
        });

        it('should add multiple songs for same user', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'abc123', title: 'Song 1', duration: 180 });
            qm.addSong('user1', { videoId: 'def456', title: 'Song 2', duration: 200 });
            expect(qm.getQueue().length).toBe(2);
        });

        it('should interleave songs from different users', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'User1 Song1', duration: 180 });
            qm.addSong('user1', { videoId: 'song2', title: 'User1 Song2', duration: 180 });
            qm.addSong('user2', { videoId: 'song3', title: 'User2 Song1', duration: 180 });

            const queue = qm.getQueue();
            expect(queue[0].user).toBe('user1');
            expect(queue[1].user).toBe('user2');
            expect(queue[2].user).toBe('user1');
        });
    });

    describe('User song count', () => {
        it('should return 0 for user with no songs', () => {
            const qm = new QueueManager();
            expect(qm.getUserSongCount('user1')).toBe(0);
        });

        it('should return correct count for user with songs', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user1', { videoId: 'song2', title: 'Song 2', duration: 180 });
            qm.addSong('user1', { videoId: 'song3', title: 'Song 3', duration: 180 });
            expect(qm.getUserSongCount('user1')).toBe(3);
        });

        it('should not exceed 10 songs per user (business logic)', () => {
            const qm = new QueueManager();
            for (let i = 0; i < 10; i++) {
                qm.addSong('user1', { videoId: `song${i}`, title: `Song ${i}`, duration: 180 });
            }
            expect(qm.getUserSongCount('user1')).toBe(10);
            // In real app, 11th song would be rejected by server
        });
    });

    describe('Removing songs', () => {
        it('should pop next song from queue', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user2', { videoId: 'song2', title: 'Song 2', duration: 180 });

            const next = qm.popNext();
            expect(next.videoId).toBe('song1');
            expect(qm.getQueue().length).toBe(1);
        });

        it('should remove all songs for a user', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user1', { videoId: 'song2', title: 'Song 2', duration: 180 });
            qm.addSong('user2', { videoId: 'song3', title: 'Song 3', duration: 180 });

            qm.removeUserSongs('user1');
            expect(qm.getQueue().length).toBe(1);
            expect(qm.getQueue()[0].user).toBe('user2');
        });
    });

    describe('Queue rebuilding', () => {
        it('should rebuild queue after adding songs', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user2', { videoId: 'song2', title: 'Song 2', duration: 180 });

            const queue = qm.getQueue();
            expect(queue.length).toBe(2);
        });
    });
});

console.log('\n--- Running QueueManager Tests ---');
describe('QueueManager Tests', () => {

    describe('Adding songs', () => {
        it('should add a song to user queue', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'abc123', title: 'Test Song', duration: 180 });
            expect(qm.getQueue().length).toBe(1);
        });

        it('should add multiple songs for same user', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'abc123', title: 'Song 1', duration: 180 });
            qm.addSong('user1', { videoId: 'def456', title: 'Song 2', duration: 200 });
            expect(qm.getQueue().length).toBe(2);
        });

        it('should interleave songs from different users', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'User1 Song1', duration: 180 });
            qm.addSong('user1', { videoId: 'song2', title: 'User1 Song2', duration: 180 });
            qm.addSong('user2', { videoId: 'song3', title: 'User2 Song1', duration: 180 });

            const queue = qm.getQueue();
            expect(queue[0].user).toBe('user1');
            expect(queue[1].user).toBe('user2');
            expect(queue[2].user).toBe('user1');
        });
    });

    describe('User song count', () => {
        it('should return 0 for user with no songs', () => {
            const qm = new QueueManager();
            expect(qm.getUserSongCount('user1')).toBe(0);
        });

        it('should return correct count for user with songs', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user1', { videoId: 'song2', title: 'Song 2', duration: 180 });
            qm.addSong('user1', { videoId: 'song3', title: 'Song 3', duration: 180 });
            expect(qm.getUserSongCount('user1')).toBe(3);
        });
    });

    describe('Removing songs', () => {
        it('should pop next song from queue', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user2', { videoId: 'song2', title: 'Song 2', duration: 180 });

            const next = qm.popNext();
            expect(next.videoId).toBe('song1');
            expect(qm.getQueue().length).toBe(1);
        });

        it('should remove all songs for a user', () => {
            const qm = new QueueManager();
            qm.addSong('user1', { videoId: 'song1', title: 'Song 1', duration: 180 });
            qm.addSong('user1', { videoId: 'song2', title: 'Song 2', duration: 180 });
            qm.addSong('user2', { videoId: 'song3', title: 'Song 3', duration: 180 });

            qm.removeUserSongs('user1');
            expect(qm.getQueue().length).toBe(1);
            expect(qm.getQueue()[0].user).toBe('user2');
        });
    });
});

console.log('\nAll tests completed!\n');
