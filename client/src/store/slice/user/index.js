import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    user: {},
    error: false,
    loading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCreateUser: (state) => {
            state.loading = true;
        },
        setCreateUserSucces: (state, action) => {
            state.loading = false;
        },
        setCreateUserError: (state) => {
            state.loading = false;
        },
        setGetUsers: (state) => {
            state.loading = true;
        },
        setGetUsersSucces: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        setGetUsersError: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = true
        },
        setGetUser: (state) => {
            state.loading = true;
        },
        setGetUserSucces: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        setGetUserError: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = true
        },
    },
});

export const {
    setCreateUser,
    setCreateUserSucces,
    setCreateUserError,
    setGetUsers,
    setGetUsersSucces,
    setGetUsersError,
    setGetUser,
    setGetUserSucces,
    setGetUserError,
} = userSlice.actions;

export default userSlice.reducer;
