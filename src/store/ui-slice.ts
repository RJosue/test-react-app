import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState = {
	modalIsVisible: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggle(state) {
			state.modalIsVisible = !state.modalIsVisible;
		},
	},
});

export const uiActions = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui.modalIsVisible;

export default uiSlice;
