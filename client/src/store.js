import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import feedSlice from "./slice/feedSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice
    },
    devTools:true
})

export default store;