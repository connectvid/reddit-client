/* eslint-disable consistent-return */
import axios from 'utils/axios';
import { dispatch } from 'app/store';
import {
    loadingCotrl,
    fetchProjects,
    hasError,
    toggleShowProjectsList,
    setSingleProjectSelectSuccess,
    addProjectLoading,
    toggleProjectCreateModal,
    addNewProject,
    updateProject,
    addKeywordForSave,
    createKeywordsLoading,
    createKeywords,
    createKeywordSuccess,
    projectCreated,
    projectRemove,
    removeKeywordForSave,
    removeCustomKeywordForSave,
    addCustomKeywordForSave,
    selectedPlatform,
    updateProjectLoading,
    updateProjectSuccess,
    projectInit,
    clearError,
    keywordRemove,
    clearCustomKeyword
} from './projectSlice'; // Import actions from the slice
import { createAsyncThunk } from '@reduxjs/toolkit';
import { subsctriptionCreditsSetter } from 'features/subscription/subscriptionActions';
import errorMsgHelper from 'utils/errorMsgHelper';

export const keywordRemoving = (value) => () => {
    dispatch(keywordRemove(value));
};
export const clearingCustomKeyword = () => () => {
    dispatch(clearCustomKeyword());
};
export const changePlatform = (platform) => () => {
    dispatch(selectedPlatform(platform));
};
export const clearingError = () => () => {
    dispatch(clearError());
};
export const projectClear = () => () => {
    dispatch(projectInit());
};
export const updaterProjectSuccess = (value) => () => {
    dispatch(updateProjectSuccess(value));
};
export const setSingleProjectSelect = (id) => () => {
    dispatch(setSingleProjectSelectSuccess({ id }));
};

export const toggleShowProjects = (v) => () => {
    dispatch(toggleShowProjectsList(v));
};

export const toggleProjectCreateModalCtrl = () => () => {
    dispatch(toggleProjectCreateModal());
};

export const projectCreatedStatus = (status) => () => {
    dispatch(projectCreated(status));
};
export const projectRemoving = (id) => () => {
    dispatch(projectRemove({ id }));
};
export const createdKeywordSuccess = (value) => () => {
    dispatch(createKeywordSuccess(value));
};

export const getProjects = (userId, token) => async () => {
    try {
        dispatch(loadingCotrl(true));
        const response = await axios.get(`projects/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(fetchProjects(response.data));
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        dispatch(loadingCotrl(false));
        // } finally {
        //     dispatch(loadingCotrl(false));
    }
};

export const callOthers = (v) => subsctriptionCreditsSetter(v);

export const addProject =
    (token, data = {}) =>
    async () => {
        try {
            dispatch(addProjectLoading(true));
            const response = await axios.post(`projects`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(addNewProject(response.data));
            subsctriptionCreditsSetter({ projects: -1 })();
            projectCreatedStatus(true)();
            // dispatch(toggleProjectCreateModal(false));
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
        } finally {
            dispatch(addProjectLoading(false));
        }
    };

export const updateProjectAPI =
    (token, id, data = {}) =>
    async () => {
        try {
            dispatch(updateProjectLoading(true));
            const response = await axios.put(`projects/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(updateProject(response.data));
            // projectCreatedStatus(true)();
            dispatch(toggleProjectCreateModal(false));
        } catch (error) {
            dispatch(hasError(error));
        } finally {
            dispatch(updateProjectLoading(false));
        }
    };

export const addingKeywords = (data) => () => {
    dispatch(createKeywords(data));
};

export const createKeywordsApi =
    (token, data = {}) =>
    async () => {
        try {
            dispatch(createKeywordsLoading(true));
            const response = await axios.post(`keywords`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const keywords = data?.suggestedKeywords?.length;
            subsctriptionCreditsSetter({ keywords: -keywords })();
            // createdKeywordSuccess(true)();
            addingKeywords(response.data)();
            // setTimeout(() => {
            // }, 2000);
            return response.data;
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
        } finally {
            dispatch(createKeywordsLoading(false));
        }
    };

export const deleteKeywordAPI = (token, id) => async () => {
    try {
        // dispatch(createKeywordsLoading(true));
        await axios.delete(`keywords/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        subsctriptionCreditsSetter({ keywords: 1 })();
        keywordRemoving({ id })();
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
    } finally {
        // dispatch(createKeywordsLoading(false));
    }
};

export const addingKeywordForSave =
    (keyword = '', index) =>
    () => {
        dispatch(addKeywordForSave({ keyword, index }));
    };

export const addingCustomKeywordForSave =
    (keyword = '', index) =>
    () => {
        dispatch(addCustomKeywordForSave({ keyword, index }));
    };
export const removingKeywordForSave =
    (keyword = '') =>
    () => {
        dispatch(removeKeywordForSave(keyword));
    };
export const removingCustomKeywordForSave =
    (index = '') =>
    () => {
        dispatch(removeCustomKeywordForSave(index));
    };

export const fetchAllProjects = createAsyncThunk('project/fetchAllProjects', async (_, { getState, dispatch }) => {
    const state = getState();
    const { accessToken, user } = state.auth;

    try {
        const response = await axios.get(`projects/${user._id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        throw e;
    }
});
