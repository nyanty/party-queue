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
        <div className="min-h-screen p-8 bg-background text-silver">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-purpleAccent">Party Queue</h1>
                    <button
                        className="px-4 py-2 rounded-lg bg-purpleAccent text-black font-semibold"
                        onClick={createRoom}
                    >
                        Create Room
                    </button>
                </div>


                {roomId && (
                    <div className="mt-8 p-6 bg-[#111] rounded-2xl border border-purpleAccent/30">
                        <h2 className="text-xl font-semibold">Scan to join</h2>
                        <div className="mt-4">
                            <QRCode value={`${frontendUrl}/room/${roomId}`} />
                        </div>
                        <p className="mt-3 text-silver/80">Room ID: <span className="text-purpleAccent">{roomId}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}