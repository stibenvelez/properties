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
            state.error = false;
        },
        setGetUserError: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = true
        },
        setUpdateUser: (state) => {
            state.loading = true;
        },
        setUpdateUserSucces: (state, action) => {
            state.loading = false;
        },
        setUpdateUserError: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = true
        }
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
    setUpdateUser,
    setUpdateUserSucces,
    setUpdateUserError,
} = userSlice.actions;

export default userSlice.reducer;
