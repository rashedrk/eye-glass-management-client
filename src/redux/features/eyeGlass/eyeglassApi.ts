import { baseApi } from "../../api/baseApi";



const eyeglassApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        eyeglass: builder.query({
            query: (query) => ({
                url: '/eyeglass',
                method: 'GET',
                params: {
                    searchTerm: query.searchTerm,
                    ...query.filter,
                }
            }),
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
        saleEyeglass: builder.mutation({
            query: (data) => ({
                url: `/sales/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['eyeglass']
        }),
        salesHistory: builder.query({
            query: (data) => ({
                url: `/sales/${data.type}`,
                method: 'GET',
                params: {
                    date: data.query
                }
            }),
        }),

    })
})

export const { useEyeglassQuery, useAddEyeglassMutation, useUpdateEyeglassMutation, useDeleteEyeglassMutation, useSaleEyeglassMutation, useBulkDeleteEyeglassMutation, useSalesHistoryQuery } = eyeglassApi;