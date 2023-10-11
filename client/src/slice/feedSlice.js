import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URI = "http://localhost:3000/api/"

export const getFeed = createAsyncThunk("home/feed",
    async (arg,thunkAPI)=>{
        try{
            const res = await axios.get(API_URI+"feed");
            return res.data.data;
        }catch (err){
            return thunkAPI.rejectWithValue(err?.response?.data?.error);
        }
    }
)

const initialState = {
    data:null,
    isLoading:false,
    error:null
};

export const feedSlice = createSlice({
    name:"feed",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getFeed.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(getFeed.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(getFeed.pending,(state,action)=>{;
            state.isLoading = true;
            state.error = null;
        })
    }
})

export default feedSlice.reducer;