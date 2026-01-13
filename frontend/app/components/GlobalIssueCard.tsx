import React, { useState } from 'react';
import axios from 'axios';

interface GlobalIssueCardProps {
    repo_name: string;
    issue_number: number;
    title: string;
    html_url: string;
    comments: number;
    labels: { name: string; color: string }[];
    user: {
        login: string;
        avatar_url: string;
    };
    created_at: string;
}

const GlobalIssueCard: React.FC<GlobalIssueCardProps> = ({ repo_name, issue_number, title, html_url, comments, labels, user, created_at }) => {
    const [converting, setConverting] = useState(false);
    const [converted, setConverted] = useState(false);

    const handleConvert = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (converting || converted) return;

        setConverting(true);
        try {
            await axios.post('http://localhost:5050/api/issues/convert', {
                repo_id: repo_name, // githubController returns "owner/repo" which matches backend expectation
                issue_number: issue_number,
                title: title,
                html_url: html_url,
                comments: comments,
                labels: labels
            });
            setConverted(true);
            alert('Successfully converted to Bounty!');
        } catch (err: any) {
            console.error('Conversion failed', err);
            const msg = err.response?.data?.message || 'Failed to convert issue.';
            alert(msg);
            if (msg === 'Issue already exists') {
                setConverted(true);
            }
        } finally {
            setConverting(false);
        }
    };

    return (
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="block outline-none h-full">
            <div className="group p-6 border border-white/5 bg-[#0A0A0A] hover:border-[#D3E97A]/50 transition-all duration-300 h-full flex flex-col relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="w-5 h-5 rounded-full border border-white/10"
                        />
                        <div className="text-xs text-zinc-500 font-mono group-hover:text-zinc-300 transition-colors">
                            {repo_name} #{issue_number}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {comments}
                    </div>
                </div>

                <h3 className="text-lg font-technor font-medium text-white mb-4 group-hover:text-[#D3E97A] transition-colors line-clamp-2 leading-snug flex-1">
                    {title}
                </h3>

                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {labels.slice(0, 3).map(label => (
                            <span
                                key={label.name}
                                className="text-[10px] px-2 py-1 bg-white/5 text-zinc-400 rounded border border-white/5 truncate max-w-[150px]"
                                title={label.name}
                            >
                                {label.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="text-[10px] text-zinc-600">
                        {new Date(created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    <button
                        onClick={handleConvert}
                        disabled={converting || converted}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider transition-all z-10 relative ${converted
                                ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default'
                                : 'bg-[#D3E97A] text-black hover:bg-white border border-[#D3E97A] hover:scale-105 active:scale-95'
                            }`}
                    >
                        {converted ? 'IMPORTED' : converting ? 'PROCESSING...' : 'IMPORT TO WANTED'}
                    </button>
                </div>
            </div>
        </a>
    );
};

export default GlobalIssueCard;
