import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface authCredetials {
    email: string,
    password: string
}

export const authApiSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api',
        prepareHeaders(headers) {
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            auth: builder.query<any, authCredetials>({
                query(credentials: authCredetials) {
                    return {
                        url: '/auth/login',
                        method: 'POST',
                        body: credentials
                    }
                }
            })
        }
    }
})

export const { useAuthQuery } = authApiSlice;