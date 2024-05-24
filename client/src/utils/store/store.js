import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './features/userSlice';
import themeSlice from './features/themeSlice';

const userPersistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['token'],
};

const themePersistConfig = {
    key: 'theme',
    storage: storage,
    whitelist: ['mode'],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userSlice),
    theme: persistReducer(themePersistConfig, themeSlice),
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });
};
