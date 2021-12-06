import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api',
        method: 'GET',
        prepareHeaders(headers) {
            // set headers if needed
            // headers.set('key', value)

            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchItems: builder.query<any[], string|void> ({
                query(path) {
                    return `/${path}`;
                }
            })
        }
    }
})

export const { useFetchItemsQuery } = itemApiSlice;