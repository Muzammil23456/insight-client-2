// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for text and boolean values
const textBooleanSlice = createSlice({
  name: 'textBoolean3',
  initialState: {
    text3: '',
    booleanValue3: false,
    text4: '',
    booleanValue4: false,
    Continue:false
  },
  reducers: {
    // Reducer to update the text value
    setText3: (state, action) => {
      state.text3 = action.payload;
    },
    // Reducer to toggle the boolean value
    setBoolean3: (state, action) => {
        state.booleanValue3 = action.payload;
      },
      setText4: (state, action) => {
        state.text4 = action.payload;
      },
      // Reducer to toggle the boolean value
      setBoolean4: (state, action) => {
          state.booleanValue4 = action.payload;
        },
      setContinue: (state, action) => {
        state.Continue = action.payload;
      },
  },
});

// Export the actions and reducer
export const { setText3, setBoolean3,setText4, setBoolean4,setContinue } = textBooleanSlice.actions;
export default textBooleanSlice.reducer;