import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 py-12 md:py-20 px-8 md:px-32 lg:px-60">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-2">
                    <div className="text-2xl font-technor font-bold tracking-tight text-white mb-6">
                        WANTED.git<span className="text-[10px] align-top ml-1 text-[#D3E97A]">BETA</span>
                    </div>
                    <p className="text-zinc-500 font-light text-sm max-w-sm">
                        The ultimate competitive coding arena.
                        Enter for Solo practice or Duel for Credits.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-6">Platform</h4>
                    <ul className="space-y-4 text-sm text-zinc-500">
                        <li><Link href="/solo" className="hover:text-[#D3E97A] transition-colors">Solo Mode</Link></li>
                        <li><Link href="/duel" className="hover:text-[#D3E97A] transition-colors">Duel Mode</Link></li>
                        <li><Link href="/leaderboard" className="hover:text-[#D3E97A] transition-colors">Leaderboard</Link></li>
                        <li><Link href="/rules" className="hover:text-[#D3E97A] transition-colors">Platform Rules</Link></li>
                        <li><Link href="/learn" className="hover:text-[#D3E97A] transition-colors">Learn / Docs</Link></li>
                        <li><Link href="/sponsor" className="hover:text-[#D3E97A] transition-colors">Sponsors</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm text-zinc-500">
                        <li><Link href="/terms" className="hover:text-[#D3E97A] transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-[#D3E97A] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/conduct" className="hover:text-[#D3E97A] transition-colors">Code of Conduct</Link></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 pt-8 border-t border-white/5">
                <div>&copy; {new Date().getFullYear()} WANTED.git. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;
