/* eslint-disable consistent-return */
import { NEW_POST_RAG_PAST_DAYS } from 'config';
import moment from 'moment';

export default function ({ createdAt }) {
    if (!createdAt) return false;
    return moment(createdAt).isAfter(moment().subtract(NEW_POST_RAG_PAST_DAYS, 'days'));
}
