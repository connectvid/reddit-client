// external imports
import { configureStore } from '@reduxjs/toolkit';

// internal imports
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import menuSlice from 'features/menu/menuSlice';
import planSlice from 'features/plan/plan';
import projectSlice from 'features/project/projectSlice';
import promptSlice from 'features/prompt/promptSlice';
import subscriptionSlice from 'features/subscription/subscriptionSlice';
import mentionSlice from 'features/mention/mentionSlice';
import aiModelSlice from 'features/ai-model/aiModelSlice';
import snackbarSlice from 'features/snackbar/snackbar';

// configure app store
const store = configureStore({
    reducer: {
        auth: authSlice,
        prompt: promptSlice,
        project: projectSlice,
        subscription: subscriptionSlice,
        mention: mentionSlice,
        aiModel: aiModelSlice,
        plan: planSlice,
        menu: menuSlice,
        snackbar: snackbarSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(apiSlice.middleware)
});

export const { dispatch } = store;
// export app store
export default store;
