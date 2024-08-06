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
    updateSuccess,
    projectCreated,
    projectRemove,
    removeKeywordForSave,
    removeCustomKeywordForSave,
    addCustomKeywordForSave,
    selectedPlatform,
    updateProjectLoading
} from './projectSlice'; // Import actions from the slice
import { createAsyncThunk } from '@reduxjs/toolkit';

export const changePlatform = (platform) => () => {
    dispatch(selectedPlatform(platform));
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

export const getProjects = (userId, token) => async () => {
    try {
        dispatch(loadingCotrl(true));
        const response = await axios.get(`projects/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(fetchProjects(response.data));
    } catch (error) {
        dispatch(hasError(error));
    } finally {
        dispatch(loadingCotrl(false));
    }
};

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
            projectCreatedStatus(true)();
            dispatch(toggleProjectCreateModal(false));
        } catch (error) {
            dispatch(hasError(error));
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
            dispatch(createKeywords(response.data));
            dispatch(updateSuccess(true));
            setTimeout(() => {
                dispatch(updateSuccess(false));
            }, 2000);
        } catch (error) {
            dispatch(hasError(error));
        } finally {
            dispatch(createKeywordsLoading(false));
        }
    };

export const deleteKeywordFromDB = (token, id) => async () => {
    try {
        // dispatch(createKeywordsLoading(true));
        const response = await axios.delete(`keywords/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // dispatch(updateSingleProject(response.data));
        // dispatch(updateSuccess(true));
        // setTimeout(() => {
        //     dispatch(updateSuccess(false));
        // }, 2000);
    } catch (error) {
        dispatch(hasError(error));
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
        dispatch(hasError(e.response));
        throw e;
    }
});
