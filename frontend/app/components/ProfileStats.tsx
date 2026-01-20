import React from 'react';
import { useAuth } from '@/context/AuthContext';

interface StatCardProps {
    label: string;
    value: string | number;
    sublabel?: string;
    trend?: {
        value: string;
        positive: boolean;
    };
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sublabel, trend }) => (
    <div className="p-8 border border-white/5 bg-gradient-to-b from-[#0A0A0A] to-[#0D0D0D] hover:border-western-orange/30 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-western-orange/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-western-orange/10 transition-colors"></div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6 flex justify-between items-center relative z-10">
            {label}
            {trend && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${trend.positive ? 'bg-[#D3E97A]/10 text-[#D3E97A]' : 'bg-red-500/10 text-red-400'}`}>
                    {trend.value}
                </span>
            )}
        </div>
        <div className="text-4xl font-technor font-bold text-white mb-2 group-hover:text-western-orange transition-colors relative z-10 tracking-tighter">{value}</div>
        {sublabel && <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono relative z-10">{sublabel}</div>}
    </div>
);

const ProfileStats = ({ user: manualUser }: { user?: any }) => {
    const { user: authUser } = useAuth();
    const user = manualUser || authUser;

    if (!user) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                label="Wallet Balance"
                value={`${user.wallet_balance || '0.00'} CR`}
                sublabel="Available for payout"
            />
            <StatCard
                label="Total XP"
                value={(user.xp || 0).toLocaleString()}
                sublabel={`${user.rank || 'Rookie'} Specialist`}
                trend={{ value: `Level ${Math.floor((user.xp || 0) / 1000) + 1}`, positive: true }}
            />
            <StatCard
                label="Duels Won"
                value="0"
                sublabel="Victories in Showdowns"
            />
            <StatCard
                label="Win Rate"
                value="0%"
                sublabel="Shooting accuracy"
            />
        </div>
    );
};

export default ProfileStats;
