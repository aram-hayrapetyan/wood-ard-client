import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
    value: string
}

const initialState: LanguageState = { value: 'eng' };

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage(state, action: PayloadAction<string>) {
            state.value = action.payload
        }
    }
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;