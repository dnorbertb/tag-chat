import { createSlice } from '@reduxjs/toolkit'
import { dummyConversations } from '../_dummy/dummyData'

interface IConversationsState {
    value: typeof dummyConversations
}

const initialState: IConversationsState = {
    value: dummyConversations
}

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addMessage: (state, action) => {

        },
        setAsUnread: (state, action) => {

        }
    }
})