import Link from 'next/link';
import { Trophy } from 'lucide-react';

const ProjectShowcase = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="px-8 md:px-32 lg:px-60 py-24 md:py-32 border-b border-white/5">
                <div className="max-w-5xl">
                    <p className="text-[#D3E97A] font-medium tracking-wide mb-6 uppercase text-sm">Competitive Coding Arena</p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-technor font-bold leading-[0.9] tracking-tight mb-12">
                        CODE FAST. <br />
                        CLAIM BOUNTIES.
                    </h1>
                    <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl font-light font-clash">
                        Western-style showdowns + Gamification. Compete in Solo or Duel modes to rank up and claim your bounty.
                    </p>
                </div>
            </section>

            {/* 01. Goal */}
            <section className="group relative border-b border-white/5 py-32 md:py-48 px-8 md:px-32 lg:px-60 hover:bg-zinc-900/20 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="text-4xl font-technor font-bold text-white/10 group-hover:text-[#D3E97A] transition-colors">01</span>
                        <h3 className="mt-4 text-sm uppercase tracking-wider text-zinc-500">Project Goal</h3>
                    </div>
                    <div className="md:col-span-9">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-lg font-light text-zinc-300">
                            <li className="flex gap-4 items-start">
                                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[#D3E97A]"></span>
                                Curated coding challenges for all skill levels
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[#D3E97A]"></span>
                                Real-time head-to-head duels
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[#D3E97A]"></span>
                                Automated judging & performance metrics
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[#D3E97A]"></span>
                                Rewards developers with XP, Ranks & Badges
                            </li>
                        </ul>
                    </div>
                </div>
            </section>



            {/* 02. Claim Workflow */}
            <section className="group relative border-b border-white/5 py-32 md:py-48 px-8 md:px-32 lg:px-60 hover:bg-zinc-900/20 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="text-4xl font-technor font-bold text-white/10 group-hover:text-[#D3E97A] transition-colors">02</span>
                        <h3 className="mt-4 text-sm uppercase tracking-wider text-zinc-500">How it works</h3>
                    </div>
                    <div className="md:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {[
                                { step: '01', title: 'Mode', desc: 'Choose Solo or Duel' },
                                { step: '02', title: 'Arena', desc: 'Enter the sandbox env' },
                                { step: '03', title: 'Code', desc: 'Solve under the clock' },
                                { step: '04', title: 'Judge', desc: 'Automated scoring' },
                                { step: '05', title: 'Rank', desc: 'XP + Rank progression' },
                            ].map((item) => (
                                <div key={item.step} className="relative pl-6 border-l border-white/10">
                                    <span className="text-[10px] text-[#D3E97A] mb-2 block">{item.step}</span>
                                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                    <p className="text-xs text-zinc-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 03. Crowdfunding */}
            <section className="group relative border-b border-white/5 py-32 md:py-48 px-8 md:px-32 lg:px-60 hover:bg-zinc-900/20 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="text-4xl font-technor font-bold text-white/10 group-hover:text-[#D3E97A] transition-colors">03</span>
                        <h3 className="mt-4 text-sm uppercase tracking-wider text-zinc-500">Crowdfunding</h3>
                    </div>
                    <div className="md:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <ul className="space-y-4 text-zinc-300 font-light">
                                <li className="flex gap-4 items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D3E97A]"></span>
                                    Sponsors pledge into bounty pool
                                </li>
                                <li className="flex gap-4 items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D3E97A]"></span>
                                    Funds released on clean merge
                                </li>
                            </ul>
                            <div className="p-6 border border-white/5 bg-white/[0.02] flex items-center justify-between">
                                <div className="text-center">
                                    <div className="text-2xl font-technor font-bold text-white">90%</div>
                                    <div className="text-[10px] uppercase text-zinc-500">Developer</div>
                                </div>
                                <div className="h-8 w-px bg-white/10"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-technor font-bold text-white">10%</div>
                                    <div className="text-[10px] uppercase text-zinc-500">Maintainer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 04. Gamification */}
            <section className="group relative py-32 md:py-48 px-8 md:px-32 lg:px-60 hover:bg-zinc-900/20 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="text-4xl font-technor font-bold text-white/10 group-hover:text-[#D3E97A] transition-colors">04</span>
                        <h3 className="mt-4 text-sm uppercase tracking-wider text-zinc-500">Gamification</h3>
                    </div>
                    <div className="md:col-span-9">
                        <div className="mb-12">
                            <h4 className="text-white text-lg mb-4">Ranks System</h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {['Rookie', 'Gunslinger', 'Outlaw', 'Sheriff', 'Legend'].map((rank, i) => (
                                    <div key={rank} className={`p-10 border ${i === 4 ? 'border-western-gold text-western-gold' : 'border-white/10 text-zinc-400'} text-center flex flex-col items-center justify-center gap-6 transition-all hover:border-western-gold/50 bg-gradient-to-b from-transparent to-white/[0.01]`}>
                                        <div className="w-20 h-20 md:w-28 md:h-28 opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 flex items-center justify-center bg-white/5 rounded-full">
                                            <Trophy className={`w-12 h-12 ${i === 4 ? 'text-western-gold' : 'text-zinc-500'}`} />
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase opacity-40 mb-2 tracking-[0.2em] font-mono">Tier 0{i + 1}</div>
                                            <div className="font-bold text-xl md:text-2xl font-technor tracking-tight uppercase leading-none">{rank}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white text-lg mb-4">Badges</h4>
                            <div className="flex flex-wrap gap-4">
                                {['Bug Slayer', 'Test Champion', 'Zero Rework', 'On-Time Closer', 'Helpful Human'].map((badge) => (
                                    <span key={badge} className="px-4 py-2 border border-white/10 rounded-full text-sm text-zinc-300 hover:border-[#D3E97A] hover:text-[#D3E97A] transition-colors cursor-default">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 md:py-48 px-8 md:px-32 lg:px-60 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-[#D3E97A]/5">
                <h2 className="text-4xl md:text-6xl font-technor font-bold text-white mb-8">
                    READY TO <span className="text-western-orange">DUEL?</span>
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light font-clash">
                    Join the top 1% of developers in the frontier.
                    Enter the arena and claim your glory.
                </p>
                <Link href="/duel">
                    <button className="text-sm font-bold bg-accent text-black px-8 py-4 rounded-full hover:bg-white transition-colors uppercase tracking-wide">
                        Enter Showdown
                    </button>
                </Link>
            </section>
        </div >
    );
};

export default ProjectShowcase; 
