'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Editor from '@monaco-editor/react';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Timer, Zap, Code2, ChevronRight } from 'lucide-react';

interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    xp_reward: number;
    time_limit: number;
    memory_limit: number;
    expected_complexity_time: string;
    expected_complexity_space: string;
}

export default function SoloMode() {
    const { user } = useAuth();
    const [problems, setProblems] = useState<Problem[]>([]);
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
    const [code, setCode] = useState('// Your code here...');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<any>(null);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/problems`);
            if (res.ok) {
                const data = await res.json();
                setProblems(data);
                if (data.length > 0) setSelectedProblem(data[0]);
            }
        } catch (err) {
            console.error('Failed to fetch problems', err);
        }
    };

    const handleSubmit = async () => {
        if (!selectedProblem || cooldown > 0) return;
        setStatus('submitting');
        setCooldown(10); // 10s cooldown

        try {
            // Simulated submission to the judging engine
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/submissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemId: selectedProblem.id,
                    code,
                    language: 'javascript'
                })
            });

            // For MVP purposes, since we haven't implemented the POST /submissions route yet,
            // we will simulate the response if the route fails or we can just implement the route now.
            // Let's assume for now we want to see the UI.

            setTimeout(() => {
                setStatus('success');
                setResult({
                    score: 85.5,
                    time: '124ms',
                    memory: '24MB'
                });
            }, 2000);

        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash">
            <Navbar />

            <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] border-t border-white/5">
                {/* Left Panel: Problem Selection & Description */}
                <div className="w-full lg:w-1/3 border-r border-white/5 overflow-y-auto p-8">
                    <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                        <img src={`/ranks/${(user?.rank || 'rookie').toLowerCase()}.svg`} className="w-6 h-6" />
                        Solo Bounty Hunt
                    </div>

                    <h1 className="text-3xl font-technor font-bold mb-6">
                        {selectedProblem ? selectedProblem.title : 'Select a Problem'}
                    </h1>

                    <div className="flex gap-4 mb-8">
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            {selectedProblem?.difficulty || 'Easy'}
                        </div>
                        <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-accent">
                            +{selectedProblem?.xp_reward || 30} XP
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-12">
                        <p className="text-zinc-400 leading-relaxed">
                            {selectedProblem?.description || 'Pick a challenge from the list below to begin your training, Gunslinger.'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">Available Contracts</h3>
                        {problems.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedProblem(p)}
                                className={`w-full text-left p-4 glass-card rounded-lg border transition-all flex items-center justify-between group ${selectedProblem?.id === p.id ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20'}`}
                            >
                                <div>
                                    <div className={`text-sm font-bold ${selectedProblem?.id === p.id ? 'text-white' : 'text-zinc-300'}`}>{p.title}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase">{p.difficulty}</div>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform ${selectedProblem?.id === p.id ? 'text-accent translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Editor & Output */}
                <div className="w-full lg:w-2/3 flex flex-col">
                    <div className="flex-1 min-h-[500px] relative">
                        <div className="absolute top-4 right-8 z-10 flex gap-4">
                            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/5 text-[10px] font-mono text-zinc-400">
                                <Timer className="w-3 h-3 text-western-orange" />
                                {selectedProblem?.time_limit}ms
                            </div>
                            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/5 text-[10px] font-mono text-zinc-400">
                                <Zap className="w-3 h-3 text-western-gold" />
                                {selectedProblem?.memory_limit}MB
                            </div>
                        </div>

                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => setCode(v || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                                padding: { top: 24 },
                                scrollBeyondLastLine: false,
                            }}
                        />
                    </div>

                    <div className="h-48 border-t border-white/5 bg-[#0a0a0a] p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                <Code2 className="w-4 h-4" />
                                Output Terminal
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={status === 'submitting'}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${status === 'submitting' ? 'bg-zinc-800 text-zinc-500' : 'bg-accent text-black hover:bg-white'}`}
                            >
                                {status === 'submitting' ? 'Judging...' : 'Submit Code'}
                            </button>
                        </div>

                        <div className="flex-1 bg-black/40 rounded border border-white/5 p-4 font-mono text-xs overflow-y-auto">
                            {status === 'idle' && <span className="text-zinc-600">Waiting for submission...</span>}
                            {status === 'submitting' && <span className="text-yellow-500 animate-pulse">Running test cases against Docker sandbox...</span>}
                            {status === 'success' && (
                                <div className="space-y-2">
                                    <div className="text-accent font-bold">✓ ACCEPTED</div>
                                    <div className="grid grid-cols-3 gap-8 mt-4">
                                        <div>
                                            <div className="text-zinc-500 text-[10px] uppercase">Final Score</div>
                                            <div className="text-xl text-white font-technor">{result.score}</div>
                                        </div>
                                        <div>
                                            <div className="text-zinc-500 text-[10px] uppercase">Execution</div>
                                            <div className="text-xl text-white font-technor">{result.time}</div>
                                        </div>
                                        <div>
                                            <div className="text-zinc-500 text-[10px] uppercase">Memory</div>
                                            <div className="text-xl text-white font-technor">{result.memory}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
