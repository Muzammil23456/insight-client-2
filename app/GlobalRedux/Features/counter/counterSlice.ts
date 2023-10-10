'use client';

import { createSlice } from "@reduxjs/toolkit";



// const initialState= {
//     value: []
// }

export const counterSlice = createSlice({
    name: 'counter',
    initialState: [],
    reducers: {
        setField: (state,action) => {
            return action.payload
        }
    }
})

export const {setField} = counterSlice.actions;
export default counterSlice.reducer;