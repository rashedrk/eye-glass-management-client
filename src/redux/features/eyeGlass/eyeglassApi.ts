import { TEyeglass } from "../../../types";
import { TQueryParams, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";



const eyeglassApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEyeglasses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/eyeglass',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TEyeglass[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            providesTags: ['eyeglass'],
        }),
        addEyeglass: builder.mutation({
            query: (data) => ({
                url: `/eyeglass/add`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['eyeglass']
        }),
        updateEyeglass: builder.mutation({
            query: (data) => ({
                url: `/eyeglass/update/${data.id}`,
                method: 'PATCH',
                body: data.updateData
            }),
            invalidatesTags: ['eyeglass']
        }),
        deleteEyeglass: builder.mutation({
            query: (id) => ({
                url: `eyeglass/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['eyeglass']
        }),
        bulkDeleteEyeglass: builder.mutation({
            query: (data) => ({
                url: `eyeglass/bulk_delete`,
                method: 'DELETE',
                body: { ids: data }
            }),
            invalidatesTags: ['eyeglass']
        }),
        sellEyeglass: builder.mutation({
            query: (data) => ({
                url: `/sales/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['eyeglass']
        }),
        getAllSalesHistory: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: `/sales`,
                    method: 'GET',
                    params: params
                }
            }
        }),

    })
})

export const { useGetAllEyeglassesQuery, useAddEyeglassMutation, useUpdateEyeglassMutation, useDeleteEyeglassMutation, useSellEyeglassMutation, useBulkDeleteEyeglassMutation, useGetAllSalesHistoryQuery } = eyeglassApi;