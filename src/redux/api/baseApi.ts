/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { logout } from "../features/auth/authSlice";
import { TResponse } from "../../types/global.type";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://eye-glass-management-v2-server.vercel.app/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', token);
        }
        return headers
    }
});

const baseQueryWithErrorCheck: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    const result = await baseQuery(args, api, extraOptions) as TResponse<any>;

    if (result?.error?.status === 404) {
        toast.error(result.error.data.message);
    }
    if (result?.error?.status === 403) {
        toast.error(result.error.data.message);
    }

    if (result?.error?.status === 401 || result?.error?.data.message === "jwt expired") {
        api.dispatch(logout());
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['eyeglass'],
    baseQuery:baseQueryWithErrorCheck,
    endpoints: () => ({})
});