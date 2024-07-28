import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    projects: [],
    projectKeywords: [],
    project: null,
    loading: false,
    createLoading: false,
    showProjectsList: false,
    showProjectCreateModal: false
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        fetchProjects(state, action) {
            state.projects = action.payload.items;
        },

        addNewProject(state, action) {
            const { item } = action.payload;
            state.projects.push(item);
        },
        addProjectLoading(state, action) {
            state.createLoading = action.payload;
        },

        setSingleProjectSelectSuccess(state, action) {
            const { id } = action.payload;
            state.project = state.projects.find((item) => item._id === id);
        },

        setSingleProjectDiselectSuccess(state) {
            state.project = null;
        },

        toggleShowProjectsList(state) {
            state.showProjectsList = !state.showProjectsList;
        },
        addKeywordForSave(state, action) {
            state.projectKeywords.push(action.payload);
            // console.log(action.payload);
        },

        toggleProjectCreateModal(state) {
            state.showProjectCreateModal = !state.showProjectCreateModal;
        },

        loadingCotrl(state, action) {
            state.loading = action.payload;
        }
    }
});

export const {
    toggleShowProjectsList,
    toggleProjectCreateModal,
    addNewProject,
    addProjectLoading,
    hasError,
    fetchProjects,
    setSingleProjectSelectSuccess,
    setSingleProjectDiselectSuccess,
    resetCardSuccess,
    loadingCotrl,
    addKeywordForSave
} = projectSlice.actions;

export default projectSlice.reducer;
