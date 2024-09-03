/* eslint-disable consistent-return */
import axios from 'utils/axios';
import { dispatch } from 'app/store';
import {
    hasError,
    clearError,
    promptInit,
    fetchPrompts,
    addNewPrompt,
    updatePrompt,
    updateLoading,
    createLoading,
    removePrompt,
    selectPrompt,
    getLoading,
    loading,
    singlePrompt,
    created,
    updated,
    deleted,
    deleteLoading
} from './promptSlice'; // Import actions from the slice

// import { subsctriptionCreditsSetter } from 'features/subscription/subscriptionActions';
import errorMsgHelper from 'utils/errorMsgHelper';

export const changePrompt = (id) => () => {
    dispatch(selectPrompt(id));
};
export const initializePrompt = (value) => () => {
    dispatch(promptInit(value));
};

export const clearingError = () => () => {
    dispatch(clearError());
};

export const fetchPromptsLoader = (v) => () => {
    dispatch(loading(v));
};

export const getPromptsAPI = (token) => async () => {
    try {
        fetchPromptsLoader(true)();
        const response = await axios.get(`reply-prompts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(fetchPrompts(response.data));
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));

        fetchPromptsLoader(false)();
    }
};

export const fetchPromptLoader = (v) => () => {
    dispatch(getLoading(v));
};

export const getPromptAPI = (userId, token) => async () => {
    try {
        fetchPromptLoader(true)();
        const response = await axios.get(`reply-prompts/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(singlePrompt(response.data));
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        fetchPromptLoader(false)();
    }
};

export const createPromptLoader = (v) => () => {
    dispatch(createLoading(v));
};

export const createPromptStatus = (v) => () => {
    dispatch(created(v));
};

export const addPromptAPI =
    (token, data = {}) =>
    async () => {
        try {
            createPromptLoader(true)();
            const response = await axios.post(`reply-prompts`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(addNewPrompt(response.data));
            // subsctriptionCreditsSetter({ Prompts: -1 })();

            // dispatch(togglePromptCreateModal(false));
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            createPromptLoader(false)();
        }
    };

export const setUpdatePromptLoading = (v) => () => {
    dispatch(selectPrompt(v));
};
export const updatePromptLoader = (v) => () => {
    dispatch(updateLoading(v));
};

export const updatePromptStatus = (v) => () => {
    dispatch(updated(v));
};

export const updatePromptAPI =
    (token, id, data = {}) =>
    async () => {
        try {
            updatePromptLoader(true)();
            const response = await axios.put(`reply-prompts/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(updatePrompt(response.data));
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
        }
    };

export const deletePromptLoader = (v) => () => {
    dispatch(deleteLoading(v));
};

export const deletePromptStatus = (v) => () => {
    dispatch(deleted(v));
};

export const deletePromptAPI = (token, id) => async () => {
    try {
        deletePromptLoader(true)();
        await axios.delete(`reply-prompts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(removePrompt({ id }));
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        deletePromptLoader(false)();
    }
};
