'use client';

import React from 'react';
import { ChevronRight, Trophy, Clock, Star } from 'lucide-react';
import Link from 'next/link';

interface QuestionCardProps {
    id: number;
    title: string;
    difficulty: string;
    xp_reward: number;
    time_limit: number;
    status?: 'completed' | 'attempted' | 'none';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ id, title, difficulty, xp_reward, time_limit, status }) => {
    const getDifficultyColor = (diff: string) => {
        switch (diff.toLowerCase()) {
            case 'easy': return 'text-green-400 border-green-400/20 bg-green-400/5';
            case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5';
            case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/5';
            default: return 'text-zinc-400 border-zinc-400/20 bg-zinc-400/5';
        }
    };

    return (
        <Link href={`/solo/${id}`} className="block group">
            <div className="relative overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-accent/40 transition-all duration-300 p-6 rounded-none group-hover:translate-y-[-2px]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-accent/10 transition-colors"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded ${getDifficultyColor(difficulty)}`}>
                            {difficulty}
                        </div>
                        {status === 'completed' && (
                            <div className="text-accent">
                                <Trophy className="w-4 h-4" />
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-technor font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-3 h-3 text-accent" />
                            <span>{xp_reward} XP</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{time_limit}ms</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest group-hover:text-zinc-400 transition-colors">
                            Claim Bounty
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-accent" />
                        </div>
                    </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"></div>
            </div>
        </Link>
    );
};

export default QuestionCard;
