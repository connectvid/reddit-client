// external imports
import { configureStore } from '@reduxjs/toolkit';

// internal imports
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import menuSlice from 'features/menu/menuSlice';
import planSlice from 'features/plan/plan';
import projectSlice from 'features/project/projectSlice';
import subscriptionSlice from 'features/subscription/subscriptionSlice';
// import scrapResultsSlice from 'features/scrap/scrapSlice';
import snackbarSlice from 'features/snackbar/snackbar';
// import cartSlice from 'features/cart/cart';

// configure app store
const store = configureStore({
    reducer: {
        auth: authSlice,
        menu: menuSlice,
        snackbar: snackbarSlice,
        project: projectSlice,
        plan: planSlice,
        subscription: subscriptionSlice,
        // scrapedResults: scrapResultsSlice,
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
