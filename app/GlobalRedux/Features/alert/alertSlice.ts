// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for text and boolean values
const textBooleanSlice = createSlice({
  name: 'textBoolean',
  initialState: {
    text: '',
    booleanValue: false,
  },
  reducers: {
    // Reducer to update the text value
    setText: (state, action) => {
      state.text = action.payload;
    },
    // Reducer to toggle the boolean value
    setBoolean: (state, action) => {
        state.booleanValue = action.payload;
      },
  },
});

// Export the actions and reducer
export const { setText, setBoolean } = textBooleanSlice.actions;
export default textBooleanSlice.reducer;