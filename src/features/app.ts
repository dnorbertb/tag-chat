import { createSlice, type PayloadAction } from '@reduxjs/toolkit'



interface IAppState {
    value: {
        userId: string
    }
}

const initialState: IAppState = {
    value: {
        userId: ''
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.value.userId = action.payload;
        }
    }
});

export const { setUserId } = appSlice.actions;