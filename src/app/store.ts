import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counter-slice';
import languageChanger from '../features/language/language-slice';
import themeChanger from '../features/themes/themes-slice';
import authStateReducer from '../features/auth/auth-requested-slice';
import tokenReducer from '../features/auth/token-slice';
import itemsReducer from '../features/items/items-slice';
import typesReducer from '../features/types/types-slice'
import sliderReducer from '../features/slider/slider-slice';
import { dataApiSlice } from "../features/data/data-api-slice";
import { authApiSlice } from "../features/auth/auth-api-slice";
import { dataApiAdminSlice } from "../features/data/data-api-admin-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        language: languageChanger,
        theme: themeChanger,
        authState: authStateReducer,
        token: tokenReducer,
        items: itemsReducer,
        types: typesReducer,
        slider: sliderReducer,
        [dataApiSlice.reducerPath]: dataApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [dataApiAdminSlice.reducerPath]: dataApiAdminSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(dataApiSlice.middleware)
            .concat(authApiSlice.middleware)
            .concat(dataApiAdminSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
