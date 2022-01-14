import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counter-slice';
import languageChanger from '../features/language/language-slice';
import themeChanger from '../features/themes/themes-slice';
import authStateReducer from '../features/auth/auth-requested-slice';
import tokenReducer from '../features/auth/token-slice';
import { itemApiSlice } from "../features/Items/items-api-slice";
import { authApiSlice } from "../features/auth/auth-api-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        language: languageChanger,
        theme: themeChanger,
        authState: authStateReducer,
        token: tokenReducer,
        [itemApiSlice.reducerPath]: itemApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(itemApiSlice.middleware)
            .concat(authApiSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
