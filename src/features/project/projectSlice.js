import { createSlice } from '@reduxjs/toolkit';
// import { fetchAllProjects } from './projectActions';

const initialState = {
    error: null,
    projects: [],
    suggestedKeywords: [],
    project: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    updateSuccess: false,
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
            const items = action.payload.items;
            state.projects = items;
            const firstItem = items?.[0];
            if (firstItem) {
                state.project = firstItem;
                if (firstItem.suggestedKeywords?.length) {
                    state.suggestedKeywords = firstItem.suggestedKeywords;
                }
            }
        },

        addNewProject(state, action) {
            const { item } = action.payload;
            state.projects.push(item);
        },
        updateSingleProject(state, action) {
            // const { _id } = action.payload;
            // state.project = state.projects.find((item) => item._id === id);
            state.project = action.payload.item;
        },
        addProjectLoading(state, action) {
            state.createLoading = action.payload;
        },
        updateProjectLoading(state, action) {
            state.updateLoading = action.payload;
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
            state.suggestedKeywords.push(action.payload);
            // console.log(action.payload);
        },

        toggleProjectCreateModal(state) {
            state.showProjectCreateModal = !state.showProjectCreateModal;
        },

        loadingCotrl(state, action) {
            state.loading = action.payload;
        },
        updateSuccess(state, action) {
            state.updateSuccess = action.payload;
        }
    }

    // extraReducers: (builder) => {
    //     builder
    //         // .addCase(createUser.pending, (state) => {
    //         //     state.isLoading = true;
    //         //     state.isError = false;
    //         //     state.error = '';
    //         // })
    //         .addCase(fetchAllProjects.fulfilled, (state, { payload }) => {
    //             state.projects = payload.items;
    //         });
    //     // .addCase(createUser.rejected, (state, action) => {
    //     //     state.isLoading = false;
    //     //     state.user.email = '';
    //     //     state.isError = true;
    //     //     state.error = action.error.message;
    //     // })
    // }
});

export const {
    toggleShowProjectsList,
    toggleProjectCreateModal,
    addNewProject,
    addProjectLoading,
    updateProjectLoading,
    updateSingleProject,
    hasError,
    fetchProjects,
    setSingleProjectSelectSuccess,
    setSingleProjectDiselectSuccess,
    resetCardSuccess,
    loadingCotrl,
    addKeywordForSave,
    updateSuccess
} = projectSlice.actions;

export default projectSlice.reducer;
