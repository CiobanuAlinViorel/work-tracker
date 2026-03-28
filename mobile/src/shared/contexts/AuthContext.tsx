import {
    createContext,
    useCallback,
    useContext,
    useState,
    useMemo,
    useEffect,
    use
} from 'react';

import {
    clearSession,
    saveSession,
    getSession,
    StoredSession
} from '../lib/session-storage';

type AuthContextValue = {
    session: StoredSession | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (session: StoredSession) => Promise<void>;
    signOut: () => Promise<void>;
    refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<StoredSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshSession = useCallback(async () => {
        setIsLoading(true);
        const storedSession = await getSession();
        setSession(storedSession);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    const signIn = useCallback(async (newSession: StoredSession) => {
        await saveSession(newSession);
        setSession(newSession);
    }, []);

    const signOut = useCallback(async () => {
        await clearSession();
        setSession(null);
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        session,
        isAuthenticated: !!session?.accessToken,
        isLoading,
        signIn,
        signOut,
        refreshSession
    }), [session, isLoading, signIn, signOut, refreshSession]);

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}