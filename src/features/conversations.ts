import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { dummyConversations } from '../_dummy/dummyData'

interface IConversationsState {
    value: ReturnType<typeof dummyConversations>
}

interface IAddMessagePayload {
    sentByUser: boolean,
    senderId: string,
    receiverId: string,
    content: string
}

export interface IConversation {
    id: string,
    type: 'direct-message' | 'group-message',
    unread: boolean,
    contact: {
        image: string,
        firstName: string,
        lastName: string
    },
    messages: Array<{ type: string, content: string }>,
    lastUpdate: string
}

const initialState: IConversationsState = {
    value: dummyConversations(new Date())
}

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addMessageToConversation: (state, action: PayloadAction<IAddMessagePayload>) => {
            const { payload } = action;
            const msgType = payload.sentByUser ? 'sent' : 'received';
            const dateString = JSON.stringify(new Date());
            const conversation = state.value.find(conversation => conversation.id === action.payload.senderId);
            if (conversation) {
                conversation.messages.push({
                    type: msgType,
                    content: payload.content
                });
                conversation.lastUpdate = dateString;
                conversation.unread = msgType === 'received';
            } else {
                state.value.push({
                    id: payload.senderId,
                    type: 'direct-message',
                    unread: true,
                    contact: {
                        image: 'https://robohash.org/laboriosamfacilisrem.png',
                        firstName: payload.senderId,
                        lastName: 'Surname'
                    },
                    messages: [
                        {
                            type: msgType,
                            content: payload.content
                        }
                    ],
                    lastUpdate: dateString
                });
            }
        },
        setConversationAsRead: (state, action) => {

        },
    }
})