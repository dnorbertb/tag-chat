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
        id: 0,
        image: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        type: 'direct-message',
        contactName: 'David Zielinski',
        lastMessage: {
            author: 'You',
            content: 'Are you free tonight? 😇🐶'
        }
    },
    {
        id: 1,
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        type: 'direct-message',
        contactName: 'Emily Barrson',
        lastMessage: {
            author: 'Emily',
            content: 'Nice!'
        }
    },
    {
        id: 2,
        image: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=1600',
        type: 'direct-message',
        contactName: 'Ez Dejesus',
        lastMessage: {
            author: 'Ez',
            content: 'How are You?'
        }
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        type: 'direct-message',
        contactName: 'Fara Lolson',
        lastMessage: {
            author: 'Fara',
            content: 'I have a new dog! 🐶'
        }
    },
    {
        id: 4,
        image: 'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        type: 'direct-message',
        contactName: 'Daniel Gibson',
        lastMessage: {
            author: 'Daniel',
            content: 'Would you like a beer?'
        }
    },
]