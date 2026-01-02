'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: number;
    github_id: string;
    username: string;
    email: string | null;
    avatar_url: string | null;
    xp: number;
    rank: string;
    wallet_balance: string;
    bio: string | null;
    portfolio_url: string | null;
    twitter_handle: string | null;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            console.log('AuthContext: Fetching user...');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/auth/me`, {
                credentials: 'include',
            });
            console.log('AuthContext: Fetch status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('AuthContext: User data received:', data.username);
                setUser(data);
            } else {
                console.log('AuthContext: Not authenticated');
                setUser(null);
            }
        } catch (err) {
            console.error('AuthContext: Failed to fetch user', err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/auth/github`;
    };

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/auth/logout`, {
                credentials: 'include',
            });
            setUser(null);
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
