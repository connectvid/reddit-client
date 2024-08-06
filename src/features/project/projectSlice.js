/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';
// import { fetchAllProjects } from './projectActions';

const initialState = {
    error: null,
    projects: [],
    suggestedKeywords: [],
    customKeywords: {},
    project: null,
    loading: false,
    projectDeleting: false,
    projectDeleted: false,
    createLoading: false,
    updateProjectLoading: false,
    projectCreated: false,
    updateLoading: false,
    updateSuccess: false,
    showProjectsList: false,
    showProjectCreateModal: false,
    selectedPlatform: ''
};
const getItem = ({ findBy = '_id', findKey = '', datas = [] }) => {
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
const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        fetchProjects(state, action) {
            const items = action.payload.items;
            const { search } = window.location;
            const qs = new URLSearchParams(search);
            const findKey = qs.get('dp');
            const getDefault = getItem({ findKey, datas: items });
            state.projects = items;
            const firstItem = getDefault || items?.[0];
            if (firstItem) {
                state.project = firstItem;
                state.selectedPlatform = firstItem.platforms?.[0];
                if (firstItem.suggestedKeywords?.length) {
                    state.suggestedKeywords = firstItem.suggestedKeywords;
                }
            }
        },

        addNewProject(state, action) {
            const { item } = action.payload;
            state.project = item;
            if (state.suggestedKeywords?.length) {
                state.suggestedKeywords = [];
            }
            state.projects.push(item);
        },
        updateProject(state, action) {
            const { item } = action.payload;
            const projects = state.projects;
            const items = [];
            for (const im of projects) {
                // im
            }
        },
        createKeywords(state, action) {
            // const { _id } = action.payload;
            // state.project = state.projects.find((item) => item._id === id);
            state.project = { ...state.project, Suggestedkeywords: action.payload.items };
        },
        addProjectLoading(state, action) {
            state.createLoading = action.payload;
        },
        updateProjectLoading(state, action) {
            state.updateProjectLoading = action.payload;
        },
        createKeywordsLoading(state, action) {
            state.updateLoading = action.payload;
        },

        setSingleProjectSelectSuccess(state, action) {
            const { id } = action.payload;
            const project = state.projects.find((item) => item._id === id);
            state.project = project;
            state.selectedPlatform = project.platforms?.[0];
            // state.suggestedKeywords = project?.suggestedKeywords || [];
        },

        setSingleProjectDiselectSuccess(state) {
            state.project = null;
        },

        toggleShowProjectsList(state, { payload }) {
            if (typeof payload === 'boolean') {
                state.showProjectsList = payload;
            } else state.showProjectsList = !state.showProjectsList;
        },

        addKeywordForSave(state, action) {
            const { keyword } = action.payload;
            state.suggestedKeywords.push(keyword);
            // if (typeof index === 'number') {
            //     state.suggestedKeywords[index] = keyword;
            // } else state.suggestedKeywords.push(keyword);
        },
        addCustomKeywordForSave(state, action) {
            const { keyword, index } = action.payload;
            state.customKeywords[index] = keyword;
        },
        removeKeywordForSave(state, action) {
            state.suggestedKeywords.shift(action.payload);
        },
        removeCustomKeywordForSave(state, action) {
            const idx = action.payload;
            const copy = JSON.parse(JSON.stringify(state.customKeywords));
            delete copy[idx];
            state.customKeywords = copy;
        },
        toggleProjectCreateModal(state) {
            state.showProjectCreateModal = !state.showProjectCreateModal;
        },

        loadingCotrl(state, action) {
            state.loading = action.payload;
        },
        updateSuccess(state, action) {
            state.updateSuccess = action.payload;
        },
        projectCreated(state, action) {
            state.projectCreated = action.payload;
        },
        projectDeleted(state, action) {
            state.projectDeleted = action.payload;
        },
        projectDeleting(state, action) {
            state.projectDeleting = action.payload;
        },

        selectedPlatform(state, action) {
            state.selectedPlatform = action.payload;
        },

        projectRemove(state, action) {
            const { id } = action.payload;
            const items = state.projects.filter((item) => item._id !== id);
            state.projects = items;
            const firstItem = items?.[0];
            if (firstItem) {
                state.project = firstItem;
                state.selectedPlatform = firstItem.platforms?.[0];
            }
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
    createKeywordsLoading,
    createKeywords,
    hasError,
    fetchProjects,
    setSingleProjectSelectSuccess,
    setSingleProjectDiselectSuccess,
    resetCardSuccess,
    loadingCotrl,
    addKeywordForSave,
    updateSuccess,
    projectCreated,
    projectDeleted,
    projectDeleting,
    projectRemove,
    removeKeywordForSave,
    removeCustomKeywordForSave,
    addCustomKeywordForSave,
    selectedPlatform,
    updateProject,
    updateProjectLoading
} = projectSlice.actions;

export default projectSlice.reducer;
