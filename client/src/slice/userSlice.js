import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import AuthService from "../services/auth.service"

export const registerUser = createAsyncThunk("auth/signup",
    async(userData,thunkApi)=>{
        try{
            const res = await AuthService.signup(userData);
            return res.data.data.user;
        }
        catch(err){
            return thunkApi.rejectWithValue(err?.response?.data?.error);
        }
    }
)

export const loginUser = createAsyncThunk("auth/login",
    async(userData,thunkApi)=>{
        try{
            const res = await AuthService.login(userData);
            return res.data.data.user;
        }
        catch(err){
            return thunkApi.rejectWithValue(err?.response?.data?.error)       
        }
    }
)

export const logoutUser = createAsyncThunk("auth/logout",
    async()=>{
        await AuthService.logout();
    }
)

const user = JSON.parse(localStorage.getItem("user")) || null;
const initialState = user?{
    isLoggedIn:true,
    user,
    error:null
}:{
    isLoggedIn:false,
    user:null,
    error:null
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(registerUser.fulfilled,(state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
        }),
        builder.addCase(registerUser.rejected,(state, action) => {
            state.isLoggedIn = false;
            state.error = action.payload;
        }),
        builder.addCase(loginUser.fulfilled,(state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
        }),
        builder.addCase(loginUser.rejected,(state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        }),
        builder.addCase(logoutUser.fulfilled,(state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
        })
    }
})

export default userSlice.reducer;