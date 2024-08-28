/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
// import { fetchAllProjects } from './projectActions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    projects: [],
    suggestedKeywords: [],
    customKeywords: {},
    project: null,
    loading: false,
    projectDeleting: false,
    keywordDeleting: false,
    projectDeleted: false,
    createLoading: false,
    keywordCreateLoading: false,
    createKeywordsLoading: false,
    updateProjectLoading: false,
    updateProjectSuccess: false,
    projectCreated: false,
    keywordDeleted: false,
    updateLoading: false,
    createKeywordSuccess: false,
    showProjectsList: false,
    showProjectCreateModal: false,
    selectedPlatform: ''
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

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        projectInit(state) {
            Object.keys(initialState).map((k) => {
                state[k] = initialState[k];
            });
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
                // if (firstItem.suggestedKeywords?.length) {
                //     state.suggestedKeywords = firstItem.suggestedKeywords;
                // }
            }
            state.loading = false;
        },

        addNewProject(state, action) {
            const { item } = action.payload;
            state.project = item;
            if (state.suggestedKeywords?.length) {
                state.suggestedKeywords = [];
            }
            state.projects.push(item);
            state.selectedPlatform = item?.platforms?.[0];
        },
        updateProject(state, action) {
            const { item } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project._id === item._id) {
                    return { ...project, ...item };
                    // project.shortDescription = item.shortDescription;
                    // if (project._id === state.project?._id) {
                    //     state.project.shortDescription = item.shortDescription;
                    // }
                }
                return project;
            });
            state.project = { ...state.project, ...item };
            state.updateProjectLoading = false;
        },
        createKeywords(state, { payload }) {
            const Suggestedkeywords = [...(state.project?.Suggestedkeywords || []), ...(payload?.items || [])];
            const data = { ...state.project, Suggestedkeywords };
            // console.log(data, 'createKeywords');
            state.project = data;
            const items = [];
            state.createKeywordSuccess = true;
            const projectId = state?.project?._id;
            for (const item of state.projects) {
                if (item._id === projectId) {
                    console.log(`Match`);
                    item.Suggestedkeywords = Suggestedkeywords;
                }
                items.push(item);
            }
            state.projects = items;
        },
        addProjectLoading(state, action) {
            state.createLoading = action.payload;
        },
        updateProjectLoading(state, action) {
            state.updateProjectLoading = action.payload;
        },
        createKeywordsLoading(state, action) {
            state.createKeywordsLoading = action.payload;
        },
        setSingleProjectSelectSuccess(state, action) {
            const { id } = action.payload;
            const project = state.projects.find((item) => item._id === id);
            state.project = project;
            state.selectedPlatform = project.platforms?.[0];
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
        addKeywordForSave2(state) {
            // const { keyword } = action.payload;
            console.log(state, 'state');
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
        clearCustomKeyword(state) {
            state.customKeywords = {};
        },
        toggleProjectCreateModal(state) {
            state.showProjectCreateModal = !state.showProjectCreateModal;
        },

        loadingCotrl(state, action) {
            state.loading = action.payload;
        },
        createKeywordSuccess(state, action) {
            state.createKeywordSuccess = action.payload;
        },
        updateProjectSuccess(state, action) {
            state.updateProjectSuccess = action.payload;
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
        },
        keywordRemove(state, { payload }) {
            const { id } = payload;
            const Suggestedkeywords = state.project.Suggestedkeywords.filter((item) => item._id !== id);
            state.project = { ...state.project, Suggestedkeywords };
            const items = [];
            for (const item of state.projects) {
                if (item._id === state.project._id) {
                    console.log(`Match`);
                    item.Suggestedkeywords = Suggestedkeywords;
                }
                items.push(item);
            }
            state.projects = items;
            state.keywordDeleted = true;
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
    createKeywordSuccess,
    projectCreated,
    projectDeleted,
    projectDeleting,
    projectRemove,
    removeKeywordForSave,
    removeCustomKeywordForSave,
    addCustomKeywordForSave,
    selectedPlatform,
    updateProject,
    updateProjectLoading,
    updateProjectSuccess,
    addKeywordForSave2,
    projectInit,
    clearError,
    keywordRemove,
    clearCustomKeyword
} = projectSlice.actions;

export default projectSlice.reducer;
