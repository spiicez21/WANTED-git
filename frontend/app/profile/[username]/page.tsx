'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileStats from "../../components/ProfileStats";
import ClaimCard from "../../components/ClaimCard";
import ShareProfileModal from "../../components/ShareProfileModal";
import { useAuth } from '@/context/AuthContext';
import ContributionHeatmap from '../../components/ContributionHeatmap';
import { useParams } from 'next/navigation';

interface UserData {
    id: number;
    github_id: string;
    username: string;
    avatar_url: string | null;
    xp: number;
    rank: string;
    wallet_balance: string;
    bio: string | null;
    portfolio_url: string | null;
    twitter_handle: string | null;
}

export default function PublicProfilePage() {
    const params = useParams();
    const username = params.username as string;
    const { user: viewer } = useAuth();

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/users/username/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Failed to fetch public profile', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] flex items-center justify-center font-clash">
                <div className="w-12 h-12 border-2 border-[#D3E97A] border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    if (error || !user) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
                    <h1 className="text-4xl font-technor font-bold uppercase text-red-500">Node Not Found</h1>
                    <p className="text-zinc-500 max-w-sm">The specialist profile for <span className="text-white font-mono">@{username}</span> could not be located in the grid.</p>
                    <Link href="/leaderboard">
                        <button className="px-8 py-3 bg-[#D3E97A] text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-full">
                            Search Leaderboard
                        </button>
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const isOwnProfile = viewer?.username === user.username;

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
                        <div className="absolute -bottom-2 -right-2 bg-[#D3E97A] text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                            Beta
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
                                        <img src={`/Ranks Icon/${user.rank || 'Rookie'}.svg`}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/Ranks Icon/Specialist.svg';
                                            }}
                                            alt={user.rank}
                                            className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(211,233,122,0.2)]" />
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold uppercase tracking-[0.2em] text-[#D3E97A]">{user.rank || 'Rookie'}</span>
                                        <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Specialist ID #{user.github_id}</div>
                                    </div>
                                </div>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Level {Math.floor(user.xp / 1000) + 1} • {user.xp || 0} XP</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#D3E97A] shadow-[0_0_20px_rgba(211,233,122,0.4)] transition-all duration-1000"
                                    style={{ width: `${Math.min(((user.xp || 0) % 1000) / 10, 100)}%` }}></div>
                            </div>
                            <p className="text-[10px] text-zinc-600 mt-3 text-right uppercase tracking-widest">{1000 - ((user.xp || 0) % 1000)} XP until next level</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {isOwnProfile ? (
                            <Link href="/profile/edit">
                                <button className="px-6 py-2 border border-white/10 hover:border-[#D3E97A] hover:text-[#D3E97A] transition-all text-xs font-bold uppercase tracking-wider rounded-full">
                                    Edit Profile
                                </button>
                            </Link>
                        ) : (
                            <button className="px-6 py-2 border border-white/10 text-white transition-all text-xs font-bold uppercase tracking-wider rounded-full opacity-50 cursor-not-allowed">
                                Network Specialist
                            </button>
                        )}
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
                    <ProfileStats user={user} />
                </div>

                {/* Recent Activity */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-4 flex-1">
                            Recent Activity
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl text-center">
                            <p className="text-zinc-500 text-xs uppercase tracking-widest">No recent bounty activity detected in this sector.</p>
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
