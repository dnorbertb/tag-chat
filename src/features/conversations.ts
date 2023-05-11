import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { dummyConversations } from '../_dummy/dummyData'

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

interface IConversationsState {
    value: ReturnType<typeof dummyConversations>
}

interface IAddMessagePayload {
    sentByUser: boolean,
    senderId: string,
    receiverId: string,
    content: string
}

interface IConversationIdPayload {
    id: string
}



const initialState: IConversationsState = {
    value: dummyConversations(new Date())
}

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addMessageToConversation: (state, action: PayloadAction<IAddMessagePayload>) => {
            const { senderId, receiverId, sentByUser, content } = action.payload;
            const msgType = sentByUser ? 'sent' : 'received';
            const convId = sentByUser ? receiverId : senderId
            const dateString = JSON.stringify(new Date());
            const conversation = state.value.find(conversation => conversation.id === convId);
            if (conversation) {
                conversation.messages.push({
                    type: msgType,
                    content: content
                });
                conversation.lastUpdate = dateString;
                conversation.unread = msgType === 'received';
            } else {
                state.value = [...state.value, {
                    id: convId,
                    type: 'direct-message',
                    unread: true,
                    contact: {
                        image: 'https://robohash.org/laboriosamfacilisrem.png',
                        firstName: convId,
                        lastName: 'Surname'
                    },
                    messages: [
                        {
                            type: msgType,
                            content: content
                        }
                    ],
                    lastUpdate: dateString
                }]
            }
        },
        setConversationAsRead: (state, action: PayloadAction<IConversationIdPayload>) => {
            const { payload: { id } } = action;
            const conversation = state.value.find(conversation => conversation.id === id);
            if (!conversation) return;
            conversation.unread = false;
            return;
        },
        removeConversation: (state, action: PayloadAction<IConversationIdPayload>) => {
            const { payload: { id } } = action;
            state.value = state.value.filter(c => c.id !== id);
        },
    }
})


export const { addMessageToConversation, setConversationAsRead, removeConversation } = conversationSlice.actions;