import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../services/post.service";


export const deletePost = createAsyncThunk("post/delete",
async (url,thunkAPI)=>{
    try{
        await PostService.deletePost(url);
    }catch (err){
        return thunkAPI.rejectWithValue(err?.response?.data?.error);
    }
})
const initialState = {
    isLoading:false,
    data:null,
    error:null,
}
const postSlice = createSlice({
    name:"post",
    initialState,
})

export default postSlice.reducer;