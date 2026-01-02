'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ContributionDay {
    contributionCount: number;
    date: string;
    color: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

const ContributionHeatmap = ({ username }: { username?: string }) => {
    const { user: authUser } = useAuth();
    const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                // If username is provided, use it. Otherwise backend defaults to session user.
                const url = username
                    ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/github/contributions?username=${username}`
                    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/github/contributions`;

                const response = await fetch(url, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCalendar(data);
                }
            } catch (err) {
                console.error('Failed to fetch contributions', err);
            } finally {
                setLoading(false);
            }
        };

        // We fetch if we have a target username OR if we have an authenticated user viewing their own
        if (username || authUser) {
            fetchContributions();
        }
    }, [authUser, username]);

    if (loading) {
        return (
            <div className="w-full h-32 bg-white/5 animate-pulse rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Synchronizing Heatmap...</span>
            </div>
        );
    }

    if (!calendar) return null;

    // Helper to get color based on count (WANTED Olive Green Palette)
    const getLevelColor = (count: number) => {
        if (count === 0) return 'bg-white/10';
        if (count < 3) return 'bg-[#D3E97A]/20';
        if (count < 6) return 'bg-[#D3E97A]/40';
        if (count < 9) return 'bg-[#D3E97A]/70';
        return 'bg-[#D3E97A]';
    };

    return (
        <div className="p-6 border border-white/5 bg-[#0A0A0A] rounded-lg">
            <div className="mb-8">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Contribution Pulse</h3>
                <p className="text-[10px] text-zinc-500 uppercase font-mono">
                    {calendar.totalContributions.toLocaleString()} total signals detected this year
                </p>
            </div>

            <div className="flex justify-between w-full gap-1 overflow-x-auto pb-6 scrollbar-hide">
                {calendar.weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1.5 shrink-0">
                        {week.contributionDays.map((day, dIndex) => (
                            <div
                                key={dIndex}
                                title={`${day.contributionCount} contributions on ${day.date}`}
                                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-sm transition-colors duration-500 hover:ring-1 hover:ring-white/20 ${getLevelColor(day.contributionCount)}`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-end items-center gap-2 text-[10px] text-zinc-600 uppercase font-mono pt-2 border-t border-white/5">
                <span>Low</span>
                <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 bg-white/5 rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-[#D3E97A]/20 rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-[#D3E97A]/40 rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-[#D3E97A]/70 rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-[#D3E97A] rounded-sm"></div>
                </div>
                <span>High</span>
            </div>
        </div>
    );
};

export default ContributionHeatmap;
