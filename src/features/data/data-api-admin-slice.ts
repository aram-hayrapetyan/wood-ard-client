import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
require('dotenv').config()

interface DataRequest {
    path: string,
    body?: any,
    id?: string
}

export const dataApiAdminSlice = createApi({
    reducerPath: 'apiAdmin',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders(headers) {
            const token = Cookies.get('access_token')
            // set headers if needed
            headers.set('Authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints(builder) {
        return {
            addData: builder.mutation<any[], DataRequest> ({
                query({ path, body }) {
                    return {
                        url: `/${path}`,
                        method: 'POST',
                        body,
                    }
                }
            }),
            editData: builder.mutation<any[], DataRequest> ({
                query({ path, body }) {
                    return {
                        url: `/${path}`,
                        method: 'PUT',
                        body
                    }
                }
            }),
            deleteData: builder.mutation<any[], DataRequest> ({
                query({ path }) {
                    return {
                        url: `/${path}`,
                        method: 'DELETE',
                    }
                }
            }),
        }
    }
})

export const { useAddDataMutation, useEditDataMutation, useDeleteDataMutation } = dataApiAdminSlice;