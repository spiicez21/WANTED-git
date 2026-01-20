'use client';

import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, Zap, Shield, Target, Trophy, Globe, Rocket, Building2, Crown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SponsorPage() {
    const tiers = [
        {
            name: "Individual",
            price: "$10/mo",
            icon: <Heart className="w-8 h-8 text-pink-500" />,
            benefits: [
                "Supporter badge on profile",
                "Access to sponsor-only Discord channels",
                "Early access to new features",
                "WANTED.git sticker pack"
            ],
            color: "border-pink-500/20 bg-pink-500/5",
            textColor: "text-pink-500"
        },
        {
            name: "Startup",
            price: "$250/mo",
            icon: <Rocket className="w-8 h-8 text-[#D3E97A]" />,
            benefits: [
                "Everything in Individual",
                "Logo featured on the Sponsors page",
                "Priority challenge category sponsorship",
                "1x Featured Showdown per month",
                "Direct line to arena developers"
            ],
            color: "border-[#D3E97A]/20 bg-[#D3E97A]/5",
            textColor: "text-[#D3E97A]",
            featured: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            icon: <Building2 className="w-8 h-8 text-blue-500" />,
            benefits: [
                "Everything in Startup",
                "Secondary logo on the main Homepage",
                "Unlimited Sponsored Showdowns",
                "Dedicated Account Manager",
                "Custom XP/CR rewards for internal teams",
                "Direct access to top 1% arena performers"
            ],
            color: "border-blue-500/20 bg-blue-500/5",
            textColor: "text-blue-500"
        }
    ];


    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-24">
                        <div className="flex items-center justify-center gap-3 text-[#D3E97A] mb-6">
                            <Crown className="w-6 h-6" />
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Patronage Protocol // v1.0</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-technor font-bold text-white mb-8 tracking-tighter">
                            SUPPORT THE <br />
                            <span className="text-[#D3E97A]">PROTOCOL</span>
                        </h1>
                        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            Empower the duelists of tomorrow. Your sponsorship directly funds prize pools
                            and ensures the sustainability of high-stakes competitive coding infrastructure.
                        </p>
                    </div>

                    {/* Tiers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {tiers.map((tier, i) => (
                            <div
                                key={i}
                                className={`p-10 border rounded-3xl flex flex-col transition-all duration-500 hover:scale-[1.02] group ${tier.color} ${tier.featured ? 'shadow-[0_20px_60px_rgba(211,233,122,0.1)] relative' : ''}`}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D3E97A] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">{tier.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className={`text-3xl font-technor font-bold ${tier.textColor} mb-8`}>{tier.price}</div>

                                <ul className="space-y-4 mb-12 flex-1">
                                    {tier.benefits.map((benefit, j) => (
                                        <li key={j} className="flex gap-4 text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                            <div className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${tier.textColor} ${tier.featured ? 'bg-[#D3E97A]' : 'bg-current'}`}></div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${tier.featured
                                    ? 'bg-[#D3E97A] text-black hover:bg-white animate-pulse-slow'
                                    : 'border border-white/10 text-white hover:bg-white/5'
                                    }`}>
                                    Select Tier
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Active Patrons */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600 whitespace-nowrap">Current Protocol Patrons</h2>
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                        </div>

                        <div className="py-20 border border-dashed border-white/5 bg-[#0A0A0A] rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-zinc-700">
                                <Building2 className="w-5 h-5 opacity-20" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">No Active Patrons</h3>
                                <p className="text-[10px] text-zinc-700 uppercase tracking-widest leading-relaxed">
                                    The grid is currently vacant. <br />
                                    Be the first professional entity to fuel the revolution.
                                </p>
                            </div>
                        </div>

                        <div className="pt-12 text-center text-[10px] font-medium text-zinc-700 uppercase tracking-widest">
                            Join these visionary organizations shaping the future of code &copy; 2025
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
