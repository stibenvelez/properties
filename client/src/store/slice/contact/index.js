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
        },
        setGetToContact: (state) => {
            state.loading = true;
        },
        setGetToContactSuccess: (state, action) => {
            state.loading = false;
            state.toContactList = action.payload;
        },
        setGetToContactError: (state) => {
            state.loading = false;
        }

    },
});

export const {
    setContactMe,
    setContactMeSucces,
    setContactMeError,
    resetIsSent,
    setGetToContact,
    setGetToContactSuccess,
    setGetToContactError,
    
} = contactSlice.actions;

export default contactSlice.reducer;
