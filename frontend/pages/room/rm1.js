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
    const [searchResults, setSearchResults] = useState(null);
    const [skipVotes, setSkipVotes] = useState({ voters: 0, userCount: 1 });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [username, setUsername] = useState('');
    const [showUsernamePrompt, setShowUsernamePrompt] = useState(true);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        if (!id) return;

        // Check if user is admin/host
        const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
        const isAdmin = urlParams.get('admin') === 'true';
        setIsHost(isAdmin);

        // Initialize socket connection
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
        socket = io(backendUrl);

        // Don't join room yet, wait for username

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

    const handleUsernameSubmit = (name) => {
        if (!name.trim()) return;
        setUsername(name.trim());
        setShowUsernamePrompt(false);
        if (socket) {
            socket.emit('joinRoom', { roomId: id, username: name.trim(), isHost });
        }
    };

    const handleSearch = (results) => {
        setSearchResults(results.items || []);
    };

    const addToQueue = (song) => {
        if (socket && username) {
            socket.emit('addSong', {
                roomId: id,
                username,
                song: {
                    videoId: song.id.videoId,
                    title: song.snippet.title,
                },
                isHost
            });
        }
    };

    const handleVoteSkip = () => {
        if (socket && username) {
            socket.emit('voteSkip', { roomId: id, username });
        }
    };

    const handleHostSkip = () => {
        if (socket) {
            socket.emit('hostSkip', { roomId: id });
        }
    };

    const handleSongEnd = () => {
        if (socket) {
            socket.emit('requestNextSong', { roomId: id });
        }
    };

    return (
        <div className="min-h-screen p-4 bg-background text-white md:p-8">
            {/* Username Prompt Modal */}
            {showUsernamePrompt && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background p-6 rounded-2xl border border-purple/30 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-purple mb-4 text-center">Join the Party</h2>
                        <p className="text-white/60 mb-6 text-center">Enter your name to start adding songs!</p>
                        <form onSubmit={(e) => { e.preventDefault(); handleUsernameSubmit(e.target.username.value); }}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple/30 text-white placeholder-white/50 focus:outline-none focus:border-purple mb-4"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="w-full px-6 py-3 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors"
                            >
                                Join Room
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-purple">
                        Room: {id} {isHost && <span className="text-sm bg-purple/20 px-2 py-1 rounded ml-2">👑 HOST</span>}
                    </h1>
                </div>

                {/* Message popup */}
                {message.text && (
                    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                        } text-white font-semibold max-w-xs md:max-w-md`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Column - Player and Controls */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="bg-white/5 rounded-2xl border border-purple/30 p-4 md:p-6 backdrop-blur-sm">
                            <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">Now Playing</h2>
                            <YouTubePlayer
                                videoId={currentSong?.videoId}
                                onEnd={handleSongEnd}
                            />
                            <PlayerControls
                                onVoteSkip={handleVoteSkip}
                                onHostSkip={handleHostSkip}
                                currentVotes={skipVotes.voters}
                                totalUsers={skipVotes.userCount}
                                isHost={isHost}
                            />
                        </div>
                    </div>

                    {/* Right Column - Search and Queue */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="bg-white/5 rounded-2xl border border-purple/30 p-4 md:p-6 backdrop-blur-sm">
                            <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">Search Songs</h2>
                            <SearchBar onSearch={handleSearch} />

                            {searchResults && searchResults.length > 0 ? (
                                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                                    {searchResults.map((song) => (
                                        <div
                                            key={song.id.videoId}
                                            className="p-3 bg-white/10 rounded-lg border border-purple/30 flex items-center gap-3 hover:border-purple/60 hover:bg-white/15 transition-colors"
                                        >
                                            <img
                                                src={song.snippet.thumbnails.medium?.url || song.snippet.thumbnails.default?.url}
                                                alt={song.snippet.title}
                                                className="w-12 h-12 rounded object-cover flex-shrink-0 bg-white/20"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjODg4Ii8+Cjx0ZXh0IHg9IjI0IiB5PSIyNCIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VDwvdGV4dD4KPHN2Zz4=';
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-white truncate">{song.snippet.title}</h3>
                                                <p className="text-xs text-white/70 truncate">{song.snippet.channelTitle}</p>
                                            </div>
                                            <button
                                                onClick={() => addToQueue(song)}
                                                className="px-4 py-2 text-sm rounded bg-purple text-white hover:bg-purple/90 transition-colors font-medium flex-shrink-0 min-h-[40px]"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4 p-8 text-center text-white/50">
                                    {searchResults === null ? 'Search for songs above' : 'No results found'}
                                </div>
                            )}
                        </div>

                        <div className="bg-white/5 rounded-2xl border border-purple/30 p-4 md:p-6 backdrop-blur-sm">
                            <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">Queue</h2>
                            <QueueList queue={queue} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
