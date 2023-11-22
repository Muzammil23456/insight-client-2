// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for text and boolean values
const peopleUMayKnow = createSlice({
  name: 'textBoolean3',
  initialState: {
    peopleUMayKnow: false
  },
  reducers: {
    setPeopleUMayKnow: (state, action) => {
        state.peopleUMayKnow = action.payload;
      }
  },
});

// Export the actions and reducer
export const {  setPeopleUMayKnow } = peopleUMayKnow.actions;
export default peopleUMayKnow.reducer;