'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, loading, login } = useAuth();

  return (
    <nav className="flex justify-between items-center py-8 px-8 md:px-32 lg:px-60 border-b border-white/5 sticky top-0 bg-[#060606]/80 backdrop-blur-md z-50">
      <Link href="/" className="text-2xl font-technor font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
        WANTED.git<span className="text-[10px] align-top ml-1 text-[#D3E97A]">BETA</span>
      </Link>

      <div className="hidden md:flex gap-12 text-sm font-medium text-zinc-400">
        <Link href="/solo" className="hover:text-white transition-colors cursor-pointer relative group">
          <span className="group-hover:text-accent transition-colors">Solo</span>
        </Link>
        <Link href="/duel" className="hover:text-white transition-colors cursor-pointer relative group">
          <span className="group-hover:text-western-orange transition-colors">Duel</span>
        </Link>
        <Link href="/leaderboard" className="hover:text-white transition-colors cursor-pointer relative group">
          <span className="group-hover:text-accent transition-colors">Leaderboard</span>
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        ) : user ? (
          <Link href="/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white group-hover:text-[#D3E97A] transition-colors">{user.username}</p>
              <p className="text-[10px] text-zinc-500">{user.rank}</p>
            </div>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.username} className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#D3E97A] transition-colors" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#D3E97A] text-black flex items-center justify-center font-bold text-xs">
                {user.username[0].toUpperCase()}
              </div>
            )}
          </Link>
        ) : (
          <button
            onClick={login}
            className="text-xs font-bold bg-[#D3E97A] text-black px-4 py-2 rounded-full hover:bg-white transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Connect Github
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
