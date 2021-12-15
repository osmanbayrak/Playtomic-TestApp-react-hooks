import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface collapseState {
    status: boolean;
}

const initialState: collapseState = {
    status: false
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggle: (state) => {
            state.status = !state.status;
        },
    },
});

export const { toggle } = menuSlice.actions;

export const selectState = (state: RootState) => state.state.status;

export default menuSlice.reducer;
