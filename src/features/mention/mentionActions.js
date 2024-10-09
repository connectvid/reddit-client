/* eslint-disable consistent-return */
import axios from 'utils/axios';
import { dispatch } from 'app/store';
import {
    hasError,
    loading,
    getMentionSetting,
    updateMentionSetting,
    mentionSettingCretedOrUpdated,
    // mentionInit,
    mentionSettingUpdateLoading
} from './mentionSlice';
import errorMsgHelper from 'utils/errorMsgHelper';
// import { updateProjectData } from 'features/project/projectActions';
import { addingAiNewModel, deletingAiNewModel, updatedaiModelSetter } from 'features/ai-model/aiModelActions';

export const mentionClear = () => () => {
    // dispatch(mentionInit());
    dispatch(hasError(null));
};
export const mentionErrorClear = () => () => {
    dispatch(hasError(null));
};
export const mentionSetter = (vals) => () => {
    dispatch(getMentionSetting(vals));
};

export const getMentionSettingAPI = (token) => async () => {
    try {
        dispatch(loading(true));
        const { data } = await axios.get(`mention-settings`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        mentionSetter(data)();
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        dispatch(loading(false));
    }
};

export const updatedMentionSetter = (vals) => () => {
    dispatch(updateMentionSetting(vals));
};

export const mentionSettingCretedOrUpdatedStatus = (vals) => () => {
    dispatch(mentionSettingCretedOrUpdated(vals));
};

export const updateMentionSettingAPI =
    ({ token, data = {} }) =>
    async () => {
        try {
            dispatch(mentionSettingUpdateLoading(true));
            const { data: respData } = await axios.post(`mention-settings`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (respData?.model) {
                const { actionType } = respData?.model;
                if (actionType === 'add') {
                    addingAiNewModel({ item: respData?.model })();
                } else if (actionType === 'update') {
                    updatedaiModelSetter({ item: respData?.model })();
                } else if (actionType === 'delete') {
                    deletingAiNewModel({ item: respData?.model })();
                }
            }
            updatedMentionSetter(respData)();
            // const { platforms } = data;
            // updateProjectData({ item: { platforms } })();
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            dispatch(mentionSettingUpdateLoading(false));
        }
    };
