// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for text and boolean values
const friendRequests = createSlice({
  name: 'textBoolean3',
  initialState: {
    friendRequests: false
  },
  reducers: {
    setFriendRequests: (state, action) => {
        state.friendRequests = action.payload;
      }
  },
});

// Export the actions and reducer
export const {  setFriendRequests } = friendRequests.actions;
export default friendRequests.reducer;