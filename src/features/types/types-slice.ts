import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import itemsSlice from "../items/items-slice";

interface TypesState {
    value: any[];
}

const initialState: TypesState = { value: [] };
const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        addTypes(state, action: PayloadAction<any[]>) {
            state.value = action.payload
        }
    }
})

export const { addTypes } = typesSlice.actions;
export default typesSlice.reducer;
