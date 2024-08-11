import axios from 'axios';
import BizReplyConfig from 'BizReplyConfig';
import { ReactSession } from 'react-client-session';

const BASE_URL = BizReplyConfig.getNodeUrl();

const V1 = `/api/v1`;
export default axios.create({
    baseURL: `${BASE_URL}${V1}`
});

export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL}/${V1}`,
    headers: {
        Accept: 'x-www-form-urlencoded',
        'Content-Type': 'application/json'
    }
});

export const useAxiosPrivate = () => {
    const token = ReactSession.get('token');
    return axios.create({
        baseURL: `${BASE_URL}/${V1}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
        // withCredentials: true
    });
};
