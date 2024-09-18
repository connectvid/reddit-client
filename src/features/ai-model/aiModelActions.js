/* eslint-disable consistent-return */
import axios from 'utils/axios';
import { dispatch } from 'app/store';
import {
    hasError,
    loading,
    aiModelUpdateLoading,
    aiModelCretedOrUpdated,
    getAiModel,
    getAiModels,
    updateAiModel,
    mentionInit,
    singleAiModelloading
} from './aiModelSlice';
import errorMsgHelper from 'utils/errorMsgHelper';

export const mentionClear = () => () => {
    dispatch(mentionInit());
};
// single model
export const aiModelSetter = (vals) => () => {
    dispatch(getAiModel(vals));
};

export const getAiModelAPI = (token, id) => async () => {
    try {
        dispatch(singleAiModelloading(true));
        const { data } = await axios.get(`ai-models/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        aiModelSetter(data)();
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        dispatch(singleAiModelloading(false));
    }
};
// Single user Models
export const aiModelsSetter = (vals) => () => {
    dispatch(getAiModels(vals));
};
export const getAiModelsAPI = (token) => async () => {
    try {
        dispatch(loading(true));
        const { data } = await axios.get(`ai-models`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        aiModelsSetter(data)();
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        dispatch(loading(false));
    }
};
export const updatedaiModelSetter = (vals) => () => {
    dispatch(updateAiModel(vals));
};

export const AiModelCretedOrUpdatedStatus = (vals) => () => {
    dispatch(aiModelCretedOrUpdated(vals));
};

export const updateAiModelAPI =
    ({ token, data = {}, id }) =>
    async () => {
        try {
            dispatch(aiModelUpdateLoading(true));
            const { data: respData } = await axios.put(`ai-models/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            updatedaiModelSetter(respData)();
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            dispatch(aiModelUpdateLoading(false));
        }
    };

// export const addingKeywords = (data) => () => {
//     dispatch(createKeywords(data));
// };
