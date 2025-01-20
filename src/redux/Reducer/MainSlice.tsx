import { createSlice } from "@reduxjs/toolkit";

interface MainState {
	add: boolean;
	editData: any;
	deleteData: any;
}

const initialState: MainState = {
	add: false,
	editData: {},
	deleteData: {}
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
		handleDeleteData: (state, action) => {
			state.deleteData = action.payload;
		}
	},
});

export const { handleAddModalOpen, handleEditData ,handleDeleteData } = MainSlice.actions;

export default MainSlice.reducer;

export type RootState = {
	Initial: MainState;
};
