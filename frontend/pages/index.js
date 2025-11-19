import { useState } from 'react';
import QRCode from 'react-qr-code';


export default function Home() {
    const [roomId, setRoomId] = useState('');


    const createRoom = () => {
        const id = Math.random().toString(36).substring(2, 8);
        setRoomId(id);
    };

    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');


    return (
        <div className="min-h-screen p-4 md:p-8 bg-background text-white">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-purple">Party Queue</h1>
                    <button
                        className="px-6 py-3 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors text-base min-w-[120px]"
                        onClick={createRoom}
                    >
                        Create Room
                    </button>
                </div>


                {roomId && (
                    <div className="mt-8 space-y-6">
                        {/* Regular User QR */}
                        <div className="p-6 bg-white/5 rounded-2xl border border-purple/30 backdrop-blur-sm">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-2">🎵 Regular Users - Scan to Join</h2>
                            <p className="text-white/60 text-sm mb-4">Join the party and add songs to the queue</p>
                            <div className="flex justify-center">
                                <QRCode value={`${frontendUrl}/room/${roomId}`} />
                            </div>
                            <p className="mt-3 text-white/80 text-center">Room ID: <span className="text-purple font-semibold">{roomId}</span></p>
                        </div>

                        {/* Admin QR */}
                        <div className="p-6 bg-purple/10 rounded-2xl border border-purple/50 backdrop-blur-sm">
                            <h2 className="text-lg md:text-xl font-semibold text-purple mb-2">👑 Admin/Host - Scan for Full Control</h2>
                            <p className="text-purple/80 text-sm mb-4">Host controls: skip songs instantly, override limits, manage queue</p>
                            <div className="flex justify-center">
                                <QRCode value={`${frontendUrl}/room/${roomId}?admin=true`} />
                            </div>
                            <p className="mt-3 text-purple/80 text-center">Admin Link: <span className="text-white font-semibold">{roomId}?admin=true</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}