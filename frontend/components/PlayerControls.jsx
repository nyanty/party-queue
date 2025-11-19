export default function PlayerControls({ onVoteSkip, currentVotes, totalUsers }) {
    return (
        <div className="flex flex-col items-center gap-3 p-4">
            <button
                onClick={onVoteSkip}
                className="px-6 py-3 rounded-lg bg-purple text-white font-semibold hover:bg-purple/90 transition-colors text-base min-h-[48px] w-full max-w-xs"
            >
                Vote to Skip Current Song
            </button>
            {currentVotes !== undefined && totalUsers !== undefined && (
                <p className="text-white/80 text-sm text-center">
                    {currentVotes}/{totalUsers} votes ({Math.round((currentVotes / totalUsers) * 100)}% - need 60%)
                </p>
            )}
        </div>
    );
}