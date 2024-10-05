/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
// import { fetchAllProjects } from './projectActions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    projects: [],
    suggestedKeywords: [],
    negativeKeywords: [],
    customKeywords: {},
    customNegativeKeywords: {},
    project: null,
    editProject: null,
    loading: false,
    projectDeleting: false,
    isEditProject: false,
    keywordDeleting: false,
    projectDeleted: false,
    projectUpdated: false,
    createLoading: false,
    keywordCreateLoading: false,
    createKeywordsLoading: false,
    updateProjectLoading: false,
    updateProjectSuccess: false,
    projectCreated: false,
    keywordDeleted: false,
    negativeKeywordDeleted: false,
    updateLoading: false,
    updateAdvancedProjectSettingLoading: false,
    updatedAdvancedProjectSetting: false,
    createKeywordSuccess: false,
    createNegativeKeywordSuccess: false,
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
        addProjectLoading(state, action) {
            state.addProjectLoading = action.payload;
        },

        addNewProject(state, action) {
            const { item } = action.payload;
            state.project = item;
            if (state.suggestedKeywords?.length) {
                state.suggestedKeywords = [];
            }
            state.projects.push(item);
            state.selectedPlatform = item?.platforms?.[0];
            state.addProjectLoading = false;
        },
        isEditProject(state, { payload }) {
            state.isEditProject = payload;
        },
        editProject(state, { payload }) {
            state.editProject = payload;
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
            state.projectUpdated = true;
            state.editProject = null;
            state.isEditProject = false;
        },
        updateAdvancedProjectSettingLoading(state, action) {
            state.updateAdvancedProjectSettingLoading = action.payload;
        },
        updatedAdvancedProjectSetting(state, action) {
            state.updatedAdvancedProjectSetting = action.payload;
        },
        updateAdvencedSettingOfProject(state, action) {
            const { item } = action.payload;
            console.log({ item });
            state.projects = state.projects.map((project) => {
                if (project._id === item._id) {
                    return { ...project, ...item };
                }
                return project;
            });
            state.project = { ...state.project, ...item };
            state.updateProjectLoading = false;
            state.updatedAdvancedProjectSetting = true;
            state.updateAdvancedProjectSettingLoading = false;
        },
        updateMentionFetchStatusOfProject(state, { payload }) {
            const item = payload;
            if (state?.project && state.project._id === item._id) {
                state.project = { ...state.project, ...item };
            }
            state.projects = state.projects.map((project) => {
                if (project._id === item._id) {
                    return { ...project, ...item };
                }
                return project;
            });
        },
        createKeywords(state, { payload }) {
            const { items: dItems = [], negativeKeywords = [] } = payload;
            const Suggestedkeywords = [...(state.project?.Suggestedkeywords || []), ...dItems];
            const previousNKs = state.project?.negativeKeywords || [];
            const nks = [...previousNKs, ...negativeKeywords.filter((nk) => !previousNKs.includes(nk))];
            // const nks = [...(state.project?.negativeKeywords || []), ...negativeKeywords];
            const data = { ...state.project, Suggestedkeywords, negativeKeywords: nks };
            console.log(dItems, 'createKeywords', negativeKeywords);
            state.project = data;
            const items = [];
            if (dItems?.length) {
                state.createKeywordSuccess = true;
            } else if (negativeKeywords?.length) {
                state.createNegativeKeywordSuccess = true;
            }
            const projectId = state?.project?._id;
            for (const item of state.projects) {
                if (item._id === projectId) {
                    console.log(`Match`);
                    item.Suggestedkeywords = Suggestedkeywords;
                    item.negativeKeywords = nks;
                }
                items.push(item);
            }
            state.projects = items;
            state.createKeywordsLoading = false;
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
        addNegativeCustomKeywordForSave(state, action) {
            const { keyword, index } = action.payload;
            state.customNegativeKeywords[index] = keyword;
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
        removeNegativeCustomKeywordForSave(state, action) {
            const idx = action.payload;
            const copy = JSON.parse(JSON.stringify(state.customNegativeKeywords));
            delete copy[idx];
            state.customNegativeKeywords = copy;
        },
        clearCustomKeyword(state) {
            state.customKeywords = {};
        },
        clearCustomNegativeKeyword(state) {
            state.customNegativeKeywords = {};
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
        createNegativeKeywordSuccess(state, action) {
            state.createNegativeKeywordSuccess = action.payload;
        },

        updateProjectSuccess(state, action) {
            state.updateProjectSuccess = action.payload;
        },
        projectCreated(state, action) {
            state.projectCreated = action.payload;
        },
        projectUpdated(state, { payload }) {
            state.projectUpdated = payload;
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
        projectRemove(state, { payload }) {
            const { id } = payload;
            const items = state.projects.filter((item) => item._id !== id);
            state.projects = items;
            if (id === state.project?._id) {
                const firstItem = items?.[0];
                state.project = firstItem || null;
                state.selectedPlatform = firstItem?.platforms?.[0] || '';
                // const { search, replace, origin, pathname } = window.location;
                // const qs = new URLSearchParams(search);
                // const findKey = qs.get('dp');
                // if (findKey === id) {
                //     replace(`${origin}${pathname}`);
                // }
            }
            console.log();
        },
        keywordDeleted(state, action) {
            state.keywordDeleted = action.payload;
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
        },
        negativeKeywordDeleted(state, action) {
            state.negativeKeywordDeleted = action.payload;
        },
        negativeKeywordRemove(state, { payload }) {
            const { keyword, _id } = payload;
            const project = state.project;
            state.projects = state.projects.map((item) => {
                if (item._id === _id) {
                    const negativeKeywords = item.negativeKeywords.filter((item) => item !== keyword);
                    if (project?._id === _id) {
                        state.project = { ...project, negativeKeywords };
                    }
                    item.negativeKeywords = negativeKeywords;
                }
                return item;
            });
            state.negativeKeywordDeleted = true;
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
    removeNegativeCustomKeywordForSave,
    addCustomKeywordForSave,
    addNegativeCustomKeywordForSave,
    selectedPlatform,
    updateProject,
    updateProjectLoading,
    updateProjectSuccess,
    addKeywordForSave2,
    projectInit,
    clearError,
    keywordRemove,
    clearCustomKeyword,
    clearCustomNegativeKeyword,
    isEditProject,
    editProject,
    projectUpdated,
    updateMentionFetchStatusOfProject,
    createNegativeKeywordSuccess,
    negativeKeywordRemove,
    updateAdvencedSettingOfProject,
    updateAdvancedProjectSettingLoading,
    updatedAdvancedProjectSetting
} = projectSlice.actions;

export default projectSlice.reducer;
