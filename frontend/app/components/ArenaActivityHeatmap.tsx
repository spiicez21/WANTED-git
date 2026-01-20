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

const ArenaActivityHeatmap = ({ userId }: { userId?: number }) => {
    const { user: authUser } = useAuth();
    const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                // If userId is provided, use it. Otherwise backend defaults to session user.
                const url = userId
                    ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/activity/heatmap?userId=${userId}`
                    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/activity/heatmap`;

                const response = await fetch(url, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCalendar(data);
                }
            } catch (err) {
                console.error('Failed to fetch arena activity', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId || authUser) {
            fetchActivity();
        }
    }, [authUser, userId]);

    if (loading) {
        return (
            <div className="w-full h-32 bg-white/5 animate-pulse rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Synchronizing Arena Pulse...</span>
            </div>
        );
    }

    if (!calendar) return null;

    // Helper to get color based on count (WANTED Olive Green Palette)
    const getLevelColor = (count: number) => {
        if (count === 0) return 'bg-white/5';
        if (count < 2) return 'bg-[#D3E97A]/20';
        if (count < 4) return 'bg-[#D3E97A]/40';
        if (count < 6) return 'bg-[#D3E97A]/70';
        return 'bg-[#D3E97A]';
    };

    return (
        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-western-orange/5 blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

            <div className="mb-8 flex justify-between items-end relative z-10">
                <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1 flex items-center gap-2">
                        Arena Activity Pulse
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D3E97A] animate-pulse"></span>
                    </h3>
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">
                        {calendar.totalContributions.toLocaleString()} showdowns & codings detected this year
                    </p>
                </div>
                <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
                    Active Streak: 0 Days
                </div>
            </div>

            <div className="flex justify-between w-full gap-1 overflow-x-auto pb-6 scrollbar-hide relative z-10">
                {calendar.weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1 shrink-0">
                        {week.contributionDays.map((day, dIndex) => (
                            <div
                                key={dIndex}
                                title={`${day.contributionCount} activities on ${day.date}`}
                                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-all duration-300 hover:scale-125 hover:z-20 cursor-crosshair ${getLevelColor(day.contributionCount)}`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center text-[9px] text-zinc-600 uppercase font-mono pt-4 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/10"></div>
                        Silent
                    </span>
                    <span className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#D3E97A]"></div>
                        Hyperactive
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span>Low</span>
                    <div className="flex gap-1">
                        {[0, 2, 4, 6, 8].map((lvl) => (
                            <div key={lvl} className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(lvl)}`}></div>
                        ))}
                    </div>
                    <span>High</span>
                </div>
            </div>
        </div>
    );
};

export default ArenaActivityHeatmap;
