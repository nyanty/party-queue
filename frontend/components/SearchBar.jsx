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
                    className="flex-1 px-4 py-2 rounded-lg bg-[#111] border border-purpleAccent/30 text-silver focus:outline-none focus:border-purpleAccent"
                />
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-purpleAccent text-black font-semibold hover:bg-purpleAccent/90 transition-colors"
                >
                    Search
                </button>
            </div>
        </form>
    );
}