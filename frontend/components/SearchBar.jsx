export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (onSearch) onSearch(data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a song..."
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-purple/30 text-white placeholder-white/50 focus:outline-none focus:border-purple text-base"
                />
                <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors text-base min-w-[80px]"
                >
                    Search
                </button>
            </div>
        </form>
    );
}