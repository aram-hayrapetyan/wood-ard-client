import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counter-slice';
import languageChanger from '../features/language/language-slice';
import themeChanger from '../features/themes/themes-slice';
import authStateReducer from '../features/auth/auth-requested-slice';
import tokenReducer from '../features/auth/token-slice';
import { dataApiSlice } from "../features/data/data-api-slice";
import { authApiSlice } from "../features/auth/auth-api-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        language: languageChanger,
        theme: themeChanger,
        authState: authStateReducer,
        token: tokenReducer,
        [dataApiSlice.reducerPath]: dataApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [dataApiSlice.reducerPath]: dataApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(dataApiSlice.middleware)
            .concat(authApiSlice.middleware)
            .concat(dataApiSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
