import { colors } from "../styles/colors";

export const tagsData = [
    {
        color: colors.blue300,
        category: 'Activities',
        tagList: [{
            tagName: 'Football',
            actionsCount: 44
        }]
    },
    {
        color: '#ff6e3e',
        category: 'Location',
        tagList: [
            {
                tagName: 'San Francisco',
                actionsCount: 38
            },
            {
                tagName: 'Sczecin',
                actionsCount: 22
            },
            {
                tagName: 'Turkey',
                actionsCount: 8
            },
            {
                tagName: 'Mexico',
                actionsCount: 2
            },
            {
                tagName: 'Brazil',
                actionsCount: 1
            },
        ]
    },
    {
        color: '#7f3eff',
        category: 'Work',
        tagList: [
            {
                tagName: 'Morgan Stanley',
                actionsCount: 11
            },
            {
                tagName: 'Riotters',
                actionsCount: 5
            }
        ]
    },
    {
        color: '#ffab3e',
        category: 'Friends',
        tagList: [
            {
                tagName: 'Long Term',
                actionsCount: 14
            },
            {
                tagName: 'Travel Buddies',
                actionsCount: 5
            },
            {
                tagName: 'Close Friends',
                actionsCount: 14
            },
            {
                tagName: 'Going Out Friends',
                actionsCount: 14
            },
        ]
    },
]

export const dummyConversations = [
    {
        image: '',
        type: 'direct-message',
        contactName: 'David Zielinski',
        lastMessage: {
            author: 'You',
            content: 'Are you free tonight? 😇🐶'
        }
    },
    {
        image: '',
        type: 'direct-message',
        contactName: 'Emily Barrson',
        lastMessage: {
            author: 'Emily',
            content: 'Nice!'
        }
    },
    {
        image: '',
        type: 'direct-message',
        contactName: 'Ez Dejesus',
        lastMessage: {
            author: 'Ez',
            content: 'How are You?'
        }
    },
    {
        image: '',
        type: 'direct-message',
        contactName: 'Fara Lolson',
        lastMessage: {
            author: 'Fara',
            content: 'I have a new dog! 🐶'
        }
    },
    {
        image: '',
        type: 'direct-message',
        contactName: 'Daniel Gibson',
        lastMessage: {
            author: 'Daniel',
            content: 'Would you like a beer?'
        }
    },
]