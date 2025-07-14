import { configureStore } from '@reduxjs/toolkit';
import {postReducer} from './slices/postSlice';

export const store = configureStore({
    reducer: {
        posts: postReducer,
    },
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']