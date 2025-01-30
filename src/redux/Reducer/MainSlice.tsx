import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditData {
  id: number;
  name: string;
  description: string | null;
  price: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  imagePath: string;
  categoryId: number;
  subCategoryId: number | null;
  brandId: number | null;
}
interface DeleteData {
  // Define the properties of deleteData here
  id: number;
  // Add other properties as needed
}

interface MainState {
  add: boolean;
  editData: EditData | null;
  deleteData: DeleteData | null;
}

const initialState: MainState = {
  add: false,
  editData: null,
  deleteData: null,
};

export const MainSlice = createSlice({
  name: "Initial",
  initialState,
  reducers: {
    handleAddModalOpen: (state) => {
      state.add = true;
    },
    handleEditData: (state, action: PayloadAction<EditData>) => {
      state.editData = action.payload;
    },
    handleDeleteData: (state, action: PayloadAction<DeleteData>) => {
      state.deleteData = action.payload;
    },
  },
});

export const { handleAddModalOpen, handleEditData, handleDeleteData } = MainSlice.actions;

export default MainSlice.reducer;

export type RootState = {
  Initial: MainState;
};