// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for text and boolean values
const RegisterSlice = createSlice({
  name: 'Register',
  initialState: {
    signIn: false,
    signUp: false,
  },
  reducers: {

    // Reducer to toggle the boolean value
    setSignIn: (state, action) => {
        state.signIn = action.payload;
      },
      setSignUp: (state, action) => {
        state.signUp = action.payload;
      },
  },
});

// Export the actions and reducer
export const { setSignIn,setSignUp } = RegisterSlice.actions;
export default RegisterSlice.reducer;