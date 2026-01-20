import Link from 'next/link';
import React from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col uppercase">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square border border-white/5 rounded-full pointer-events-none -z-10 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-square border border-[#D3E97A]/5 rounded-full pointer-events-none -z-10"></div>

                {/* 404 Content */}
                <div className="mb-8">
                    <div className="text-[10px] font-bold text-[#D3E97A] mb-4 tracking-[0.2em]">ERROR CODE: 404 // SIGNAL INTERRUPTED</div>
                    <h1 className="text-7xl md:text-9xl font-technor font-bold text-white tracking-tighter mb-4">
                        TARGET <br />
                        <span className="text-[#D3E97A] opacity-50">NOT FOUND</span>
                    </h1>
                </div>

                <p className="text-zinc-500 max-w-md mb-12 lowercase leading-relaxed normal-case">
                    The requested data packet has been lost in the void or moving target has escaped. Check the coordinates and try again.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-[#D3E97A] text-black font-bold tracking-widest text-sm hover:scale-105 transition-transform"
                    >
                        EXTRACT TO HOME
                    </Link>
                    <Link
                        href="/duel"
                        className="px-8 py-4 border border-white/10 text-white font-bold tracking-widest text-sm hover:bg-white/5 transition-colors"
                    >
                        ENTER SHOWDOWN
                    </Link>
                </div>

            </div>

            <Footer />
        </main>
    );
}
