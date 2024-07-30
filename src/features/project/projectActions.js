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
    addKeywordForSave,
    updateProjectLoading,
    updateSingleProject,
    updateSuccess,
    projectCreated,
    projectRemove,
    removeKeywordForSave
} from './projectSlice'; // Import actions from the slice
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setSingleProjectSelect = (id) => () => {
    dispatch(setSingleProjectSelectSuccess({ id }));
};

export const toggleShowProjects = () => () => {
    dispatch(toggleShowProjectsList());
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

export const updateProject =
    (token, id, data = {}) =>
    async () => {
        try {
            dispatch(updateProjectLoading(true));
            const response = await axios.put(`projects/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(updateSingleProject(response.data));
            dispatch(updateSuccess(true));
            setTimeout(() => {
                dispatch(updateSuccess(false));
            }, 2000);
        } catch (error) {
            dispatch(hasError(error));
        } finally {
            dispatch(updateProjectLoading(false));
        }
    };

export const addingKeywordForSave =
    (keyword = '') =>
    () => {
        dispatch(addKeywordForSave(keyword));
    };
export const removingKeywordForSave =
    (keyword = '') =>
    () => {
        dispatch(removeKeywordForSave(keyword));
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
