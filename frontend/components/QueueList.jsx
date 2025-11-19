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
                        <p className="text-sm text-silver/60">Added by: {song.user || 'Unknown'}</p>
                    </div>
                    <div className="text-purpleAccent font-semibold">
                        #{index + 1}
                    </div>
                </div>
            ))}
        </div>
    );
}