import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RoomEntry() {
    const router = useRouter();
    const { id } = router.query;
    const [showUsernamePrompt, setShowUsernamePrompt] = useState(true);

    useEffect(() => {
        if (!id) return;
    }, [id]);

    const handleUsernameSubmit = (username) => {
        if (!username.trim()) return;

        // Check if admin parameter is present
        const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
        const isAdmin = urlParams.get('admin') === 'true';

        // Redirect to rm1.js with username and admin status
        const params = new URLSearchParams({
            username: username.trim(),
            ...(isAdmin && { admin: 'true' })
        });

        router.push(`/room/rm1?id=${id}&${params.toString()}`);
    };

    return (
        <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#0d001a', color: '#ffffff' }}>
            <div className="max-w-md mx-auto">
                {/* Username Prompt Modal */}
                {showUsernamePrompt && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-background p-6 rounded-2xl border border-purple/30 max-w-md w-full mx-4" style={{ backgroundColor: '#0d001a', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                            <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#8b5cf6' }}>Join the Party</h2>
                            <p className="mb-6 text-center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Enter your name to start adding songs!</p>
                            <form onSubmit={(e) => { e.preventDefault(); handleUsernameSubmit(e.target.username.value); }}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple/30 text-white placeholder-white/50 focus:outline-none focus:border-purple mb-4"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)', color: '#ffffff' }}
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 rounded-lg font-semibold hover:bg-purple/90 transition-colors"
                                    style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                                >
                                    Join Room
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
