import { createSlice } from "@reduxjs/toolkit";

interface MainState {
	add: boolean;
	editData: any;
}

const initialState: MainState = {
	add: false,
	editData: {}
};

export const MainSlice = createSlice({
	name: "Initial",
	initialState,
	reducers: {
		handleAddModalOpen: (state) => {
			state.add = true;
		},
		handleEditData: (state, action) => {
			state.editData = action.payload;
		},
	},
});

export const { handleAddModalOpen, handleEditData } = MainSlice.actions;

export default MainSlice.reducer;

export type RootState = {
	Initial: MainState;
};
