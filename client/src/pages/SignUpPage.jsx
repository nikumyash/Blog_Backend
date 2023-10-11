import { useEffect } from "react"
import {useForm} from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../slice/userSlice";

const validationSchema = z.object({
    name: z.string().min(1,{message:"Username is required"}),
    email: z.string().min(1,{message:"Email is required"}).email({message:"Must be a valid email"}),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required" }),
}).refine((data)=>data.password === data.confirmPassword,{
    path:["confirmPassword"],
    message:"Passwords don't match"
})

const SignUpPage = () => {
    const {register,handleSubmit,formState:{errors}} = useForm({resolver:zodResolver(validationSchema)})
    const {isLoggedIn,error} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    useEffect(()=>{
        if(isLoggedIn)navigateTo("/");
        else navigateTo("/auth/signup")
    },[isLoggedIn,navigateTo,error])
    const submit = (data)=>{
        dispatch(registerUser(data));
    }
    return (
        <div className="h-full w-full flex justify-center items-center">
            <form onSubmit={handleSubmit(submit)} className="w-11/12 h-full max-w-[400px] flex flex-col justify-center max-h-[700px] bg-gray-100 rounded-lg border-2 border-gray-300">
                <div className="text-3xl text-center pt-4">Sign Up</div>
                <div className="w-11/12 pt-8 mx-auto">
                    <h1 className="py-2 px-1 text-lg">Username</h1>
                    <input {...register("name")} placeholder="Username" className="w-full py-3 pl-2 focus:outline-none rounded-lg border-2 border-gray-300"/>
                    {errors.name && <p className="text-red-400 text-sm px-1 pl-1">{errors.name?.message}</p>}
                    <h1 className="py-2 px-1 text-lg">Email</h1>
                    <input {...register("email")} placeholder="Email" className="w-full py-3 pl-2 focus:outline-none rounded-lg border-2 border-gray-300"/>
                    {errors.email && <p className="text-red-400 text-sm px-1 pl-1">{errors.email?.message}</p>}
                    <h1 className="py-2 px-1 text-lg">Password</h1>
                    <input {...register("password")} type="password" placeholder="Password" className="w-full py-3 pl-2 focus:outline-none rounded-lg border-2 border-gray-300"/>
                    {errors.password && <p className="text-red-400 text-sm px-1 pl-1">{errors.password?.message}</p>}
                    <h1 className="py-2 px-1 text-lg">Confirm Password</h1>
                    <input {...register("confirmPassword")} type="password" placeholder="Password" className="w-full py-3 pl-2 focus:outline-none rounded-lg border-2 border-gray-300"/>
                    {errors.confirmPassword && <p className="text-red-400 text-sm px-1 pl-1">{errors.confirmPassword?.message}</p>}
                </div>
                {error && (<div className="text-red-600 mx-auto text-xl">{error}</div>)}
                <div className="flex w-11/12 mx-auto items-center justify-center border-b-2 border-gray-300 py-6">
                    <button type="submit" className="py-2 px-4 w-2/5 rounded-3xl bg-blue-600 text-white hover:underline drop-shadow">Sign In</button>
                </div>
                <div className="text-lg mx-auto py-4">Already Registered? <a className="text-blue-600 hover:underline" href="/auth/login">Login</a></div>
            </form>
        </div>
  )
}

export default SignUpPage
