// youtubeHelper.js
// Helper to get video duration (seconds) from YouTube Data API


const fetch = require('node-fetch');
const API_KEY = process.env.YOUTUBE_API_KEY;


function iso8601ToSeconds(iso) {
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);
    return hours * 3600 + minutes * 60 + seconds;
}


async function getYouTubeDurationSeconds(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items || data.items.length === 0) return 0;
    const iso = data.items[0].contentDetails.duration;
    return iso8601ToSeconds(iso);
}


module.exports = { getYouTubeDurationSeconds };