export default function PlayerControls({ onVoteSkip, onHostSkip, onPause, onPlay, isPlaying, currentVotes, totalUsers, isHost }) {
    return (
        <div className="flex flex-col items-center gap-3 p-4">
            {isHost && (
                <div className="flex gap-2 w-full max-w-xs">
                    <button
                        onClick={isPlaying ? onPause : onPlay}
                        className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-base min-h-[48px]"
                        style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                    >
                        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                    </button>
                    <button
                        onClick={onHostSkip}
                        className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-base min-h-[48px]"
                        style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                    >
                        👑 Skip
                    </button>
                </div>
            )}
            <button
                onClick={onVoteSkip}
                className="px-6 py-3 rounded-lg bg-purple font-semibold hover:bg-purple/90 transition-colors text-base min-h-[48px] w-full max-w-xs"
                style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
            >
                Vote to Skip Current Song
            </button>
            {currentVotes !== undefined && totalUsers !== undefined && (
                <p className="text-sm text-center" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {currentVotes}/{totalUsers} votes ({Math.round((currentVotes / totalUsers) * 100)}% - need 60%)
                </p>
            )}
        </div>
    );
}