/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
// import { fetchAllprompts } from './promptActions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    prompts: [],
    selectedPrompt: null,
    prompt: null,
    loading: false,
    getLoading: false,
    createLoading: false,
    deleteLoading: false,
    updateLoading: false,
    created: false,
    updated: false,
    deleted: false,
    showPromptsList: false,
    showPromptCreateModal: false
};

export const getItem = ({ findBy = '_id', findKey = '', datas = [] }) => {
    if (!findBy || !findKey) return null;
    let data = null;
    for (const item of datas) {
        if (item[findBy] === findKey) {
            data = item;
            break;
        }
    }
    return data;
};

const promptSlice = createSlice({
    name: 'prompt',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        promptInit(state) {
            Object.keys(initialState).map((k) => {
                state[k] = initialState[k];
            });
        },
        loading(state, { payload }) {
            state.loading = payload;
        },
        getLoading(state, { payload }) {
            state.getLoading = payload;
        },
        fetchPrompts(state, { payload }) {
            const items = payload.items;
            state.prompts = items;

            if (!state.selectedPrompt) {
                const firstItem = items?.[0];
                if (firstItem) {
                    state.selectedPrompt = firstItem;
                }
            }
            state.loading = false;
        },
        createLoading(state, { payload }) {
            state.createLoading = payload;
        },
        addNewPrompt(state, { payload }) {
            const { item } = payload;
            if (!state?.selectedPrompt) {
                state.selectedPrompt = item;
            }
            state.prompts = [item, ...state.prompts];
            state.createLoading = false;
            state.created = true;
        },
        created(state, { payload }) {
            state.created = payload;
        },
        updated(state, { payload }) {
            state.updated = payload;
        },
        deleted(state, { payload }) {
            state.deleted = payload;
        },
        singlePrompt(state, { payload }) {
            const { item } = payload;
            state.prompt = item;
            state.getLoading = false;
        },
        selectPrompt(state, { payload }) {
            state.selectedPrompt = state.prompts.find((i) => i._id === payload);
        },
        updateLoading(state, { payload }) {
            state.updateLoading = payload;
        },

        updatePrompt(state, { payload }) {
            const { item } = payload;
            state.prompts = state.prompts.map((prompt) => {
                if (prompt._id === item._id) {
                    return { ...prompt, ...item };
                }
                return prompt;
            });
            if (state.selectedPrompt?._id === item._id) {
                state.selectedPrompt = { ...state.selectedPrompt, ...item };
            }
            state.updateLoading = false;
            state.updated = true;
        },
        deleteLoading(state, { payload }) {
            state.deleteLoading = payload;
        },

        removePrompt(state, { payload }) {
            const { id } = payload;
            const items = state.prompts.filter((item) => item._id !== id);
            state.prompts = items;
            const firstItem = items?.[0];

            if (state.selectedPrompt?._id === id) {
                if (firstItem) {
                    state.selectedPrompt = firstItem;
                } else {
                    state.selectedPrompt = null;
                }
            }
            state.deleteLoading = false;
            state.deleted = false;
        }
    }
});

export const {
    hasError,
    clearError,
    promptInit,
    fetchPrompts,
    addNewPrompt,
    updatePrompt,
    updateLoading,
    createLoading,
    deleteLoading,
    removePrompt,
    selectPrompt,
    getLoading,
    loading,
    singlePrompt,
    created,
    updated,
    deleted
} = promptSlice.actions;

export default promptSlice.reducer;
