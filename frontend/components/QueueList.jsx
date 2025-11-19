export default function QueueList({ queue }) {
    if (!queue || queue.length === 0) {
        return (
            <div className="p-8 text-center text-silver/60">
                No songs in queue. Search and add some!
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {queue.map((song, index) => (
                <div
                    key={song.id || index}
                    className="p-4 bg-[#111] rounded-lg border border-purpleAccent/30 flex items-center justify-between hover:border-purpleAccent/50 transition-colors"
                >
                    <div className="flex-1">
                        <h3 className="font-semibold text-silver">{song.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-purpleAccent/20 text-purpleAccent px-2 py-1 rounded">
                                {song.user || 'Unknown'}
                            </span>
                        </div>
                    </div>
                    <div className="text-purpleAccent font-semibold">
                        #{index + 1}
                    </div>
                </div>
            ))}
        </div>
    );
}