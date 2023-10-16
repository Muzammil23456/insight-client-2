// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for text and boolean values
const textBooleanSlice = createSlice({
  name: 'textBoolean2',
  initialState: {
    text2: '',
    booleanValue2: false,
  },
  reducers: {
    // Reducer to update the text value
    setText2: (state, action) => {
      state.text2 = action.payload;
    },
    // Reducer to toggle the boolean value
    setBoolean2: (state, action) => {
        state.booleanValue2 = action.payload;
      },
  },
});

// Export the actions and reducer
export const { setText2, setBoolean2 } = textBooleanSlice.actions;
export default textBooleanSlice.reducer;