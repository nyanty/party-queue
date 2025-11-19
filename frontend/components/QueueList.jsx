export default function QueueList({ queue }) {
    if (!queue || queue.length === 0) {
        return (
            <div className="p-6 md:p-8 text-center text-white/60" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                No songs in queue. Search and add some!
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {queue.map((song, index) => (
                <div
                    key={song.id || index}
                    className="p-4 bg-white/5 rounded-lg border border-purple/30 flex items-center justify-between hover:border-purple/50 transition-colors backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(139, 92, 246, 0.3)' }}
                >
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base" style={{ color: '#ffffff' }}>{song.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-purple/20 text-purple px-2 py-1 rounded font-medium" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                                {song.user || 'Unknown'}
                            </span>
                        </div>
                    </div>
                    <div className="text-purple font-semibold text-lg ml-2" style={{ color: '#8b5cf6' }}>
                        #{index + 1}
                    </div>
                </div>
            ))}
        </div>
    );
}