// store.ts
import { configureStore } from '@reduxjs/toolkit';
import DarkLightReducer from './slices/DarkLight'; // Import the reducer
import EditorTheme from "./slices/EditorTheme" 
import Code from "./slices/code"
import StudentSlice from "./slices/Student"
import FacultySlice from "./slices/Faculty"

// Create the store with the reducer
export const store = configureStore({
  reducer: {
    DarkLight: DarkLightReducer, // Reducer added here
    EditorTheme:EditorTheme,
    code:Code,
    student:StudentSlice,
    faculty:FacultySlice
  },
});


export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;


export type AppStore = typeof store;
