import axios from "axios";

const API_URL = "http://localhost:3000/api/user/";

const getProfile = (userName)=>{
    return axios.get(API_URL + userName )
    .then((res)=>res.data)
}


const ProfileService = {getProfile}

export default ProfileService;