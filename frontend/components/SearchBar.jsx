import { useState } from 'react';

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
                    className="px-3 py-3 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors flex items-center justify-center min-w-[48px] w-12 h-12 flex-shrink-0"
                    title="Search"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}