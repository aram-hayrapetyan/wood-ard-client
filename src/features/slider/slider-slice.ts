import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SliderState {
    value: any[];
}

const initialState: SliderState = { value: [] }
const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        addSlider(state, action: PayloadAction<any[]>) {
            state.value = action.payload
        }
    }
});

export const {addSlider} = sliderSlice.actions;
export default sliderSlice.reducer;