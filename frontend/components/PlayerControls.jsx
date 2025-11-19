export default function PlayerControls({ onVoteSkip, currentVotes, totalUsers }) {
    return (
        <div className="flex items-center justify-center gap-4 p-4">
            <button
                onClick={onVoteSkip}
                className="px-6 py-3 rounded-lg bg-purpleAccent text-black font-semibold hover:bg-purpleAccent/90 transition-colors"
            >
                Vote to Skip Current Song
            </button>
            {currentVotes !== undefined && totalUsers !== undefined && (
                <p className="text-silver/80">
                    {currentVotes}/{totalUsers} votes ({Math.round((currentVotes / totalUsers) * 100)}% - need 60%)
                </p>
            )}
        </div>
    );
}