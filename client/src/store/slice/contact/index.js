import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isContactSent: false,
};

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContactMe: (state) => {
            state.loading = true;
            state.isContactSent = false;
        },
        setContactMeSucces: (state, action) => {
            state.loading = false;
            state.isContactSent = true;
        },
        setContactMeError: (state) => {
            state.loading = false;
            state.isContactSent = false;
        },
        resetIsSent: (state) => {
            state.isContactSent = false;
        }
    },
});

export const {
    setContactMe,
    setContactMeSucces,
    setContactMeError,
    resetIsSent
} = contactSlice.actions;

export default contactSlice.reducer;
