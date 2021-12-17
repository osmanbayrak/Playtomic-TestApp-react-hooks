import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface collapseState {
    collapsed: boolean;
    loading: boolean;
};

const initialState: collapseState = {
    collapsed: false,
    loading: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggle: (state) => {
            state.collapsed = !state.collapsed;
        },
        toggleLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { toggle, toggleLoading } = menuSlice.actions;

export const selectState = (state: RootState) => state.menu.collapsed;

export default menuSlice.reducer;
