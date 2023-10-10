// booleanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBoolean: false,
};

const editSlice = createSlice({
  name: 'booleanState',
  initialState,
  reducers: {
    toggleBooleanValue: (state) => {
      state.isBoolean = !state.isBoolean;
    },
    setBooleanValue: (state, action) => {
      state.isBoolean = action.payload;
    },
  },
});

export const { toggleBooleanValue, setBooleanValue } = editSlice.actions;
// export const selectBoolean = (state) => state.booleanState.isBoolean;
export default editSlice.reducer;
