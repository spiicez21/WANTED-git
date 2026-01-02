'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth-ui';
import { auth } from '@/lib/auth';
import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <NeonAuthUIProvider authClient={auth}>
                {children}
            </NeonAuthUIProvider>
        </AuthProvider>
    );
}
