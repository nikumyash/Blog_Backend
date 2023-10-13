import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const signup = (userData)=>{
    return axios.post(API_URL+"signup",{
        name:userData.name,
        email:userData.email,
        password:userData.password
    }).then((res)=>{
        console.log(res.data);
        if(res.data?.data?.accessToken){
            localStorage.setItem("token",res.data?.data?.accessToken);
            localStorage.setItem("user",JSON.stringify(res.data?.data?.user));
        }
        return res;
    })
}
const login = (userData)=>{
    return axios.post(API_URL+"login",{
        email:userData.email,
        password:userData.password
    }).then((res)=>{
        console.log(res.data);
        if(res.data?.data?.accessToken){
            localStorage.setItem("token",res.data?.data?.accessToken);
            localStorage.setItem("user",JSON.stringify(res.data?.data?.user));
        }
        return res
    })
}

const logout = async () => {
    await axios.put(API_URL+"logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
const AuthService = {signup,login,logout}

export default AuthService;