/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    subscription: null,
    loading: false
};

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        subscriptionInit(state) {
            Object.keys(initialState).map((k) => {
                state[k] = initialState[k];
            });
        },
        getSubscriptionLoading(state, { payload }) {
            state.loading = payload;
        },

        setSubsctription(state, { payload }) {
            state.subscription = payload.item;
        },
        setSubsctriptionCredits(state, { payload }) {
            // console.log(
            //     `========================================================================================================================`,
            //     payload
            // );
            const values = payload;
            const types = Object.keys(payload);

            // const { types = [], values = {} } = payload;
            const copy = JSON.parse(JSON.stringify(state.subscription || {}));
            if (!copy?.remainingCredit) {
                return;
            }
            const remCredit = { ...copy.remainingCredit };
            for (const type of types) {
                const val = remCredit[type];
                // console.log({ val });
                if (val !== 'Unlimited') {
                    const upVals = val + values[type];
                    remCredit[type] = upVals < 0 ? 0 : upVals;
                }
            }
            copy.remainingCredit = remCredit;
            // console.log({ copy }, remCredit);
            state.subscription = copy;
        },
        createKeywords(state, { payload }) {
            state.project = { ...state.project, Suggestedkeywords: [...state.project.Suggestedkeywords, ...payload.items] };
        }
    }
});

export const { hasError, createKeywords, getSubscriptionLoading, setSubsctription, setSubsctriptionCredits, subscriptionInit } =
    subscriptionSlice.actions;

export default subscriptionSlice.reducer;
