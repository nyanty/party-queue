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
        <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#0d001a', color: '#ffffff' }}>
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#8b5cf6' }}>Party Queue</h1>
                    <button
                        className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors text-base min-w-[120px]"
                        style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                        onClick={createRoom}
                    >
                        Create Room
                    </button>
                </div>


                {roomId && (
                    <div className="mt-8 space-y-6">
                        {/* Regular User QR */}
                        <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                            <h2 className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>🎵 Regular Users - Scan to Join</h2>
                            <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Join the party and add songs to the queue</p>
                            <div className="flex justify-center">
                                <div className="p-4 rounded-lg border-4" style={{ borderColor: '#8b5cf6', backgroundColor: '#ffffff' }}>
                                    <QRCode value={`${frontendUrl}/room/${roomId}`} />
                                </div>
                            </div>
                            <p className="mt-3 text-center" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Room ID: <span className="font-semibold" style={{ color: '#8b5cf6' }}>{roomId}</span></p>
                        </div>

                        {/* Admin QR */}
                        <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.5)' }}>
                            <h2 className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#8b5cf6' }}>👑 Admin/Host - Scan for Full Control</h2>
                            <p className="text-sm mb-4" style={{ color: 'rgba(139, 92, 246, 0.8)' }}>Host controls: skip songs instantly, override limits, manage queue</p>
                            <div className="flex justify-center">
                                <div className="p-4 rounded-lg border-4" style={{ borderColor: '#8b5cf6', backgroundColor: '#ffffff' }}>
                                    <QRCode value={`${frontendUrl}/room/${roomId}?admin=true`} />
                                </div>
                            </div>
                            <p className="mt-3 text-center" style={{ color: 'rgba(139, 92, 246, 0.8)' }}>Admin Link: <span className="font-semibold" style={{ color: '#ffffff' }}>{roomId}?admin=true</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}