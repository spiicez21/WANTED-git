import React from 'react';
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RulesPage() {
    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-7xl font-technor font-bold text-white mb-4 tracking-tighter">
                            PLATFORM <span className="text-[#D3E97A]">RULES</span>
                        </h1>
                        <p className="text-zinc-500 text-lg max-w-2xl">
                            The guidelines for fair play, earning rewards, and climbing the ranks in the WANTED.git ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl">
                            <div className="w-12 h-12 bg-[#D3E97A] rounded-lg flex items-center justify-center mb-6">
                                <span className="text-black font-bold text-xl">XP</span>
                            </div>
                            <h3 className="text-2xl font-technor font-bold text-white mb-4">Experience Points</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                XP represents your skill and contribution level. It is earned by solving coding challenges, winning duels, and participating in the arena.
                            </p>
                            <ul className="space-y-3 text-xs text-zinc-500">
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#D3E97A] rounded-full"></div>
                                    Dynamic rewards based on challenge difficulty
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#D3E97A] rounded-full"></div>
                                    Higher difficulty = Greater XP rewards
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#D3E97A] rounded-full"></div>
                                    Bonus XP for "First Responders"
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl">
                            <div className="w-12 h-12 border border-[#D3E97A]/20 bg-[#D3E97A]/5 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-[#D3E97A] font-bold text-xl">CR</span>
                            </div>
                            <h3 className="text-2xl font-technor font-bold text-white mb-4">Credits</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                Credits are the internal currency of WANTED.git. They can be redeemed for real-world rewards or used within the platform ecosystem.
                            </p>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 mb-6">
                                <div className="text-[10px] text-zinc-500 uppercase mb-1">Conversion Formula</div>
                                <div className="text-xl font-technor font-bold text-white">1 XP = 0.25 CR</div>
                            </div>
                            <ul className="space-y-3 text-xs text-zinc-500">
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#D3E97A] rounded-full"></div>
                                    Automated payouts upon successful challenge solving
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#D3E97A] rounded-full"></div>
                                    Redeemable via Stripe Connect
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-12 text-zinc-400 leading-relaxed">
                        <section className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl">
                            <h2 className="text-2xl font-technor font-bold text-white mb-6 uppercase tracking-wider">The Code of Honor</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-white font-bold mb-3">1. Verification Integrity</h4>
                                    <p className="text-sm">
                                        All submissions must be your original work. Plagiarism or using multiple accounts to gain unfair advantage in duels will result in an immediate ban.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-3">2. Ghosting Policy</h4>
                                    <p className="text-sm">
                                        If you claim an issue but do not submit a PR within 48 hours, the bounty will be released back to the community to ensure project momentum.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-3">3. Quality Standards</h4>
                                    <p className="text-sm">
                                        Code must follow the target repository's style guide. Low-quality or "spammy" PRs intended solely to farm XP will be rejected and may lead to rank de-leveling.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-3">4. Community Respect</h4>
                                    <p className="text-sm">
                                        Maintain professional conduct in all interactions with maintainers and other contributors. We value constructive collaboration over competition.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 border border-[#D3E97A]/20 bg-[#D3E97A]/5 rounded-2xl">
                            <div>
                                <h3 className="text-2xl font-technor font-bold text-white mb-2">Ready to duel?</h3>
                                <p className="text-zinc-400 text-sm">Pick your arena and prove your speed today.</p>
                            </div>
                            <Link href="/duel">
                                <button className="px-8 py-4 bg-[#D3E97A] text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                                    Browse Showdowns
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
