// booleanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBoolean: false,
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
  },
});

export const { toggleBoolean, setBool } = booleanSlice.actions;
// export const selectBoolean = (state) => state.booleanState.isBoolean;
export default booleanSlice.reducer;
