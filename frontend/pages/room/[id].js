import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SearchBar from '../../components/SearchBar';
import QueueList from '../../components/QueueList';
import YouTubePlayer from '../../components/YouTubePlayer';
import PlayerControls from '../../components/PlayerControls';

let socket;

export default function Room() {
    const router = useRouter();
    const { id } = router.query;
    const [queue, setQueue] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [skipVotes, setSkipVotes] = useState({ voters: 0, userCount: 1 });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (!id) return;

        // Initialize socket connection
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
        socket = io(backendUrl);

        socket.emit('joinRoom', { roomId: id, username: 'Guest', isHost: false });

        socket.on('queueUpdated', (updatedQueue) => {
            setQueue(updatedQueue);
        });

        socket.on('playSong', (song) => {
            setCurrentSong(song);
            setSkipVotes({ voters: 0, userCount: 1 }); // Reset votes when new song plays
        });

        socket.on('skipStatus', ({ voters, userCount }) => {
            setSkipVotes({ voters, userCount });
        });

        socket.on('forceSkip', () => {
            showMessage('Song skipped!', 'success');
            setSkipVotes({ voters: 0, userCount: 1 });
        });

        socket.on('songRejected', ({ reason }) => {
            showMessage(reason, 'error');
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    const handleSearch = (results) => {
        setSearchResults(results.items || []);
    };

    const addToQueue = (song) => {
        if (socket) {
            socket.emit('addSong', {
                roomId: id,
                username: 'Guest',
                song: {
                    videoId: song.id.videoId,
                    title: song.snippet.title,
                },
                isHost: false
            });
        }
    };

    const handleVoteSkip = () => {
        if (socket) {
            socket.emit('voteSkip', { roomId: id, username: 'Guest' });
        }
    };

    const handleSongEnd = () => {
        if (socket) {
            socket.emit('requestNextSong', { roomId: id });
        }
    };

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: '#0d001a', color: '#ffffff' }}>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold" style={{ color: '#8b5cf6' }}>
                        Room: {id}
                    </h1>
                </div>

                {/* Message popup */}
                {message.text && (
                    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                        } text-white font-semibold`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Player and Controls */}
                    <div className="space-y-6">
                        <div className="bg-[#0d0d0d] rounded-2xl border border-purpleAccent/30 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: '#8b5cf6' }}>Now Playing</h2>
                            <YouTubePlayer
                                videoId={currentSong?.videoId}
                                onEnd={handleSongEnd}
                            />
                            <PlayerControls
                                onVoteSkip={handleVoteSkip}
                                currentVotes={skipVotes.voters}
                                totalUsers={skipVotes.userCount}
                            />
                        </div>
                    </div>

                    {/* Right Column - Search and Queue */}
                    <div className="space-y-6">
                        <div className="bg-[#0d0d0d] rounded-2xl border border-purpleAccent/30 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: '#8b5cf6' }}>Search Songs</h2>
                            <SearchBar onSearch={handleSearch} />

                            {searchResults.length > 0 && (
                                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                                    {searchResults.map((song) => (
                                        <div
                                            key={song.id.videoId}
                                            className="p-3 bg-[#111] rounded-lg border border-purpleAccent/20 flex justify-between items-center"
                                        >
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium">{song.snippet.title}</h3>
                                                <p className="text-xs text-silver/60">{song.snippet.channelTitle}</p>
                                            </div>
                                            <button
                                                onClick={() => addToQueue(song)}
                                                className="px-3 py-1 text-sm rounded bg-purpleAccent text-black hover:bg-purpleAccent/90"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-[#0d0d0d] rounded-2xl border border-purpleAccent/30 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: '#8b5cf6' }}>Queue</h2>
                            <QueueList queue={queue} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
