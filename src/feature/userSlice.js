import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action) => {
            state.users = action.payload
        },
        deleteUserFromList: (state, action) => {
            state.users.splice(action.payload, 1)
        },
    },
})

export const { storeUser, deleteUserFromList } = userSlice.actions;
export default userSlice.reducer;
