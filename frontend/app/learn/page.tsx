'use client';

import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    GitPullRequest,
    Search,
    DollarSign,
    BookOpen,
    Terminal,
    Github,
    Share2,
    Code2,
    CheckCircle2,
    AlertCircle,
    GitMerge,
    Shield,
    FileText
} from 'lucide-react';

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <header className="mb-20 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D3E97A]/10 text-[#D3E97A] text-xs font-bold uppercase tracking-wider mb-6 border border-[#D3E97A]/20">
                            <BookOpen size={14} />
                            Documentation
                        </div>
                        <h1 className="text-4xl md:text-7xl font-technor font-bold text-white mb-6 uppercase tracking-tighter">
                            Mastering the <span className="text-[#D3E97A]">Arena</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                            A comprehensive guide to understanding Competitive Coding, mastering your environment, and dominating the WANTED.git showdowns.
                        </p>
                    </header>

                    {/* Navigation / Table of Contents equivalent could go here, but keeping it scrollable for now */}

                    {/* Section 1: The Open Source Philosophy */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <Share2 className="text-[#D3E97A]" size={32} />
                            <h2 className="text-3xl font-bold text-white">The Duelist Creed</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6 text-zinc-400 leading-relaxed font-light">
                                <p>
                                    <strong className="text-white font-medium">Competitive Coding</strong> is the ultimate frontier of software engineering. It's not just about solving a problem; it's about solving it faster, cleaner, and more efficiently than anyone else.
                                </p>
                                <p>
                                    In the WANTED.git arena, we value transparency, meritocracy, and raw skill. Whether you are practicing in Solo mode or staking your reputation in a Duel, you are part of a global elite pushing the boundaries of what code can achieve. This isn't just a platform—it's your legacy.
                                </p>
                            </div>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                    <CheckCircle2 size={20} className="text-[#D3E97A]" />
                                    Key Benefits
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Precision", desc: "Pass 100% of test cases under pressure." },
                                        { title: "Speed", desc: "Outpace your opponents in real-time showdowns." },
                                        { title: "Efficiency", desc: "Optimize memory and execution time." },
                                        { title: "Reputation", desc: "Climb the ranks and earn your legendary badge." }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2.5 shrink-0"></div>
                                            <div>
                                                <strong className="text-zinc-200 block">{item.title}</strong>
                                                <span className="text-zinc-500 text-sm">{item.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Git Deep Dive */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <Terminal className="text-[#D3E97A]" size={32} />
                            <h2 className="text-3xl font-bold text-white">The Duelist's Tools</h2>
                        </div>

                        <p className="text-zinc-400 mb-8 max-w-3xl">
                            While the arena provides a built-in editor, elite gunslingers often maintain their own local arsenal using Git. Here is how you manage your code history.
                        </p>

                        <div className="space-y-8">
                            {/* Command Group 1: Setup */}
                            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                                <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                                    <span className="font-mono text-sm text-[#D3E97A]">01. Initialization & Setup</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Configuration</h4>
                                            <p className="text-sm text-zinc-500">Set your identity for commits.</p>
                                        </div>
                                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs md:text-sm text-zinc-300 border border-white/5">
                                            <div className="mb-2"><span className="text-purple-400">git</span> config --global user.name <span className="text-green-400">"Your Name"</span></div>
                                            <div><span className="text-purple-400">git</span> config --global user.email <span className="text-green-400">"you@example.com"</span></div>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Cloning</h4>
                                            <p className="text-sm text-zinc-500">Download a repository from GitHub.</p>
                                        </div>
                                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs md:text-sm text-zinc-300 border border-white/5">
                                            <div><span className="text-purple-400">git</span> clone https://github.com/username/repo.git</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Command Group 2: Workflow */}
                            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                                <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                                    <span className="font-mono text-sm text-[#D3E97A]">02. The Contribution Cycle</span>
                                </div>
                                <div className="p-6 space-y-6">
                                    {[
                                        { cmd: "git checkout -b feature/new-page", desc: "Create and switch to a new branch for your work.", label: "Branching" },
                                        { cmd: "git status", desc: "Check which files have been modified.", label: "Inspection" },
                                        { cmd: "git add .", desc: "Stage all modified files for commit.", label: "Staging" },
                                        { cmd: "git commit -m \"feat: Add learn page\"", desc: "Save your changes with a descriptive message.", label: "Committing" },
                                        { cmd: "git push origin feature/new-page", desc: "Upload your branch to the remote repository.", label: "Pushing" }
                                    ].map((item, i) => (
                                        <div key={i} className="grid md:grid-cols-[1fr_2fr] gap-6 border-b border-white/5 last:border-0 pb-6 last:pb-0">
                                            <div>
                                                <h4 className="text-white font-bold mb-1">{item.label}</h4>
                                                <p className="text-sm text-zinc-500">{item.desc}</p>
                                            </div>
                                            <div className="bg-black/50 p-4 rounded-lg flex items-center font-mono text-xs md:text-sm text-zinc-300 border border-white/5">
                                                <span className="text-zinc-500 mr-2">$</span>
                                                {item.cmd}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Advanced Git Operations */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <GitMerge className="text-[#D3E97A]" size={32} />
                            <h2 className="text-3xl font-bold text-white">Advanced Git Operations</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Rebasing vs. Merging</h3>
                                <p className="text-zinc-400 text-sm mb-6">
                                    While merging preserves history exactly as it happened, rebasing rewrites history to create a linear progression. Use rebase to keep your feature branch clean before merging into main.
                                </p>
                                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-zinc-300 border border-white/5 mb-4">
                                    <div className="mb-2"><span className="text-zinc-500"># Updates your branch with main's latest changes</span></div>
                                    <div><span className="text-purple-400">git</span> pull --rebase origin main</div>
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Stashing</h3>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Need to switch branches but have uncommitted changes? Stash them to save a dirty working directory for later.
                                </p>
                                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-zinc-300 border border-white/5 mb-4 space-y-2">
                                    <div><span className="text-purple-400">git</span> stash save "WIP: login fix"</div>
                                    <div><span className="text-purple-400">git</span> stash pop</div>
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Cherry Picking</h3>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Apply the changes introduced by some existing commits to your current branch. Useful for grabbing specific fixes.
                                </p>
                                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-zinc-300 border border-white/5 mb-4">
                                    <div><span className="text-purple-400">git</span> cherry-pick &lt;commit-hash&gt;</div>
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Resetting</h3>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Undo changes. Soft reset keeps changes staged; hard reset discards them entirely.
                                </p>
                                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-zinc-300 border border-white/5 mb-4 space-y-2">
                                    <div><span className="text-purple-400">git</span> reset --soft HEAD~1</div>
                                    <div><span className="text-purple-400">git</span> reset --hard HEAD~1</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Best Practices & Licensing */}
                    <section className="mb-24">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                    <Shield className="text-[#D3E97A]" size={32} />
                                    <h2 className="text-2xl font-bold text-white">Best Practices</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                                        <h4 className="font-bold text-white mb-2">Conventional Commits</h4>
                                        <p className="text-sm text-zinc-400 mb-4">Structure your commit messages to be machine-readable and descriptive.</p>
                                        <ul className="space-y-2 text-xs font-mono text-zinc-500">
                                            <li><span className="text-[#D3E97A]">feat:</span> add new login page</li>
                                            <li><span className="text-[#D3E97A]">fix:</span> resolve hydration error</li>
                                            <li><span className="text-[#D3E97A]">docs:</span> update readme</li>
                                            <li><span className="text-[#D3E97A]">refactor:</span> cleanup auth logic</li>
                                        </ul>
                                    </div>
                                    <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                                        <h4 className="font-bold text-white mb-2">.gitignore</h4>
                                        <p className="text-sm text-zinc-400">Always explicitly ignore `node_modules`, `.env` files, and build artifacts to keep the repo clean and secure.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                    <FileText className="text-[#D3E97A]" size={32} />
                                    <h2 className="text-2xl font-bold text-white">Licensing 101</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 border border-zinc-800 rounded-lg hover:border-[#D3E97A]/50 transition-colors">
                                        <h4 className="font-bold text-white mb-1">MIT License</h4>
                                        <p className="text-xs text-zinc-400">Permissive. Users can do anything with the code as long as they include the original copyright.</p>
                                    </div>
                                    <div className="p-4 border border-zinc-800 rounded-lg hover:border-[#D3E97A]/50 transition-colors">
                                        <h4 className="font-bold text-white mb-1">Apache 2.0</h4>
                                        <p className="text-xs text-zinc-400">Permissive like MIT, but also provides an express grant of patent rights from contributors to users.</p>
                                    </div>
                                    <div className="p-4 border border-zinc-800 rounded-lg hover:border-[#D3E97A]/50 transition-colors">
                                        <h4 className="font-bold text-white mb-1">GPL v3</h4>
                                        <p className="text-xs text-zinc-400">Copyleft. If you distribute your software based on GPL code, your software must also be GPL (open source). "Viral" license.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: WANTED.git Workflow */}
                    <section>
                        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-4">
                            <Github className="text-[#D3E97A]" size={32} />
                            <h2 className="text-3xl font-bold text-white">The Arena Workflow</h2>
                        </div>

                        <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-16">

                            {/* Step 1 */}
                            <div className="relative pl-8 md:pl-16">
                                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-[#060606] border-2 border-[#D3E97A]"></div>
                                <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#D3E97A]/30 transition-all group">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-[#D3E97A] font-mono text-sm font-bold tracking-widest uppercase mb-2 block">Step 01</span>
                                            <h3 className="text-2xl font-bold text-white">Enter the Arena</h3>
                                        </div>
                                        <div className="p-3 bg-[#D3E97A]/10 rounded-lg text-[#D3E97A]">
                                            <Search size={24} />
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 mb-6 leading-relaxed">
                                        Choose your mode: <strong>Solo</strong> for practice or <strong>Duel</strong> for real-time head-to-head competition. Our matchmaking system will find an opponent of similar rank for duels.
                                    </p>
                                    <div className="flex gap-2 text-xs">
                                        <span className="bg-[#222] px-3 py-1 rounded text-zinc-400">Matchmaking</span>
                                        <span className="bg-[#222] px-3 py-1 rounded text-zinc-400">Elo Ranking</span>
                                        <span className="bg-[#222] px-3 py-1 rounded text-zinc-400">Real-time</span>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative pl-8 md:pl-16">
                                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-[#060606] border-2 border-zinc-700 group-hover:border-[#D3E97A]"></div>
                                <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#D3E97A]/30 transition-all group">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-[#D3E97A] font-mono text-sm font-bold tracking-widest uppercase mb-2 block">Step 02</span>
                                            <h3 className="text-2xl font-bold text-white">Code Against the Clock</h3>
                                        </div>
                                        <div className="p-3 bg-[#D3E97A]/10 rounded-lg text-[#D3E97A]">
                                            <Code2 size={24} />
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 mb-6 leading-relaxed">
                                        Use our built-in Monaco editor to solve the challenge. You are scored based on <strong>correctness</strong> (60%), <strong>efficiency</strong> (25%), and <strong>speed</strong> (15%).
                                    </p>
                                    <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle size={16} className="text-[#D3E97A] mt-1 shrink-0" />
                                            <p className="text-sm text-zinc-400">
                                                <strong>Pro Tip:</strong> Anti-cheat is active. Copy-pasting is disabled during live duels to ensure a fair showdown.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative pl-8 md:pl-16">
                                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-[#060606] border-2 border-zinc-700 group-hover:border-[#D3E97A]"></div>
                                <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#D3E97A]/30 transition-all group">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-[#D3E97A] font-mono text-sm font-bold tracking-widest uppercase mb-2 block">Step 03</span>
                                            <h3 className="text-2xl font-bold text-white">Submit for Verdict</h3>
                                        </div>
                                        <div className="p-3 bg-[#D3E97A]/10 rounded-lg text-[#D3E97A]">
                                            <GitPullRequest size={24} />
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 leading-relaxed">
                                        Once your solution is ready, hit <strong>Submit</strong>. Our automated judging engine will run your code against a series of test cases in a secure sandbox.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative pl-8 md:pl-16">
                                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-[#060606] border-2 border-zinc-700 group-hover:border-[#D3E97A]"></div>
                                <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#D3E97A]/30 transition-all group">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-[#D3E97A] font-mono text-sm font-bold tracking-widest uppercase mb-2 block">Step 04</span>
                                            <h3 className="text-2xl font-bold text-white">Claim Glory & Rewards</h3>
                                        </div>
                                        <div className="p-3 bg-[#D3E97A]/10 rounded-lg text-[#D3E97A]">
                                            <DollarSign size={24} />
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 leading-relaxed">
                                        Earn XP to climb the ranks from <strong>Rookie</strong> to <strong>Legend</strong>. High-tier duelists also earn Credits (CR) which can be used for platform perks or redeemed for real-world rewards.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
}
