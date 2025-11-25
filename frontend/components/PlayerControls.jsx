export default function PlayerControls({ onVoteSkip, onHostSkip, isPlaying, currentVotes, totalUsers, isHost, compact = false }) {
    if (compact) {
        return (
            <div className="flex items-center gap-2">
                {isHost && (
                    <button
                        onClick={onHostSkip}
                        className="px-3 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-sm"
                        style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                    >
                        👑
                    </button>
                )}
                <button
                    onClick={onVoteSkip}
                    className="px-4 py-2 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors text-sm"
                    style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                >
                    Vote Skip ({currentVotes || 0}/{totalUsers || 1})
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-3 p-4">
            {isHost && (
                <button
                    onClick={onHostSkip}
                    className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-base min-h-[48px] w-full max-w-xs"
                    style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                >
                    👑 Skip
                </button>
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
                    {currentVotes}/{totalUsers} votes ({Math.round((currentVotes / totalUsers) * 100)}% - need 75%)
                </p>
            )}
        </div>
    );
}