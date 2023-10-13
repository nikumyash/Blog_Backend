import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../services/profile.service"

export const getProfile = createAsyncThunk("/user/profile",
async (userName,thunkAPI)=>{
    try{
        const res = await ProfileService.getProfile(userName);
        return res?.data;
    }
    catch (err){
        return thunkAPI.rejectWithValue(err?.response?.data?.error);
    }
})

const initialState = {
    data:null,
    isLoading:false,
    error:null
}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(getProfile.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(getProfile.pending,(state,action)=>{;
            state.isLoading = true;
            state.error = null;
        })
    }
})
export default profileSlice.reducer;