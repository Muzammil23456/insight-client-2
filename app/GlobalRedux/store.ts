'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import booleanReducer from './Features/new/newSlice'
import editReducer from './Features/edit/editSlice'
import textReducer from './Features/alert/alertSlice'
import textReducer2 from './Features/alert2/alert2Slice'
import textReducer3 from './Features/confirm/confirmSlice'
import registerSlice from './Features/Register/registerSlice';
import peopleUMayKnowSlice from './Features/PeopleUMayKnow/PeopleUMayKnowSlice'
import friendRequestsSlice from './Features/FriendRequests/FriendRequestsSlice'
 
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        edit: editReducer ,
        booleanValue: booleanReducer,
        textBoolean: textReducer,
        textReducer2: textReducer2,
        textReducer3: textReducer3,
        register: registerSlice,
        peopleUMayKnow: peopleUMayKnowSlice,
        friendRequests: friendRequestsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;