import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

export const dataApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api',
        method: 'GET',
        prepareHeaders(headers) {
            // const token = Cookies.get('access_token')
            // set headers if needed
            // headers.set('Authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchData: builder.query<any[], string|void> ({
                query(path) {
                    return `/${path}`;
                }
            })
        }
    }
})

export const { useFetchDataQuery } = dataApiSlice;