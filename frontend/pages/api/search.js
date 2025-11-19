export default async function handler(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // You'll need to add your YouTube API key here
        const API_KEY = process.env.YOUTUBE_API_KEY || 'YOUR_API_KEY';
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=10&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('YouTube API request failed');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Failed to search videos' });
    }
}
