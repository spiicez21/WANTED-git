'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileStats from "../components/ProfileStats";
import ShareProfileModal from "../components/ShareProfileModal";
import { useAuth } from '@/context/AuthContext';
import ContributionHeatmap from '../components/ContributionHeatmap';

export default function ProfilePage() {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] flex items-center justify-center font-clash">
                <div className="w-12 h-12 border-2 border-[#D3E97A] border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
                    <h1 className="text-4xl font-technor font-bold uppercase">Signal Lost</h1>
                    <p className="text-zinc-500 max-w-sm">You must be synchronized with your GitHub account to access your specialist profile.</p>
                    <Link href="/">
                        <button className="px-8 py-3 bg-[#D3E97A] text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-full">
                            Return to Base
                        </button>
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16 pb-16 border-b border-white/5">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#D3E97A]/20 group-hover:border-[#D3E97A] transition-all duration-500 bg-white/5">
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-[#D3E97A] text-black">
                                    {user.username[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-western-gold text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-[0_4px_12px_rgba(255,191,0,0.3)]">
                            {user.rank || 'Rookie'}
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-technor font-bold text-white mb-2 uppercase tracking-tighter">{user.username}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 mb-6 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            <span>@{user.username}</span>
                            {user.portfolio_url && (
                                <>
                                    <span className="text-white/20">•</span>
                                    <a href={user.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#D3E97A] hover:underline transition-all">Portfolio</a>
                                </>
                            )}
                            {user.twitter_handle && (
                                <>
                                    <span className="text-white/20">•</span>
                                    <a href={`https://twitter.com/${user.twitter_handle}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-all">@{user.twitter_handle}</a>
                                </>
                            )}
                        </div>

                        <div className="max-w-md">
                            {user.bio && (
                                <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-clash">
                                    {user.bio}
                                </p>
                            )}
                            <div className="flex justify-between items-end mb-4">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center">
                                        <div className="absolute inset-0 bg-[#D3E97A]/10 rounded-full blur-xl"></div>
                                        <img src={`/ranks/${(user.rank || 'Rookie').toLowerCase()}.svg`}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/ranks/outlaw.svg';
                                            }}
                                            alt={user.rank}
                                            className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(211,233,122,0.2)]" />
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold uppercase tracking-[0.2em] text-western-orange">{user.rank || 'Rookie'}</span>
                                        <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Bounty Hunter ID #{user.github_id}</div>
                                    </div>
                                </div>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Level {Math.floor((user.xp || 0) / 1000) + 1} • {user.xp || 0} XP</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#D3E97A] shadow-[0_0_20px_rgba(211,233,122,0.4)] transition-all duration-1000"
                                    style={{ width: `${Math.min(((user.xp || 0) % 1000) / 10, 100)}%` }}></div>
                            </div>
                            <p className="text-[10px] text-zinc-600 mt-3 text-right uppercase tracking-widest">{1000 - ((user.xp || 0) % 1000)} XP until next level</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/profile/edit">
                            <button className="px-6 py-2 border border-white/10 hover:border-[#D3E97A] hover:text-[#D3E97A] transition-all text-xs font-bold uppercase tracking-wider rounded-full">
                                Edit Profile
                            </button>
                        </Link>
                        <button
                            onClick={() => setIsShareModalOpen(true)}
                            className="px-6 py-2 bg-[#D3E97A] text-black hover:bg-white transition-all text-xs font-bold uppercase tracking-wider rounded-full"
                        >
                            Share Profile
                        </button>
                    </div>
                </div>

                {/* Contribution Heatmap */}
                <div className="mb-16">
                    <ContributionHeatmap username={user.username} />
                </div>

                {/* Stats Grid */}
                <div className="mb-16">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-4">
                        Stats Overview
                        <div className="h-[1px] flex-1 bg-white/5"></div>
                    </h2>
                    <ProfileStats />
                </div>

                {/* Badge Cabinet */}
                <div className="mb-16">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-4">
                        Badge Cabinet
                        <div className="h-[1px] flex-1 bg-white/5"></div>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { name: 'Bug Slayer', desc: 'Solved 10 major vulnerabilities', color: 'border-red-500/20 text-red-400' },
                            { name: 'Test Champion', desc: '100% test coverage on 5 duels', color: 'border-blue-500/20 text-blue-400' },
                            { name: 'On-Time Closer', desc: 'Fastest solver in 3 showdowns', color: 'border-[#D3E97A]/20 text-[#D3E97A]' },
                            { name: 'Zero Rework', desc: 'Passed all tests on first try', color: 'border-western-gold/20 text-western-gold' },
                            { name: 'Arena Pioneer', desc: 'Early adoptor of the protocol', color: 'border-zinc-500/20 text-zinc-400' }
                        ].map((badge, i) => (
                            <div key={i} className={`p-6 border ${badge.color} bg-white/[0.02] rounded-2xl flex flex-col items-center text-center group hover:bg-white/[0.04] transition-all`}>
                                <div className="w-12 h-12 mb-4 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <div className="w-6 h-6 rounded-full border-2 border-current opacity-50"></div>
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest mb-1">{badge.name}</div>
                                <div className="text-[8px] text-zinc-600 uppercase leading-tight">{badge.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Showdowns */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-4 flex-1">
                            Recent Showdowns
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                        </h2>
                        <div className="flex gap-6 ml-8">
                            <span className="text-xs font-bold uppercase tracking-wider text-western-orange cursor-pointer">Duels</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-white cursor-pointer transition-colors">Solo</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-12 border border-white/5 bg-white/[0.02] rounded-3xl text-center flex flex-col items-center">
                            <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest italic mb-6">
                                No recent showdowns recorded in this frontier.
                            </div>
                            <Link href="/duel">
                                <button className="px-6 py-2 border border-[#D3E97A]/20 text-[#D3E97A] hover:bg-[#D3E97A] hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    Find a Showdown
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <ShareProfileModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                username={user.username}
            />
        </main>
    );
}
