import { createSlice } from '@reduxjs/toolkit'
import { dummyContacts } from '../_dummy/dummyData'


interface IContactsState {
    value: typeof dummyContacts
}

const initialState: IContactsState = {
    value: dummyContacts
}



export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {

    }
})