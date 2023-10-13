import axios from "axios";
const API_URL = "http://localhost:3000/api/posts/";

const deletePost = (url)=>{
    console.log(localStorage.getItem('user'));
    axios.delete(API_URL+url,{
        headers:{
            "x-access-token":localStorage.getItem('user')||"",
        }
    });
}

const PostService = {deletePost};

export default PostService;