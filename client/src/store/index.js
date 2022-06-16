import { configureStore } from "@reduxjs/toolkit";
//Reducer
import properties from "./slice/properties";
import cities from "./slice/cities";
import auth from "./slice/auth";
import users from "./slice/user";

export const store = configureStore({
    reducer: {
        properties,
        cities,
        auth,
        users
    },
});

