import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    user: {},
    error: false,
    loading: false,
}

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
        }
    }
});

export const { setCreateUser, setCreateUserSucces, setCreateUserError } = userSlice.actions;

export default userSlice.reducer;