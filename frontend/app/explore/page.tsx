'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalIssueCard from "../components/GlobalIssueCard";
import axios from 'axios';

interface Issue {
    id: number;
    number: number;
    title: string;
    html_url: string;
    repo_name: string;
    comments: number;
    labels: { name: string; color: string }[];
    user: {
        login: string;
        avatar_url: string;
    };
    created_at: string;
}

export default function ExplorePage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('');
    const [error, setError] = useState('');

    const fetchIssues = async (lang?: string) => {
        setLoading(true);
        setError('');
        try {
            const params: any = { limit: 30 };
            if (lang) params.language = lang;

            const response = await axios.get('http://localhost:5050/api/github/top-issues', {
                params,
                withCredentials: true
            });
            setIssues(response.data.issues);
        } catch (err) {
            console.error('Failed to fetch issues', err);
            setError('Failed to load issues. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const languages = ['Python', 'JavaScript', 'TypeScript', 'Rust', 'Go', 'Java', 'C++'];

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-technor font-bold text-white mb-4 tracking-tighter">
                                EXPLORE <span className="text-[#D3E97A]">ISSUES</span>
                            </h1>
                            <p className="text-zinc-400 max-w-xl text-lg">
                                Discover open issues from top GitHub repositories.
                                <br />These are raw, unfiltered opportunities directly from the source.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => { setLanguage(''); fetchIssues(''); }}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded transition-all ${language === ''
                                    ? 'bg-[#D3E97A] text-black border-[#D3E97A]'
                                    : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                All
                            </button>
                            {languages.map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => { setLanguage(lang); fetchIssues(lang); }}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded transition-all ${language === lang
                                        ? 'bg-[#D3E97A] text-black border-[#D3E97A]'
                                        : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-none"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="p-12 border border-red-500/20 bg-red-500/5 text-red-500 text-center font-mono">
                            {error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {issues.map(issue => (
                                <GlobalIssueCard
                                    key={issue.id}
                                    repo_name={issue.repo_name}
                                    issue_number={issue.number}
                                    title={issue.title}
                                    html_url={issue.html_url}
                                    comments={issue.comments}
                                    labels={issue.labels}
                                    user={issue.user}
                                    created_at={issue.created_at}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && issues.length === 0 && !error && (
                        <div className="text-center py-20 text-zinc-500">
                            No issues found matching your criteria.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
