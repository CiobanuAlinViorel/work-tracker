import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'current_session';

export type StoredSession = {
    accessToken: string;
    user: {
        id: string;
        email: string;
        username: string;
    }
};

export async function saveSession(session: StoredSession): Promise<void> {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function getSession(): Promise<StoredSession | null> {
    const session = await SecureStore.getItemAsync(SESSION_KEY);

    if (!session) {
        return null;
    }

    try {
        return JSON.parse(session) as StoredSession;
    } catch (error) {
        await SecureStore.deleteItemAsync(SESSION_KEY);
        return null;
    }
}

export async function clearSession(): Promise<void> {
    await SecureStore.deleteItemAsync(SESSION_KEY);
}