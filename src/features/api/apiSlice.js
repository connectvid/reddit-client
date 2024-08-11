/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BizReplyConfig from 'BizReplyConfig';

const apiSlice = createApi({
    // eslint-disable-next-line prettier/prettier
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BizReplyConfig.getNodeUrl()
    }),
    tags: ['users', 'user'],
    endpoints: (builder) => ({
        getPlans: builder.query({
            query: (name) => `pokemon/${name}`
        })
    })
});
export const { useGetPlansQuery } = apiSlice;

export default apiSlice;

/**
 * const apiSlice = createApi({
  // eslint-disable-next-line prettier/prettier
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DEV_URL,
  }),
  tags: ["users", "user", "courses"],
  endpoints: (builder) => ({

  }),
});
 */
