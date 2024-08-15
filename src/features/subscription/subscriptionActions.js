/* eslint-disable consistent-return */
import axios from 'utils/axios';
import { dispatch } from 'app/store';
import {
    hasError,
    createKeywords,
    getSubscriptionLoading,
    setSubsctription,
    setSubsctriptionCredits,
    subscriptionInit
} from './subscriptionSlice'; // Import actions from the slice
import errorMsgHelper from 'utils/errorMsgHelper';

export const subscriptionClear = () => () => {
    dispatch(subscriptionInit());
};
export const subsctriptionSetter = (vals) => () => {
    dispatch(setSubsctription(vals));
};

export const subsctriptionCreditsSetter = (vals) => () => {
    dispatch(setSubsctriptionCredits(vals));
};

export const getMySubscriptionAPI = (token) => async () => {
    try {
        dispatch(getSubscriptionLoading(true));
        const response = await axios.get(`subscriptions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response.data, 'before setter');
        subsctriptionSetter(response.data)();
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
    } finally {
        dispatch(getSubscriptionLoading(false));
    }
};

// export const updateProjectAPI =
//     (token, id, data = {}) =>
//     async () => {
//         try {
//             dispatch(updateProjectLoading(true));
//             const response = await axios.put(`projects/${id}`, data, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             dispatch(updateProject(response.data));
//             // projectCreatedStatus(true)();
//             dispatch(toggleProjectCreateModal(false));
//         } catch (error) {
//             dispatch(hasError(error));
//         } finally {
//             dispatch(updateProjectLoading(false));
//         }
//     };

export const addingKeywords = (data) => () => {
    dispatch(createKeywords(data));
};

export const deleteKeywordAPI = (token, id) => async () => {
    try {
        // dispatch(createKeywordsLoading(true));
        await axios.delete(`keywords/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // dispatch(updateSingleProject(response.data));
        // dispatch(updateSuccess(true));
        // setTimeout(() => {
        //     dispatch(updateSuccess(false));
        // }, 2000);
    } catch (error) {
        dispatch(hasError(error));
    } finally {
        // dispatch(createKeywordsLoading(false));
    }
};
