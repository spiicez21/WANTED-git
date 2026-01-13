'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
    Zap, Shield, Target, Clock, ExternalLink,
    Github, MessageSquare, Code2, ArrowLeft,
    Trophy, Users, Activity
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Issue {
    id: number;
    repo_id: string; // "facebook/react"
    issue_number: number;
    title: string;
    description?: string; // Currently undefined in DB, but we can default it?
    difficulty: string;
    xp_reward: number;
    status: string;
    tags: string[];
    html_url: string;
    created_at: string;
}

import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function IssueDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { user, login } = useAuth();
    const router = useRouter();

    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [claiming, setClaiming] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchIssue = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/api/issues/${id}`);
                setIssue(response.data);
            } catch (err) {
                console.error('Failed to fetch issue details', err);
                setError('Failed to load issue details.');
            } finally {
                setLoading(false);
            }
        };

        fetchIssue();
    }, [id]);

    const handleClaim = async () => {
        if (!user) {
            login();
            return;
        }

        setClaiming(true);
        try {
            await axios.post('http://localhost:5050/api/claims',
                { issue_id: issue?.id },
                { withCredentials: true }
            );
            router.push('/claims');
        } catch (err: any) {
            console.error('Failed to claim bounty:', err);
            alert(err.response?.data?.error || 'Failed to claim bounty');
        } finally {
            setClaiming(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-pulse text-[#D3E97A]">Loading Bounty Data...</div>
                </div>
            </main>
        );
    }

    if (error || !issue) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="text-red-500 font-mono text-xl">{error || 'Issue not found'}</div>
                    <div className="text-zinc-500">The link might be broken or expired.</div>
                    <Link href="/issues">
                        <button className="px-6 py-3 bg-[#D3E97A] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
                            Back to Bounties
                        </button>
                    </Link>
                </div>
            </main>
        );
    }

    // Default values for missing data until we enhance the backend to fetch/store these
    const requirements = [
        "Root cause analysis is required.",
        "Implement a stable fix.",
        "Add regression tests.",
        "Ensure code quality standards."
    ];

    // Calculate CR roughly based on XP (just for display continuity)
    const cr = Math.floor(issue.xp_reward * 0.25);

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs */}
                    <Link href="/issues" className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 hover:text-[#D3E97A] uppercase tracking-[0.2em] mb-12 transition-all group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Grid
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Main Content */}
                        <div className="flex-1 space-y-12">
                            {/* Title Section */}
                            <div>
                                <div className="flex items-center gap-3 text-zinc-500 font-mono text-xs mb-4">
                                    <Github className="w-4 h-4" />
                                    <span>{issue.repo_id}</span>
                                    <span className="text-zinc-800">/</span>
                                    <span className="text-zinc-400">#{issue.issue_number}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-technor font-bold text-white mb-6 leading-tight tracking-tighter">
                                    {issue.title}
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    {issue.tags && issue.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 rounded-full uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="px-3 py-1 bg-[#D3E97A]/10 border border-[#D3E97A]/20 text-[10px] font-bold text-[#D3E97A] rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                        <div className="w-1 h-1 bg-[#D3E97A] rounded-full animate-pulse"></div>
                                        {issue.status}
                                    </span>
                                </div>
                            </div>

                            {/* Dossier Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] flex-1 bg-white/5"></div>
                                    <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Technical Dossier</span>
                                    <div className="h-[1px] flex-1 bg-white/5"></div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-lg text-zinc-400 leading-relaxed font-clash italic">
                                        "This bounty was automatically imported from GitHub. Please review the official issue thread for full context and reproduction steps."
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                    <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-xl space-y-6">
                                        <div className="flex items-center gap-3 text-[#D3E97A]">
                                            <Shield className="w-5 h-5" />
                                            <h3 className="text-xs font-bold uppercase tracking-widest">Requirements</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {requirements.map((req, i) => (
                                                <li key={i} className="flex gap-4 text-xs text-zinc-500 leading-relaxed">
                                                    <span className="text-[#D3E97A] font-mono">{i + 1}.</span>
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-xl space-y-6">
                                        <div className="flex items-center gap-3 text-[#D3E97A]">
                                            <Users className="w-5 h-5" />
                                            <h3 className="text-xs font-bold uppercase tracking-widest">Active Hunters</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
                                                <p className="text-[10px] text-zinc-500 font-mono">No active hunters yet.</p>
                                            </div>
                                            <div className="pt-2 text-center">
                                                <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Be the first to claim!</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-96 space-y-8">
                            {/* Reward Card */}
                            <div className="p-8 border border-[#D3E97A]/20 bg-[#D3E97A]/[0.02] rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Target className="w-32 h-32 text-[#D3E97A] rotate-12" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Reward Pool</div>
                                        <div className="text-5xl font-technor font-bold text-white tracking-tighter">
                                            {cr.toLocaleString()} <span className="text-[#D3E97A]">CR</span>
                                        </div>
                                        <div className="text-sm font-bold text-[#D3E97A]/60 font-technor">
                                            + {issue.xp_reward.toLocaleString()} XP Points
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 border border-white/5 bg-black/40 rounded-xl space-y-1">
                                            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                                <Activity className="w-3 h-3" /> Impact
                                            </div>
                                            <div className="text-xs font-bold text-white uppercase">HIGH</div>
                                        </div>
                                        <div className="p-4 border border-white/5 bg-black/40 rounded-xl space-y-1">
                                            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                                <Trophy className="w-3 h-3" /> Difficulty
                                            </div>
                                            <div className="text-xs font-bold text-white uppercase">{issue.difficulty}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleClaim}
                                        disabled={claiming}
                                        className="w-full py-5 bg-[#D3E97A] text-black font-bold text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(211,233,122,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {claiming ? 'CLAIMING...' : 'CLAIM BOUNTY'}
                                        <Zap className="w-4 h-4 fill-black" />
                                    </button>

                                    <div className="text-center">
                                        <p className="text-[9px] text-zinc-600 font-medium uppercase tracking-widest leading-relaxed">
                                            Claims are exclusive to contributors level 10+.
                                            Verification takes 24-48 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Actions */}
                            <div className="space-y-4">
                                <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="block outline-none">
                                    <button className="w-full py-4 border border-white/5 bg-white/[0.02] text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 hover:text-white transition-all">
                                        <Github className="w-4 h-4" /> View on GitHub
                                    </button>
                                </a>
                                <button className="w-full py-4 border border-white/5 bg-white/[0.02] text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 hover:text-white transition-all">
                                    <MessageSquare className="w-4 h-4" /> Join Discussion
                                </button>
                            </div>

                            {/* Metadata */}
                            <div className="pt-8 border-t border-white/5 space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-zinc-600">Posted on</span>
                                    <span className="text-zinc-400 italic">
                                        {new Date(issue.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-zinc-600">Verification</span>
                                    <span className="text-[#D3E97A]">AUTOMATED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
