import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['eyeglass'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://eye-glass-management-v2-server.vercel.app/api/v1' }),
    endpoints: () => ({})
});