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
    addKeywordForSave
} from './projectSlice'; // Import actions from the slice

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
            dispatch(toggleProjectCreateModal(false));
        } catch (error) {
            dispatch(hasError(error));
        } finally {
            dispatch(addProjectLoading(false));
        }
    };

export const updateProject =
    (token, data = {}) =>
    async () => {
        try {
            dispatch(addProjectLoading(true));
            const response = await axios.post(`projects`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(fetchProjects(response.data));
        } catch (error) {
            dispatch(hasError(error));
        } finally {
            dispatch(addProjectLoading(false));
        }
    };

export const setSingleProjectSelect = (id) => () => {
    dispatch(setSingleProjectSelectSuccess({ id }));
};

export const toggleShowProjects = () => () => {
    dispatch(toggleShowProjectsList());
};

export const toggleProjectCreateModalCtrl = () => () => {
    dispatch(toggleProjectCreateModal());
};

export const addingKeywordForSave =
    (keyword = '') =>
    () => {
        dispatch(addKeywordForSave(keyword));
    };
