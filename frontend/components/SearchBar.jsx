import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Search failed');
            }

            if (onSearch) onSearch(data);
        } catch (error) {
            console.error('Search error:', error);
            setError('Search failed. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
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
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="px-3 py-3 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors flex items-center justify-center min-w-[48px] w-12 h-12 flex-shrink-0 disabled:opacity-50"
                    title="Search"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
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
                    )}
                </button>
            </div>
            {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
        </form>
    );
}