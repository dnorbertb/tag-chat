import { createSlice } from '@reduxjs/toolkit'
import { dummyConversations } from '../_dummy/dummyData'

interface IConversationsState {
    value: ReturnType<typeof dummyConversations>
}

const initialState: IConversationsState = {
    value: dummyConversations(new Date())
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