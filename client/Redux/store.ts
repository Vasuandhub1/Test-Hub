// store.ts
import { configureStore } from '@reduxjs/toolkit';
import DarkLightReducer from './slices/DarkLight'; // Import the reducer

// Create the store with the reducer
export const store = configureStore({
  reducer: {
    DarkLight: DarkLightReducer, // Reducer added here
  },
});


export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;


export type AppStore = typeof store;
