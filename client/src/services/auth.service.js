import axios from "axios";

const API_URL = "http://localhost:3000/api/user/auth/";

const signup = (userData)=>{
    return axios.post(API_URL+"signup",{
        name:userData.name,
        email:userData.email,
        password:userData.password
    }).then((res)=>{
        if(res.data?.data?.token){
            localStorage.setItem("user",JSON.stringify(res.data.data))
        }
        return res
    })
}
const login = (userData)=>{
    return axios.post(API_URL+"login",{
        email:userData.email,
        password:userData.password
    }).then((res)=>{
        if(res.data.data.token){
            localStorage.setItem("user",JSON.stringify(res.data.data))
        }
        return res
    })
}

const logout = () => {
    localStorage.removeItem("user");
};
const AuthService = {signup,login,logout}

export default AuthService;