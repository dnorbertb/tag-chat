import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import { tagsSlice } from "../features/tags";
import { contactSlice } from '../features/contacts';
import { conversationSlice } from '../features/conversations';
import { appSlice } from '../features/app';

type RootState = ReturnType<typeof appDataStore.getState>
type AppDispatch = typeof appDataStore.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const appDataStore = configureStore({
    reducer: {
        app: appSlice.reducer,
        tags: tagsSlice.reducer,
        contacts: contactSlice.reducer,
        conversations: conversationSlice.reducer
    }
})