'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Editor from '@monaco-editor/react';
import { useAuth } from '@/context/AuthContext';
import { io, Socket } from 'socket.io-client';
import { Swords, Users, Zap, Shield, Timer, Loader2 } from 'lucide-react';

export default function DuelMode() {
    const { user } = useAuth();
    const [gameState, setGameState] = useState<'idle' | 'searching' | 'duel' | 'completed'>('idle');
    const [duelData, setDuelData] = useState<any>(null);
    const [opponent, setOpponent] = useState<any>(null);
    const [code, setCode] = useState('// Enter the arena...');
    const [results, setResults] = useState<any>([]);
    const [cooldown, setCooldown] = useState(0);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';
        socketRef.current = io(socketUrl, { withCredentials: true });

        socketRef.current.on('match_found', (data) => {
            setDuelData(data.duelId);
            setOpponent(data.opponent);
            setGameState('duel');
        });

        socketRef.current.on('submission_result', (data) => {
            setResults((prev: any) => [...prev, data]);
        });

        socketRef.current.on('duel_completed', (result) => {
            setGameState('completed');
            setDuelData((prev: any) => ({ ...prev, winner: result.winnerId }));
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const startMatchmaking = () => {
        if (!user) return;
        setGameState('searching');
        socketRef.current?.emit('join_matchmaking', {
            id: user.id,
            username: user.username,
            rank: user.rank,
            avatar_url: user.avatar_url
        });
    };

    const submitCode = () => {
        if (!duelData || !user || cooldown > 0) return;
        setCooldown(15); // 15s cooldown for duels
        socketRef.current?.emit('submit_code', {
            duelId: duelData,
            userId: user.id,
            code,
            problemId: 1 // Placeholder for MVP
        });
    };

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash">
            <Navbar />

            {gameState === 'idle' && (
                <div className="max-w-4xl mx-auto py-32 px-8 text-center">
                    <div className="w-20 h-20 bg-western-orange/10 border border-western-orange/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Swords className="w-10 h-10 text-western-orange" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-technor font-bold mb-6">THE SHOWDOWN</h1>
                    <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto font-light">
                        Face off against another Gunslinger in a real-time coding duel. Same problem, same clock, only one winner.
                    </p>
                    <button
                        onClick={startMatchmaking}
                        className="bg-western-orange text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105"
                    >
                        Enter Matchmaking
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
                        <div className="p-8 glass-card rounded-2xl border border-white/5">
                            <Zap className="w-6 h-6 text-western-gold mb-4" />
                            <h3 className="font-bold mb-2">Speed Matters</h3>
                            <p className="text-xs text-zinc-500">Fastest correct solution takes the lion's share of the points.</p>
                        </div>
                        <div className="p-8 glass-card rounded-2xl border border-white/5">
                            <Shield className="w-6 h-6 text-accent mb-4" />
                            <h3 className="font-bold mb-2">Fair Play</h3>
                            <p className="text-xs text-zinc-500">Anti-cheat systems ensure every duel is won on merit.</p>
                        </div>
                        <div className="p-8 glass-card rounded-2xl border border-white/5">
                            <Users className="w-6 h-6 text-blue-400 mb-4" />
                            <h3 className="font-bold mb-2">Rank Up</h3>
                            <p className="text-xs text-zinc-500">Defeat opponents near your rank to progress to Legend.</p>
                        </div>
                    </div>
                </div>
            )}

            {gameState === 'searching' && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
                    <div className="relative">
                        <div className="w-32 h-32 border-4 border-western-orange/20 rounded-full animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-12 h-12 text-western-orange animate-spin" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-technor font-bold mt-8 mb-2">FINDING OPPONENT...</h2>
                    <p className="text-zinc-500 text-sm animate-pulse">Searching for a worthy Gunsliger across the frontier</p>
                    <button
                        onClick={() => setGameState('idle')}
                        className="mt-12 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
                    >
                        Cancel Search
                    </button>
                </div>
            )}

            {gameState === 'duel' && (
                <div className="flex flex-col h-[calc(100vh-100px)]">
                    {/* Duel Header */}
                    <div className="h-20 border-b border-white/5 bg-black/40 px-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <img src={`/ranks/${(user?.rank || 'Rookie').toLowerCase()}.svg`} className="w-8 h-8" />
                                <img src={user?.avatar_url || ''} className="w-10 h-10 rounded-full border-2 border-accent" />
                                <div>
                                    <div className="text-xs font-bold">{user?.username}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase">{user?.rank}</div>
                                </div>
                            </div>
                            <div className="text-2xl font-technor font-bold text-white/20 mx-4 italic">VS</div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <div className="text-xs font-bold">{opponent?.username}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase">{opponent?.rank}</div>
                                </div>
                                <img src={opponent?.avatar_url || ''} className="w-10 h-10 rounded-full border-2 border-western-orange" />
                                <img src={`/ranks/${(opponent?.rank || 'Rookie').toLowerCase()}.svg`} className="w-8 h-8" />
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <div className="text-[10px] text-zinc-500 uppercase mb-1">Time Elapsed</div>
                                <div className="text-xl font-mono text-white">04:21</div>
                            </div>
                            <div className="h-10 w-px bg-white/10" />
                            <div className="text-center">
                                <div className="text-[10px] text-zinc-500 uppercase mb-1">Status</div>
                                <div className="text-xs font-bold text-western-gold animate-pulse">DUELING</div>
                            </div>
                        </div>

                        <button
                            onClick={submitCode}
                            className="bg-accent text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            Quick Draw (Submit)
                        </button>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        <div className="w-1/3 border-r border-white/5 p-8 overflow-y-auto">
                            <h2 className="text-xs font-bold text-western-orange uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                The Challenge
                            </h2>
                            <h1 className="text-2xl font-technor font-bold mb-6">Two Sum Showdown</h1>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live Activity</h3>
                                {results.map((res: any, i: number) => (
                                    <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded text-[10px] flex items-center justify-between">
                                        <span className="text-zinc-400">{res.userId === user?.id ? 'You' : opponent?.username} submitted</span>
                                        <span className={res.result.status === 'ACCEPTED' ? 'text-accent' : 'text-red-500'}>
                                            {res.result.status}
                                        </span>
                                    </div>
                                ))}
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded text-[10px] text-zinc-500 italic">
                                    Opponent is typing...
                                </div>
                            </div>
                        </div>

                        <div className="w-2/3">
                            <Editor
                                height="100%"
                                defaultLanguage="javascript"
                                theme="vs-dark"
                                value={code}
                                onMount={(editor) => {
                                    editor.onKeyDown((e) => {
                                        if ((e.ctrlKey || e.metaKey) && (e.code === 'KeyV' || e.code === 'KeyC')) {
                                            e.preventDefault();
                                            alert("Copy/Paste is disabled during duels! Draw your own code, partner.");
                                        }
                                    });
                                }}
                                onChange={(v) => setCode(v || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    padding: { top: 24 },
                                    fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {gameState === 'completed' && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-8">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${duelData?.winner === user?.id ? 'bg-accent/10 border-accent/20' : 'bg-red-500/10 border-red-500/20'} border`}>
                        <Trophy className={`w-12 h-12 ${duelData?.winner === user?.id ? 'text-accent' : 'text-zinc-500'}`} />
                    </div>
                    <h1 className="text-5xl font-technor font-bold mb-4">
                        {duelData?.winner === user?.id ? 'VICTORY' : 'DEFEAT'}
                    </h1>
                    <p className="text-zinc-400 mb-12 max-w-md">
                        {duelData?.winner === user?.id
                            ? "Splendid shooting, Gunslinger. Your rank and XP have been updated. The frontier will remember this day."
                            : "A tough break, but even the best gunfighters fall. Dust yourself off and head back to the saloon."}
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setGameState('idle')}
                            className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
                        >
                            Return to Saloon
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

function Trophy(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 22V18" />
            <path d="M14 22V18" />
            <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
        </svg>
    )
}
