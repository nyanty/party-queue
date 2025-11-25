export default function HistoryList({ history }) {
    if (!history || history.length === 0) {
        return (
            <div className="p-6 md:p-8 text-center text-white/60" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                No songs played yet
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {history.map((song, index) => (
                <div
                    key={song.videoId || index}
                    className="p-4 bg-white/5 rounded-lg border border-gray-500/30 flex items-center justify-between hover:border-gray-400/50 transition-colors backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(107, 114, 128, 0.3)' }}
                >
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base" style={{ color: '#ffffff' }}>{song.title}</h3>
                        <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{song.artist}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded font-medium" style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af' }}>
                                {song.user || 'Unknown'}
                            </span>
                        </div>
                    </div>
                    <div className="text-gray-400 font-semibold text-lg ml-2" style={{ color: '#9ca3af' }}>
                        ✓
                    </div>
                </div>
            ))}
        </div>
    );
}