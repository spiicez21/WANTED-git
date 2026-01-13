'use client';

import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ClaimCard from "../components/ClaimCard";

export default function ClaimsPage() {
    const [claims, setClaims] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/claims', { withCredentials: true });
                setClaims(response.data);
            } catch (err) {
                console.error('Failed to fetch claims', err);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, []);

    // Helper to format status
    const formatStatus = (status: string) => {
        if (status === 'IN_PROGRESS') return 'In Progress';
        if (status === 'UNDER_REVIEW') return 'Under Review';
        if (status === 'COMPLETED') return 'Completed';
        return status;
    };

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
                                <h1 className="text-4xl md:text-5xl font-technor font-bold text-white mb-2 uppercase tracking-tighter">YOUR CLAIMS</h1>
                                <p className="text-zinc-500 font-medium">{loading ? 'Loading...' : `Managing ${claims.length} active protocols`}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex gap-4 border-r border-white/10 pr-6 mr-6">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D3E97A] cursor-pointer">Active</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white cursor-pointer transition-colors">History</span>
                                </div>
                                <Link href="/issues">
                                    <button className="px-6 py-3 bg-[#D3E97A] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_20px_rgba(211,233,122,0.1)] flex items-center gap-2">
                                        FIND BOUNTY
                                        <div className="w-1 h-1 bg-black rounded-full"></div>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-40 bg-white/5 border border-white/5"></div>
                                    ))}
                                </div>
                            ) : claims.length === 0 ? (
                                <div className="p-8 border border-white/5 bg-white/5 text-center text-zinc-500 font-mono">
                                    You haven't claimed any bounties yet.
                                </div>
                            ) : (
                                claims.map((claim: any) => (
                                    <Link key={claim.claim_id} href={`/issues/${claim.issue_id}`} className="block">
                                        <ClaimCard
                                            repo={claim.repo_id}
                                            title={claim.title}
                                            xp={claim.xp_reward}
                                            status={formatStatus(claim.claim_status) as any}
                                            dateClaimed={new Date(claim.claim_date).toLocaleDateString()}
                                        />
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
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
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
