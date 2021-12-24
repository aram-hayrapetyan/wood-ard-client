import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const itemApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api',
        method: 'GET',
        prepareHeaders(headers) {
            const token = Cookies.get('access_token')
            // set headers if needed
            headers.set('Authorization', `Bearer ${token}`);

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