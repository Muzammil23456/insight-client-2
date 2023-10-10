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
    setBoolean: (state, action) => {
      state.isBoolean = action.payload;
    },
  },
});

export const { toggleBoolean, setBoolean } = booleanSlice.actions;
// export const selectBoolean = (state) => state.booleanState.isBoolean;
export default booleanSlice.reducer;
