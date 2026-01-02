'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AvatarUploadModal from "../../components/AvatarUploadModal";
import { Bell, Shield, User, Link as LinkIcon, Globe, Twitter, Github, Cpu, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Tab = 'general' | 'notifications' | 'accounts' | 'security';

export default function EditProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('general');
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isCommitting, setIsCommitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        portfolio_url: '',
        twitter_handle: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                bio: user.bio || '',
                portfolio_url: user.portfolio_url || '',
                twitter_handle: user.twitter_handle || ''
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCommit = async () => {
        setIsCommitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('Profile updated successfully');
                // You might want to show a toast or redirect
                window.location.href = '/profile';
            } else {
                console.error('Failed to update profile');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setIsCommitting(false);
        }
    };

    if (authLoading) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] flex items-center justify-center font-clash">
                <div className="w-12 h-12 border-2 border-[#D3E97A] border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
                    <h1 className="text-4xl font-technor font-bold uppercase">Signal Lost</h1>
                    <p className="text-zinc-500 max-w-sm">Unauthorized access detected. Please synchronize with GitHub to view this sector.</p>
                    <Link href="/">
                        <button className="px-8 py-3 bg-[#D3E97A] text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-full">
                            Return to Base
                        </button>
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Avatar Section */}
                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D3E97A]/20 bg-white/5">
                                    <img
                                        src={user.avatar_url || "https://github.com/placeholder.png"}
                                        alt="Current Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#D3E97A] rounded-full border-4 border-[#0A0A0A] flex items-center justify-center">
                                    <Cpu className="w-3 h-3 text-black" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Profile Identity</h4>
                                <p className="text-zinc-500 text-xs mb-4">Syncing with GitHub for avatar and metadata.</p>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    <button
                                        type="button"
                                        onClick={() => setIsAvatarModalOpen(true)}
                                        className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
                                    >
                                        Update Avatar
                                    </button>
                                    <button type="button" className="px-4 py-2 border border-red-900/50 text-red-500/80 text-[10px] font-bold tracking-widest uppercase hover:bg-red-500/10 transition-colors">Reset</button>
                                </div>
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Display Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-zinc-700 focus:border-[#D3E97A] outline-none transition-all uppercase font-technor font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Short Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Add a bio..."
                                    className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-zinc-700 focus:border-[#D3E97A] outline-none transition-all resize-none font-clash"
                                />
                                <p className="text-[10px] text-zinc-600 text-right uppercase tracking-widest">{140 - formData.bio.length} Characters Remaining</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <Globe className="w-3 h-3" />
                                        Portfolio URL
                                    </label>
                                    <input
                                        type="url"
                                        name="portfolio_url"
                                        value={formData.portfolio_url}
                                        onChange={handleInputChange}
                                        placeholder="https://yourportfolio.com"
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-zinc-700 focus:border-[#D3E97A] outline-none transition-all font-clash"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <Twitter className="w-3 h-3" />
                                        X / Twitter
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">@</span>
                                        <input
                                            type="text"
                                            name="twitter_handle"
                                            value={formData.twitter_handle}
                                            onChange={handleInputChange}
                                            placeholder="username"
                                            className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-white placeholder:text-zinc-700 focus:border-[#D3E97A] outline-none transition-all font-clash"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Email Notifications</h3>
                            <div className="space-y-6 text-xs uppercase tracking-wider font-medium">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">New Bounty Alerts</span>
                                    <div className="w-10 h-5 bg-[#D3E97A] rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(211,233,122,0.3)]">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">XP Milestone Rewards</span>
                                    <div className="w-10 h-5 bg-[#D3E97A] rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(211,233,122,0.3)]">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Platform Updates</span>
                                    <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Security Alerts</h3>
                            <div className="space-y-6 text-xs uppercase tracking-wider font-medium">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">New Login Detected</span>
                                    <div className="w-10 h-5 bg-[#D3E97A] rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(211,233,122,0.3)]">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'accounts':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                                    <Github className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-xs tracking-widest">GitHub</h4>
                                    <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-wider">Connected as @yugabharathi21</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-[#D3E97A] uppercase tracking-widest px-3 py-1 bg-[#D3E97A]/10 border border-[#D3E97A]/20 rounded-full">Primary</span>
                        </div>

                        <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl flex items-center justify-between opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer group">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#5865F2]/20 group-hover:border-[#5865F2]/40 transition-all">
                                    {/* Simple Discord Placeholder */}
                                    <svg className="w-6 h-6 fill-current text-white group-hover:text-[#5865F2]" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2">Discord <span className="text-[10px] text-zinc-600 font-normal">Coming Soon</span></h4>
                                    <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-wider">Sync roles with our Discord community</p>
                                </div>
                            </div>
                            <button className="px-6 py-2 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white group-hover:border-white/20 transition-all">Connect</button>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
                                <Shield className="w-4 h-4 text-[#D3E97A]" />
                                Authentication
                            </h3>
                            <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl flex items-center justify-between">
                                <div>
                                    <h4 className="text-white font-bold uppercase text-xs tracking-widest">Two-Factor Authentication</h4>
                                    <p className="text-zinc-500 text-[10px] mt-2 uppercase tracking-wider">Add an extra layer of security to your account.</p>
                                </div>
                                <button className="px-6 py-3 border border-white/10 text-[10px] font-bold text-[#D3E97A] uppercase tracking-widest hover:bg-[#D3E97A]/5 hover:border-[#D3E97A]/30 transition-all">Enable 2FA</button>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Sessions</h3>
                            <div className="space-y-4">
                                <div className="p-6 border border-white/5 bg-[#0A0A0A] rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                            <Cpu className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest">Chrome on Windows</h4>
                                            <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-wider">Current Session • 192.168.1.1</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#D3E97A] uppercase tracking-widest">This Device</span>
                                </div>
                                <div className="p-6 border border-white/5 bg-[#0A0A0A] rounded-2xl flex items-center justify-between opacity-60">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white rounded-md"></div>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest">Safari on iPhone</h4>
                                            <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-wider">Last Active 2 days ago • Chennai, IN</p>
                                        </div>
                                    </div>
                                    <button className="text-[9px] font-bold text-red-500 uppercase tracking-widest hover:text-red-400">Revoke</button>
                                </div>
                            </div>
                        </section>
                    </div>
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 mb-4 tracking-[0.2em] uppercase">
                            <Link href="/profile" className="hover:text-white transition-colors">PROFILE</Link>
                            <span className="text-[#D3E97A]">/</span>
                            <span className="text-white">SETTINGS</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-technor font-bold text-white tracking-tighter leading-none">
                            MOD<span className="text-[#D3E97A]">IFY</span><br />
                            <span className="text-zinc-800">IDENTITY.SYS</span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                        {/* Sidebar Tabs */}
                        <div className="lg:w-72 shrink-0">
                            <div className="sticky top-32 space-y-1">
                                {[
                                    { id: 'general', label: '01. General', icon: User },
                                    { id: 'notifications', label: '02. Notifications', icon: Bell },
                                    { id: 'accounts', label: '03. Connected', icon: LinkIcon },
                                    { id: 'security', label: '04. Security', icon: Shield },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as Tab)}
                                        className={`w-full p-4 flex items-center justify-between font-bold text-[10px] tracking-[0.2em] uppercase transition-all group ${activeTab === tab.id
                                            ? 'bg-[#D3E97A] text-black shadow-[0_0_30px_rgba(211,233,122,0.15)] translate-x-3'
                                            : 'text-zinc-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-zinc-600 group-hover:text-white'}`} />
                                            {tab.label}
                                        </div>
                                        {activeTab === tab.id && <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="flex-1 max-w-2xl min-h-[600px]">
                            {renderTabContent()}

                            {/* Action Buttons (Sticky at bottom maybe?) */}
                            <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-6 uppercase">
                                <button
                                    onClick={handleCommit}
                                    disabled={isCommitting}
                                    className="px-12 py-5 bg-[#D3E97A] text-black font-bold tracking-[0.2em] text-[10px] hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_10px_40px_rgba(211,233,122,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCommitting ? 'COMMITTING.SYS...' : 'Commit Changes'}
                                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                </button>
                                <Link
                                    href="/profile"
                                    className="px-12 py-5 border border-white/10 text-white font-bold tracking-[0.2em] text-[10px] hover:bg-white/5 transition-colors text-center"
                                >
                                    Discard.EXE
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <AvatarUploadModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                currentAvatar="https://github.com/Yugabharathi21.png"
            />
        </main>
    );
}
