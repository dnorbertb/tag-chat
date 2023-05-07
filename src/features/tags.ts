import { createSlice } from '@reduxjs/toolkit'
import { tagsData } from '../_dummy/dummyData'


interface ITagsState {
    value: typeof tagsData
}

const initialState: ITagsState = {
    value: tagsData
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: initialState,
    reducers: {
    }
})