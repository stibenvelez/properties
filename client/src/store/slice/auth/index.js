import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: false,
        user: {},
        msg: null,
        loading: false,
        error: false,
    },
    reducers: {
        setAuth: (state) => {
            state.loading = true;
        },
        setAuthSuccess: (state, action) => {
            state.auth = action.payload;
            state.loading = false;
        },
        setAuthError: (state) => {
            state.loading = false;
            state.error = true;
        },
        setLogin: (state) => {
            state.loading = true;
            state.error = false;
            state.msg = "";
        },
        setLoginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.auth = true;
            state.error = false;
            state.msg = "";
        },
        setLoginError: (state, action) => {
            state.loading = false;
            state.error = true;
            state.auth = false;
            state.msg = action.payload;
        },
    },
});

export const {
    setAuth,
    setAuthSuccess,
    setAuthError,
    setLogin,
    setLoginSuccess,
    setLoginError,
} = authSlice.actions;

export default authSlice.reducer;
