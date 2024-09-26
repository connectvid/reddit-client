/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import axios from 'utils/axios';
import { dispatch } from 'app/store';
import {
    hasError,
    loading,
    reportLoading,
    getReport,
    updateReport,
    reportCretedOrUpdated,
    reportInit,
    reportUpdateLoading,
    reportCreateLoading,
    addReport,
    reportDeleteLoading,
    removeReport,
    getAllReports,
    reportCreated,
    succeedReportUpdate
} from './reportSlice';
import errorMsgHelper from 'utils/errorMsgHelper';
import { updateProjectData } from 'features/project/projectActions';

export const reportClear = () => () => {
    dispatch(reportInit());
};

export const allReportSetter = (vals) => () => {
    dispatch(getAllReports(vals));
};

export const updateSucceedReport = (vals) => () => {
    dispatch(succeedReportUpdate(vals));
};
export const getAllReportsAPI = (token) => async () => {
    try {
        dispatch(loading(true));
        const { data } = await axios.get(`reports`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        allReportSetter(data)();
    } catch (e) {
        dispatch(hasError(errorMsgHelper(e)));
        dispatch(loading(false));
    }
};
export const reportSetter = (vals) => () => {
    dispatch(getReport(vals));
};
export const getReportAPI =
    ({ token, id }) =>
    async () => {
        try {
            dispatch(reportLoading(true));
            const { data } = await axios.get(`reports/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            reportSetter(data)();
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            dispatch(reportLoading(false));
        }
    };

export const createdReportSetter = (vals) => () => {
    dispatch(addReport(vals));
};

export const reportCreatedStatus = (vals) => () => {
    dispatch(reportCreated(vals));
};
export const createReportLoadingStatus = (vals) => () => {
    dispatch(reportCreateLoading(vals));
};
export const createReportAPI =
    ({ token, data = {}, setShowCreateModal, setIsCreatingReport }) =>
    async () => {
        try {
            createReportLoadingStatus(true)();
            const { data: respData } = await axios.post(`reports`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            createdReportSetter(respData)();
            setShowCreateModal(false);
            setIsCreatingReport(false);
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            createReportLoadingStatus(true)();
        }
    };
export const updatedReportSetter = (vals) => () => {
    dispatch(updateReport(vals));
};

export const reportCretedOrUpdatedStatus = (vals) => () => {
    dispatch(reportCretedOrUpdated(vals));
};

export const updateReportAPI =
    ({ token, data = {} }) =>
    async () => {
        try {
            dispatch(reportUpdateLoading(true));
            const { data: respData } = await axios.post(`reports`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            updatedReportSetter(respData)();
            const { platforms } = data;
            updateProjectData({ item: { platforms } })();
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            dispatch(reportUpdateLoading(false));
        }
    };

export const deletedReportSetter = (vals) => () => {
    dispatch(removeReport(vals));
};

export const deleteReportLoadingStatus = (vals) => () => {
    dispatch(reportDeleteLoading(vals));
};

export const deleteReportAPI =
    ({ token, id }) =>
    async () => {
        try {
            deleteReportLoadingStatus(true)();
            await axios.delete(`reports/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            deletedReportSetter({ item: { _id: id } })();
        } catch (e) {
            dispatch(hasError(errorMsgHelper(e)));
            deleteReportLoadingStatus(false)();
        }
    };

export const fielUploadAPI = async ({ token, data = {} }) => {
    console.log(data);
    const formData = new FormData();

    for (const k of Object.keys(data)) {
        formData.append(k, data[k]);
        console.log(data[k]);
    }
    // formData.append('file', files[0]);
    const { data: respData } = await axios.post('reports/file-upload', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return respData;
};
