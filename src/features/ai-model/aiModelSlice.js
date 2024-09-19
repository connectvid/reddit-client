/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    aiModels: [],
    aiModelsGroup: { OpenAi: null, Straico: null, Gemini: null },
    aiModelsString: [],
    selectedAiModel: null,
    aiModel: null,
    aiModelLoading: false,
    singleAiModelloading: false,
    aiModelUpdateLoading: false,
    aiModelCreteOrUpdateLoading: false,
    aiModelCretedOrUpdated: false,
    aiModelUpdated: false,
    aiModelCreated: false,
    loading: false
};

const mentionSlice = createSlice({
    name: 'aiModel',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        mentionInit(state) {
            state = initialState;
        },

        loading(state, { payload }) {
            state.loading = payload;
        },
        singleAiModelloading(state, { payload }) {
            state.singleAiModelloading = payload;
        },
        aiModelUpdateLoading(state, { payload }) {
            state.aiModelUpdateLoading = payload;
        },
        getAiModel(state, { payload }) {
            state.aiModel = payload.item;
            state.singleAiModelloading = false;
        },

        addAiModel(state, { payload }) {
            const newItem = payload.item;
            // state.aiModels = items;
            const group = {};
            const prevAllItems = [newItem, ...JSON.parse(JSON.stringify(state.aiModels))];
            // if (!prevAllItems?.length) {
            //     prevAllItems = [newItem];
            // }
            const strings = [];

            const mapped = prevAllItems.map((item) => {
                group[item.modelGroupName] = item._id;
                strings.push(item.model);
                if (item._id === newItem._id) {
                    item.type = 'normal';
                } else item.type = 'normal';
                return item;
            });
            const items = [...mapped];
            state.aiModels = items;
            state.aiModelsGroup = { ...state.aiModelsGroup, ...group };
            state.aiModelsString = strings;
            state.selectedAiModel = newItem;
            state.loading = false;
        },

        getAiModels(state, { payload }) {
            const items = payload.items;
            state.aiModels = items;
            const group = {};
            const strings = [];
            for (const item of items) {
                group[item.modelGroupName] = item._id;
                // group[item.modelGroupName] = item.model;
                strings.push(item.model);
            }
            state.aiModelsGroup = { ...state.aiModelsGroup, ...group };
            state.aiModelsString = strings;
            const defaultModel = items.find((item) => item.type === 'default');
            state.selectedAiModel = defaultModel;
            state.loading = false;
        },
        updateAiModel(state, { payload }) {
            const updatedItem = payload.item;
            // state.aiModels = items;
            const group = {};
            const prevAllItems = JSON.parse(JSON.stringify(state.aiModels));
            const strings = [];

            const mapped = prevAllItems.map((item) => {
                if (item._id === updatedItem._id) {
                    group[updatedItem.modelGroupName] = updatedItem._id;
                    strings.push(updatedItem.model);
                    return updatedItem;
                }
                group[item.modelGroupName] = item._id;
                strings.push(item.model);

                item.type = 'normal';

                return item;
            });
            // const items = [updatedItem, ...mapped];
            state.aiModels = mapped;
            state.aiModelsGroup = { ...state.aiModelsGroup, ...group };
            state.aiModelsString = strings;
            state.selectedAiModel = updatedItem;
            // state.loading = false;
        },
        deleteAiModel(state, { payload }) {
            const deleteItem = payload.item;
            /**
             *  actionType,
          modelId,
          _id,
          deleteId,
          defaultId
             */
            // state.aiModels = items;
            const group = {};
            const prevAllItems = JSON.parse(JSON.stringify(state.aiModels));
            const strings = [];
            const filtered = prevAllItems.filter((item) => item._id !== deleteItem._id);
            let newDefault = null;
            const mapped = filtered.map((item) => {
                group[item.modelGroupName] = item._id;
                strings.push(item.model);
                if (item._id === deleteItem?.defaultId) {
                    newDefault = item;
                    item.type = 'default';
                } else {
                    item.type = 'normal';
                }

                return item;
            });
            state.aiModels = mapped;
            state.aiModelsGroup = { ...state.aiModelsGroup, ...group };
            state.aiModelsString = strings;
            state.selectedAiModel = newDefault;
            // state.loading = false;
        },
        aiModelCretedOrUpdated(state, { payload }) {
            state.aiModelCretedOrUpdated = payload;
        }
    }
});

export const {
    hasError,
    loading,
    singleAiModelloading,
    aiModelUpdateLoading,
    aiModelCretedOrUpdated,
    getAiModel,
    getAiModels,
    updateAiModel,
    deleteAiModel,
    mentionInit,
    addAiModel
} = mentionSlice.actions;

export default mentionSlice.reducer;
