import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import courseReducer from './slices/courseSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'], // Only persist auth state
};

const profilePersistConfig = {
    key: 'profile',
    storage: AsyncStorage,
};

const coursePersistConfig = {
    key: 'courses',
    storage: AsyncStorage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProfileReducer = persistReducer(profilePersistConfig, profileReducer);
const persistedCourseReducer = persistReducer(coursePersistConfig, courseReducer);


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        profile: persistedProfileReducer,
        courses: persistedCourseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
