import { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({ videoId, onEnd, onReady, onPause, onPlay, onStateChange: externalOnStateChange }) {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const prevVideoIdRef = useRef(null);
    const shouldAutoPlayRef = useRef(false);

    const opts = {
        height: '250',
        width: '100%',
        playerVars: {
            autoplay: 0, // Disable autoplay to comply with mobile restrictions
        },
    };

    const handleReady = (event) => {
        playerRef.current = event.target;
        setPlayerReady(true);
        if (onReady) onReady(event);
    };

    const handleEnd = (event) => {
        setIsPlaying(false);
        if (onEnd) onEnd(event);
    };

    const handleStateChange = (event) => {
        if (event.data === YouTube.PlayerState.PLAYING) {
            setIsPlaying(true);
            if (externalOnStateChange) externalOnStateChange(true);
        } else if (event.data === YouTube.PlayerState.PAUSED || event.data === YouTube.PlayerState.ENDED) {
            setIsPlaying(false);
            if (externalOnStateChange) externalOnStateChange(false);
        } else if (event.data === YouTube.PlayerState.CUED) {
            // Video is loaded and ready, auto-play if this is a new song
            if (shouldAutoPlayRef.current) {
                playerRef.current.playVideo();
                shouldAutoPlayRef.current = false;
            }
        }
    };

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
        }
    };

    // Update prevVideoId and set auto-play flag when videoId changes
    useEffect(() => {
        if (videoId !== prevVideoIdRef.current) {
            shouldAutoPlayRef.current = true;
            prevVideoIdRef.current = videoId;
        }
    }, [videoId]);

    if (!videoId) {
        return (
            <div className="w-full aspect-video bg-white/10 rounded-lg border border-purple/30 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No video playing</p>
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg overflow-hidden border border-purple/30 relative" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={handleReady}
                onEnd={handleEnd}
                onStateChange={handleStateChange}
            />
            {playerReady && !isPlaying && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button
                        onClick={handlePlay}
                        className="bg-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple/90 transition-colors flex items-center gap-2"
                        style={{ backgroundColor: '#8b5cf6' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Play
                    </button>
                </div>
            )}
        </div>
    );
}