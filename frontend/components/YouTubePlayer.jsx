import { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({ videoId, onEnd, onReady }) {
    const playerRef = useRef(null);

    const opts = {
        height: '390',
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
            <div className="w-full aspect-video bg-[#111] rounded-lg border border-purpleAccent/30 flex items-center justify-center">
                <p className="text-silver/60">No video playing</p>
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg overflow-hidden border border-purpleAccent/30">
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={handleReady}
                onEnd={handleEnd}
            />
        </div>
    );
}