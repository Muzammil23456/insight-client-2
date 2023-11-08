// booleanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBoolean: false,
  isBloolean2: false
};

const booleanSlice = createSlice({
  name: 'booleanState',
  initialState,
  reducers: {
    toggleBoolean: (state) => {
      state.isBoolean = !state.isBoolean;
    },
    setBool: (state, action) => {
      state.isBoolean = action.payload;
    },
    setBool2: (state, action) => {
      state.isBloolean2 = action.payload;
    }
  },
});

export const { toggleBoolean, setBool, setBool2 } = booleanSlice.actions;
export default booleanSlice.reducer;
