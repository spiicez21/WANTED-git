'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Target, Trophy, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardRowProps {
    rank: number;
    username: string;
    avatar_url?: string | null;
    bio?: string | null;
    portfolio_url?: string | null;
    twitter_handle?: string | null;
    level: number;
    xp: number;
    cr: number;
    totalBounties: number;
    isTopThree?: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    isCurrentUser?: boolean;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
    rank,
    username,
    avatar_url,
    bio,
    portfolio_url,
    twitter_handle,
    level,
    xp,
    cr,
    totalBounties,
    isExpanded,
    onToggle,
    isCurrentUser = false,
}) => {
    const rankColors = {
        1: 'text-western-gold border-western-gold/20 bg-western-gold/5',
        2: 'text-zinc-300 border-zinc-700 bg-zinc-800/20',
        3: 'text-western-orange border-western-orange/20 bg-western-orange/5',
    };

    return (
        <div className="flex flex-col gap-1 transition-all duration-500">
            {/* Main Row */}
            <div
                onClick={onToggle}
                className={`flex items-center gap-6 p-4 md:p-6 border transition-all duration-300 group cursor-pointer
                    ${rank <= 3 ? rankColors[rank as 1 | 2 | 3] : 'border-white/5 bg-[#0A0A0A] hover:border-white/10'}
                    ${isCurrentUser ? 'border-[#D3E97A]/40 bg-[#D3E97A]/[0.02]' : ''}
                    ${isExpanded ? 'border-b-transparent rounded-t-xl' : 'rounded-none'}
                `}
            >
                {/* Rank Number */}
                <div className="w-12 text-center font-technor font-bold text-xl">
                    <span className={rank <= 3 || isCurrentUser ? 'text-[#D3E97A]' : 'text-zinc-600'}>
                        {rank}
                    </span>
                </div>

                {/* Rank Icon Column */}
                <div className="w-20 flex justify-center">
                    <img
                        src="/Ranks Icon/Specialist.svg"
                        alt="Specialist"
                        className="w-12 h-12 drop-shadow-[0_0_10px_rgba(211,233,122,0.15)] group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Contributor Info */}
                <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full overflow-hidden border-2 
                        ${rank === 1 || isCurrentUser ? 'border-[#D3E97A]' : 'border-white/10'}
                    `}>
                        <img src={avatar_url || "/placeholder-avatar.png"} alt={username} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-white font-medium group-hover:text-[#D3E97A] transition-colors flex items-center gap-2">
                            {username}
                            {isCurrentUser && (
                                <span className="px-1.5 py-0.5 bg-[#D3E97A] text-black text-[8px] font-bold tracking-tighter rounded">YOU</span>
                            )}
                            {isExpanded ? <ChevronUp className="w-3 h-3 text-zinc-600" /> : <ChevronDown className="w-3 h-3 text-zinc-600 group-hover:text-[#D3E97A]" />}
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">Level {level}</div>
                    </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex flex-col items-end w-28">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Bounties</div>
                    <div className="text-white font-bold">{totalBounties}</div>
                </div>

                <div className="flex flex-col items-end w-32">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Total CR</div>
                    <div className="text-white font-bold font-technor">{(cr || 0).toLocaleString()} CR</div>
                </div>

                <div className="flex flex-col items-end w-32">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Total XP</div>
                    <div className="text-[#D3E97A] font-technor font-bold">{xp.toLocaleString()} XP</div>
                </div>
            </div>

            {/* Expanded Card */}
            {isExpanded && (
                <div className={`p-8 border-x border-b bg-[#0A0A0A] rounded-b-xl animate-in slide-in-from-top-4 duration-500 
                    ${rank <= 3 ? 'border-[#D3E97A]/20' : 'border-white/5'}
                `}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Bio & Links */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Protocol Bio</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed font-clash italic">
                                    {bio || `"Dedicated specialist building the future of code. Pulse synchronized with global bounty streams."`}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Link href={`https://github.com/${username}`} target="_blank" className="p-2 border border-white/5 hover:border-[#D3E97A]/50 transition-all rounded-lg text-zinc-600 hover:text-white">
                                    <Github className="w-4 h-4" />
                                </Link>
                                {twitter_handle && (
                                    <Link href={`https://twitter.com/${twitter_handle}`} target="_blank" className="p-2 border border-white/5 hover:border-[#D3E97A]/50 transition-all rounded-lg text-zinc-600 hover:text-white">
                                        <Twitter className="w-4 h-4" />
                                    </Link>
                                )}
                                {portfolio_url && (
                                    <Link href={portfolio_url} target="_blank" className="p-2 border border-white/5 hover:border-[#D3E97A]/50 transition-all rounded-lg text-zinc-600 hover:text-white">
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Performance & Expertise */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Field Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Rust', 'Web3'].map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold text-white rounded-full uppercase tracking-widest group-hover:border-[#D3E97A]/30 transition-all">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 border border-white/5 bg-white/[0.02] rounded-lg">
                                    <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Accuracy</div>
                                    <div className="text-sm font-bold text-white font-technor">94.2%</div>
                                </div>
                                <div className="p-3 border border-white/5 bg-white/[0.02] rounded-lg">
                                    <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Avg Payout</div>
                                    <div className="text-sm font-bold text-[#D3E97A] font-technor">1.2K CR</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions & Achievements */}
                        <div className="flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-zinc-500">
                                    <Trophy className="w-4 h-4 text-[#D3E97A]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">3x Top Contributor</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-500">
                                    <Target className="w-4 h-4 text-[#D3E97A]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Master Bug Hunter</span>
                                </div>
                            </div>

                            <Link href={`/profile/${username.toLowerCase()}`} className="mt-8 w-full py-4 bg-[#D3E97A] text-black font-bold text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(211,233,122,0.1)] uppercase">
                                Access Full Profile
                                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderboardRow;
