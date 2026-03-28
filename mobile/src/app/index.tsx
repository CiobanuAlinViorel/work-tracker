// app/index.tsx
import { Text, View, Pressable } from 'react-native';
import { useAuth } from '../shared/contexts/AuthContext';


export default function HomeScreen() {
    const { session, isAuthenticated, isLoading, signIn, signOut } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading session...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-center gap-4 px-6">
            <Text>{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</Text>
            <Text>{session?.user.email ?? 'No user yet'}</Text>

            <Pressable
                className="rounded-xl bg-black px-4 py-3"
                onPress={() =>
                    signIn({
                        accessToken: 'demo-token',
                        user: {
                            id: '1',
                            email: 'demo@example.com',
                            username: 'Demo User',
                        },
                    })
                }
            >
                <Text className="text-white">Save demo session</Text>
            </Pressable>

            <Pressable
                className="rounded-xl bg-red-600 px-4 py-3"
                onPress={signOut}
            >
                <Text className="text-white">Clear session</Text>
            </Pressable>
        </View>
    );
}