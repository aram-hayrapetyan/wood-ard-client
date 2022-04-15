import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ItemsState {
    value: any[];
}

const initialState: ItemsState = { value: [] }
const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItems(state, action: PayloadAction<any[]>) {
            state.value = action.payload
        }
    }
});

export const {addItems} = itemsSlice.actions;
export default itemsSlice.reducer;