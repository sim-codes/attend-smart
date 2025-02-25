import { Storage } from 'redux-persist';
import { Platform } from 'react-native';

let storage: Storage;

if (Platform.OS === 'web') {
    const createWebStorage = () => {
        try {
        if (typeof window !== 'undefined' &&
            window?.localStorage) {
            return require('redux-persist/lib/storage').default;
            }

        return {
            getItem: (_key: string) => Promise.resolve(null),
            setItem: (_key: string, _value: string) => Promise.resolve(),
            removeItem: (_key: string) => Promise.resolve()
        };
        } catch (error) {
        console.error('Web storage error:', error);
        return {
            getItem: (_key: string) => Promise.resolve(null),
            setItem: (_key: string, _value: string) => Promise.resolve(),
            removeItem: (_key: string) => Promise.resolve()
        };
        }
    };

    storage = createWebStorage();
} else {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;

    storage = {
        getItem: async (key: string): Promise<string | null> => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('Error getting item from AsyncStorage:', error);
            return null;
        }
        },
        setItem: async (key: string, value: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting item in AsyncStorage:', error);
        }
        },
        removeItem: async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from AsyncStorage:', error);
        }
        }
    };
}

export default storage;
