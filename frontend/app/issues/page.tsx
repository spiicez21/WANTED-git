'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import IssueCard from "../components/IssueCard";
import axios from 'axios';

interface BountyIssue {
    id: number;
    repo_id: string; // e.g., "facebook/react"
    issue_number: number;
    title: string;
    difficulty: 'Rookie' | 'Contributor' | 'Specialist' | 'Expert' | 'Architect';
    xp_reward: number;
    tags: string[];
    html_url: string;
    status: string;
}

export default function IssuesPage() {
    const [issues, setIssues] = useState<BountyIssue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/issues');
                setIssues(response.data);
            } catch (err) {
                console.error('Failed to fetch bounties:', err);
                setError('Failed to load bounties. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Sidebar */}
                    <div className="flex-shrink-0">
                        <FilterSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-technor font-bold text-white mb-2 uppercase tracking-tighter">OPEN BOUNTIES (V2)</h1>
                                <p className="text-zinc-500 font-medium">
                                    {loading ? 'Loading opportunities...' : `Found ${issues.length} active opportunities in the grid`}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex gap-4 border-r border-white/10 pr-6 mr-6">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D3E97A] cursor-pointer">Newest</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white cursor-pointer transition-colors">Highest Paid</span>
                                </div>
                                <Link href="/claims/issues">
                                    <button className="px-6 py-3 bg-[#D3E97A] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_20px_rgba(211,233,122,0.15)] flex items-center gap-2">
                                        POST BOUNTY
                                        <div className="w-1 h-1 bg-black rounded-full"></div>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 gap-4 animate-pulse">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-40 bg-white/5 border border-white/5 rounded-none"></div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="p-12 border border-red-500/20 bg-red-500/5 text-red-500 text-center font-mono">
                                {error}
                            </div>
                        ) : issues.length === 0 ? (
                            <div className="p-12 border border-white/5 bg-white/5 text-zinc-500 text-center font-mono">
                                No active bounties found. Go to Explore to Import some!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {issues.map(issue => (
                                    <Link key={issue.id} href={`/issues/${issue.id}`} className="block outline-none">
                                        <IssueCard
                                            repo={issue.repo_id}
                                            title={issue.title}
                                            xp={issue.xp_reward || 0}
                                            difficulty={issue.difficulty}
                                            tags={issue.tags || []}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination - Keep for checking UI, disabled functionality for now */}
                        {!loading && issues.length > 0 && (
                            <div className="flex justify-center items-center gap-4 mt-16">
                                <button className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#D3E97A] hover:text-[#D3E97A] transition-colors bg-[#0A0A0A] text-zinc-500 rounded">
                                    &lt;
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center border border-[#D3E97A] text-[#D3E97A] bg-[#D3E97A]/5 font-bold rounded">
                                    1
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#D3E97A] hover:text-[#D3E97A] transition-colors bg-[#0A0A0A] text-zinc-500 rounded">
                                    &gt;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
