import { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({ videoId, onEnd, onReady }) {
    const playerRef = useRef(null);

    const opts = {
        height: '250',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleReady = (event) => {
        playerRef.current = event.target;
        if (onReady) onReady(event);
    };

    const handleEnd = (event) => {
        if (onEnd) onEnd(event);
    };

    if (!videoId) {
        return (
            <div className="w-full aspect-video bg-white/10 rounded-lg border border-purple/30 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No video playing</p>
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg overflow-hidden border border-purple/30" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={handleReady}
                onEnd={handleEnd}
            />
        </div>
    );
}