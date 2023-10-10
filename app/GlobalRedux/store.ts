'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import booleanReducer from './Features/new/newSlice'
 import editReducer from './Features/edit/editSlice'
 
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        edit: editReducer ,
        booleanValue: booleanReducer,
    }
})

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;