// slices/DarkLight.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface DarkLightState {
  isDarkMode: boolean; // state that stores whether dark mode is enabled
}

// Initial state for the slice
const initialState: DarkLightState = {
  isDarkMode: true , // default to light mode
};

// Create the slice
const DarkLightSlice = createSlice({
  name: 'DarkLight',
  initialState,
  reducers: {
    // Action to toggle dark mode
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    // Action to directly set dark mode (true or false)
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

// Export the actions to be used in components
export const { toggleDarkMode, setDarkMode } = DarkLightSlice.actions;

// Export the reducer to be used in the store
export default DarkLightSlice.reducer;
