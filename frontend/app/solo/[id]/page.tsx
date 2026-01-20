'use client';

import React, { useState, useEffect, use } from 'react';
import Navbar from '../../components/Navbar';
import Editor from '@monaco-editor/react';
import { useAuth } from '@/context/AuthContext';
import {
    Clock, Zap, Code2, ChevronLeft, Play,
    CheckCircle2, AlertCircle, Info, Lightbulb,
    Settings, Maximize2, RotateCcw, Timer as TimerIcon,
    ChevronDown, Terminal
} from 'lucide-react';
import Link from 'next/link';

interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    xp_reward: number;
    time_limit: number;
    memory_limit: number;
    test_cases?: { input: string; output: string }[];
    hints?: string[];
}

export default function ProblemDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [code, setCode] = useState('// Starting your hunt...');
    const [language, setLanguage] = useState('javascript');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<any>(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [activeTab, setActiveTab] = useState<'description' | 'testcases' | 'hints'>('description');
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/problems/${id}`);
            if (res.ok) {
                const data = await res.json();
                setProblem(data);
                // Mock test cases and hints if not present
                if (!data.test_cases) {
                    data.test_cases = [
                        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
                        { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
                    ];
                }
                if (!data.hints) {
                    data.hints = [
                        'Try using a Hash Map to store the complements.',
                        'The time complexity should be O(n).'
                    ];
                }
                setProblem(data);
                setDefaultCode(language);
            }
        } catch (err) {
            console.error('Failed to fetch problem', err);
        }
    };

    const setDefaultCode = (lang: string) => {
        const templates: { [key: string]: string } = {
            javascript: '// Write your JavaScript solution here\nfunction solve() {\n\n}',
            python: '# Write your Python solution here\ndef solve():\n    pass',
            cpp: '// Write your C++ solution here\n#include <iostream>\n\nint main() {\n    return 0;\n}',
            java: '// Write your Java solution here\npublic class Solution {\n    public static void main(String[] args) {\n\n    }\n}'
        };
        setCode(templates[lang] || '// Your code here...');
    };

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setDefaultCode(lang);
        setIsLanguageMenuOpen(false);
    };

    const handleSubmit = async (isSubmission: boolean) => {
        setStatus('submitting');
        try {
            // Simulated submission or testing
            setTimeout(() => {
                setStatus('success');
                setResult({
                    type: isSubmission ? 'submission' : 'test',
                    score: isSubmission ? 100 : undefined,
                    time: '45ms',
                    memory: '12.4MB',
                    passed: 5,
                    total: 5
                });
            }, 1500);
        } catch (err) {
            setStatus('error');
        }
    };

    const languages = [
        { id: 'javascript', name: 'JavaScript', icon: 'JS' },
        { id: 'python', name: 'Python', icon: 'PY' },
        { id: 'cpp', name: 'C++', icon: 'C++' },
        { id: 'java', name: 'Java', icon: 'JV' }
    ];

    if (!problem) return (
        <div className="min-h-screen bg-[#060606] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <main className="h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col overflow-hidden">
            <Navbar />

            {/* Header / Breadcrumbs */}
            <div className="bg-[#0a0a0a] border-y border-white/5 px-6 py-3 flex items-center justify-between z-30">
                <div className="flex items-center gap-4">
                    <Link href="/solo" className="text-zinc-500 hover:text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <div>
                        <span className="text-[10px] text-accent font-bold uppercase tracking-widest block leading-none mb-1">Bounty #{problem.id}</span>
                        <h1 className="text-sm font-bold text-white leading-none">{problem.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-none mr-2">
                        <TimerIcon className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-sm font-mono font-bold text-white">{formatTime(timeElapsed)}</span>
                    </div>

                    <button
                        onClick={() => handleSubmit(false)}
                        disabled={status === 'submitting'}
                        className="bg-white/5 border border-white/10 text-white px-6 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {status === 'submitting' ? (
                            <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Code2 className="w-3 h-3" />
                        )}
                        Run Tests
                    </button>

                    <button
                        onClick={() => handleSubmit(true)}
                        disabled={status === 'submitting'}
                        className="bg-accent text-black px-6 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {status === 'submitting' ? (
                            <>
                                <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                Judging...
                            </>
                        ) : (
                            <>
                                <Play className="w-3 h-3 fill-current" />
                                Submit Hunt
                            </>
                        )}
                    </button>
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Question Details */}
                <div className="w-1/3 border-r border-white/5 flex flex-col bg-[#080808]">
                    {/* Tabs */}
                    <div className="flex border-b border-white/5">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'description' ? 'border-accent text-accent bg-accent/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('testcases')}
                            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'testcases' ? 'border-accent text-accent bg-accent/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Test Cases
                        </button>
                        <button
                            onClick={() => setActiveTab('hints')}
                            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'hints' ? 'border-accent text-accent bg-accent/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Hints
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        {activeTab === 'description' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                                <div>
                                    <div className="flex gap-3 mb-6">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${problem.difficulty.toLowerCase() === 'easy' ? 'text-green-400 border-green-400/20 bg-green-400/5' :
                                            problem.difficulty.toLowerCase() === 'medium' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' :
                                                'text-red-400 border-red-400/20 bg-red-400/5'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border border-accent/20 text-accent bg-accent/5">
                                            +{problem.xp_reward} XP
                                        </span>
                                    </div>

                                    <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed">
                                        {problem.description}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/5">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-accent" />
                                        Constraints
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-3 text-xs text-zinc-500">
                                            <div className="w-1 h-1 rounded-full bg-accent"></div>
                                            Time Limit: {problem.time_limit}ms
                                        </li>
                                        <li className="flex items-center gap-3 text-xs text-zinc-500">
                                            <div className="w-1 h-1 rounded-full bg-accent"></div>
                                            Memory Limit: {problem.memory_limit}MB
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'testcases' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                                {problem.test_cases?.map((tc, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Case {idx + 1}</h4>
                                        <div className="space-y-2">
                                            <div className="bg-black border border-white/5 p-3 rounded">
                                                <div className="text-[9px] text-zinc-600 uppercase mb-1">Input</div>
                                                <code className="text-xs text-white break-all">{tc.input}</code>
                                            </div>
                                            <div className="bg-black border border-white/5 p-3 rounded">
                                                <div className="text-[9px] text-zinc-600 uppercase mb-1">Output</div>
                                                <code className="text-xs text-accent break-all">{tc.output}</code>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'hints' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                {problem.hints?.map((hint, idx) => (
                                    <div key={idx} className="bg-accent/5 border border-accent/10 p-4 rounded-none flex gap-4">
                                        <Lightbulb className="w-5 h-5 text-accent shrink-0" />
                                        <p className="text-xs text-zinc-300 leading-relaxed italic">
                                            {hint}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Left Footer: Success/Fail Indicator */}
                    <div className="p-6 border-t border-white/5 bg-black/40">
                        {status === 'success' ? (
                            <div className="flex items-center gap-4 text-accent">
                                <CheckCircle2 className="w-5 h-5" />
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider">Accepted</div>
                                    <div className="text-[10px] text-zinc-500">All cases passed in {result.time}</div>
                                </div>
                            </div>
                        ) : status === 'error' ? (
                            <div className="flex items-center gap-4 text-red-400">
                                <AlertCircle className="w-5 h-5" />
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider">Failed</div>
                                    <div className="text-[10px] text-zinc-500">Compilation or runtime error</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 text-zinc-500">
                                <Info className="w-5 h-5" />
                                <div className="text-[10px] font-medium italic">Ready for trial, Gunslinger.</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Editor & Output */}
                <div className="flex-1 flex flex-col relative">
                    {/* Editor Toolbar */}
                    <div className="bg-[#0a0a0a] border-b border-white/5 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <button
                                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:border-accent/40 transition-all rounded transition-colors"
                                >
                                    <Code2 className="w-3.5 h-3.5 text-accent" />
                                    {languages.find(l => l.id === language)?.name}
                                    <ChevronDown className="w-3 h-3" />
                                </button>

                                {isLanguageMenuOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#121212] border border-white/10 z-50 shadow-2xl py-1">
                                        {languages.map(l => (
                                            <button
                                                key={l.id}
                                                onClick={() => handleLanguageChange(l.id)}
                                                className={`w-full text-left px-4 py-2 text-xs hover:bg-accent/10 transition-colors flex items-center justify-between ${language === l.id ? 'text-accent bg-accent/5' : 'text-zinc-400'}`}
                                            >
                                                {l.name}
                                                <span className="text-[9px] opacity-40">{l.icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

                            <button
                                onClick={() => setDefaultCode(language)}
                                className="p-2 text-zinc-500 hover:text-white transition-colors"
                                title="Reset Code"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 relative">
                        <Editor
                            height="100%"
                            language={language === 'cpp' ? 'cpp' : language}
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => setCode(v || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                fixedOverflowWidgets: true,
                                cursorStyle: 'block',
                                lineNumbersMinChars: 3,
                                renderLineHighlight: 'all',
                                hideCursorInOverviewRuler: true,
                                overviewRulerBorder: false,
                            }}
                        />
                    </div>

                    {/* Console / Output Area */}
                    <div className="h-1/3 border-t border-white/5 bg-[#060606] flex flex-col">
                        <div className="flex items-center gap-2 px-6 py-2 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            <Terminal className="w-3.5 h-3.5" />
                            Console Output
                        </div>
                        <div className="flex-1 p-6 font-mono text-xs overflow-y-auto custom-scrollbar">
                            {status === 'idle' && (
                                <div className="text-zinc-700 italic">No output yet. Run your hunt to see results.</div>
                            )}
                            {status === 'submitting' && (
                                <div className="flex flex-col gap-2">
                                    <div className="text-yellow-500 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                                        Compiling dependencies...
                                    </div>
                                    <div className="text-zinc-500 animate-pulse delay-75">Executing test cases in secure sandbox...</div>
                                </div>
                            )}
                            {status === 'success' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-accent/20 pb-4">
                                        <div className="text-accent font-bold text-sm tracking-widest">{`>>`} MISSION ACCOMPLISHED</div>
                                        <div className="text-[10px] px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent uppercase font-bold tracking-wider">Status: ACCEPTED</div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-8">
                                        <div>
                                            <div className="text-[9px] text-zinc-500 uppercase mb-1">Test Cases</div>
                                            <div className="text-lg text-white font-bold">{result.passed} / {result.total}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-zinc-500 uppercase mb-1">Execution</div>
                                            <div className="text-lg text-white font-bold">{result.time}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-zinc-500 uppercase mb-1">Memory</div>
                                            <div className="text-lg text-white font-bold">{result.memory}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-zinc-500 uppercase mb-1">XP Earned</div>
                                            <div className="text-lg text-accent font-bold">+{problem.xp_reward}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 text-zinc-500 text-[10px] italic">
                                        Session log recorded. Reward will be added to your badge cabinet.
                                    </div>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="text-red-400 space-y-2">
                                    <div className="font-bold underline">{`>>`} RUNTIME ERROR</div>
                                    <div className="bg-red-500/5 p-4 border border-red-400/10 text-red-500/80 leading-relaxed font-mono">
                                        Error: Uncaught ReferenceError: x is not defined<br />
                                        &nbsp;&nbsp;at solve (solution.js:5:12)<br />
                                        &nbsp;&nbsp;at Object.&lt;anonymous&gt; (solution.js:10:1)
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global UI Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </main>
    );
}
