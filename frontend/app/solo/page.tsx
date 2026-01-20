'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuestionCard from '../components/QuestionCard';
import { Search, Filter, Terminal, Target, ShieldCheck, Trophy } from 'lucide-react';

interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    xp_reward: number;
    time_limit: number;
    memory_limit: number;
}

export default function SoloMode() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProblems();
    }, []);

    useEffect(() => {
        let result = problems;
        if (filter !== 'All') {
            result = result.filter(p => p.difficulty.toLowerCase() === filter.toLowerCase());
        }
        if (searchQuery) {
            result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredProblems(result);
    }, [filter, searchQuery, problems]);

    const fetchProblems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/problems`);
            if (res.ok) {
                const data = await res.json();
                setProblems(data);
                setFilteredProblems(data);
            }
        } catch (err) {
            console.error('Failed to fetch problems', err);
        } finally {
            setLoading(false);
        }
    };

    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col">
            <Navbar />

            <div className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 border-b border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/10 blur-[120px] rounded-full"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                                <Terminal className="w-4 h-4" />
                                Protocol: Solo Bounty Hunt
                            </div>
                            <h1 className="text-5xl md:text-7xl font-technor font-bold mb-6 tracking-tight">
                                CLAIM YOUR <span className="text-accent underline decoration-accent/30 underline-offset-8">BOUNTIES</span>
                            </h1>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                                Enter the arena, Gunslinger. Sharpen your blades on these algorithmic challenges and earn XP to climb the ranks.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters & Search */}
                <section className="sticky top-[100px] z-20 bg-[#060606]/80 backdrop-blur-md border-b border-white/5 py-4">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-2">
                                {difficulties.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setFilter(d)}
                                        className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${filter === d ? 'bg-accent text-black border-accent' : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/20'}`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search bounties..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Question Grid */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-64 bg-white/5 animate-pulse border border-white/5"></div>
                                ))}
                            </div>
                        ) : filteredProblems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProblems.map(problem => (
                                    <QuestionCard
                                        key={problem.id}
                                        id={problem.id}
                                        title={problem.title}
                                        difficulty={problem.difficulty}
                                        xp_reward={problem.xp_reward}
                                        time_limit={problem.time_limit}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10">
                                <Target className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-zinc-400">No Bounties Found</h3>
                                <p className="text-zinc-600 mt-2">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-white/5 border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-accent/10 rounded border border-accent/20">
                                    <ShieldCheck className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Secure Environment</h4>
                                    <p className="text-sm text-zinc-500">Your code runs in isolated Docker containers for maximum safety.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-accent/10 rounded border border-accent/20">
                                    <Terminal className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Multi-Language Support</h4>
                                    <p className="text-sm text-zinc-500">Solve challenges in your favorite language, from JS to Rust.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-accent/10 rounded border border-accent/20">
                                    <Trophy className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Proof of Work</h4>
                                    <p className="text-sm text-zinc-500">Every solved bounty is recorded on your profile and ranks you up.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
