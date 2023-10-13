import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import feedSlice from "./slice/feedSlice";
import profileSlice from "./slice/profileSlice";
import postSlice from "./slice/postSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        profile:profileSlice,
        postSlice:postSlice
    },
    devTools:true
})

export default store;