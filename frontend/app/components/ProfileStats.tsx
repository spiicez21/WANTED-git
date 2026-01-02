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
    <div className="p-6 border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-all group">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex justify-between items-center">
            {label}
            {trend && (
                <span className={`text-[10px] ${trend.positive ? 'text-[#D3E97A]' : 'text-red-400'}`}>
                    {trend.value}
                </span>
            )}
        </div>
        <div className="text-3xl font-technor font-bold text-white mb-1 group-hover:text-[#D3E97A] transition-colors">{value}</div>
        {sublabel && <div className="text-[10px] text-zinc-600 uppercase">{sublabel}</div>}
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
                label="Claims Completed"
                value="0"
                sublabel="Synced from GitHub"
            />
            <StatCard
                label="Success Rate"
                value="100%"
                sublabel="PR Merge percentage"
            />
        </div>
    );
};

export default ProfileStats;
