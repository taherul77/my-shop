import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../Reducer/MainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['main.editData'], 
        ignoredActions: ['main/handleEditData'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
