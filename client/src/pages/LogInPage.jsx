import { useState } from "react"
import {useForm} from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

const validationSchema = z.object({
    email: z.string().min(1,{message:"Email is required"}).email({message:"Must be a valid email"}),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
})

const LogInPage = () => {
    const {register,handleSubmit,formState:{errors}} = useForm({resolver:zodResolver(validationSchema)})
    const [formData,setFormData] = useState(null);
    return (
        <div className="h-full w-full flex justify-center items-center">
            <form onSubmit={handleSubmit((data)=>setFormData(data))} className="w-11/12 h-full max-w-[400px] flex flex-col justify-center max-h-[500px] bg-gray-100 rounded-lg border-2 border-gray-300">
                <div className="text-3xl text-center pt-4">LOGIN</div>
                <div className="w-11/12 pt-8 mx-auto">
                    <h1 className="py-2 px-1 text-xl">Email</h1>
                    <input {...register("email")} placeholder="Email" className="w-full py-3 pl-2 focus:outline-none rounded-lg border-2 border-gray-300"/>
                    {errors.email && <p className="text-red-400 text-sm px-1 pl-1">{errors.email?.message}</p>}
                    <h1 className="py-2 px-1 text-xl">Password</h1>
                    <input {...register("password")} placeholder="Password" className="w-full py-3 pl-2 focus:outline-none rounded-lg border-2 border-gray-300"/>
                    {errors.password && <p className="text-red-400 text-sm px-1 pl-1">{errors.password?.message}</p>}
                    <div className="py-2"><a className="hover:underline text-md px-1 py-4" href="/auth/forgotpassword">Forgot Password?</a></div>
                </div>
                <div className="flex w-11/12 mx-auto items-center justify-center border-b-2 border-gray-300 py-6">
                    <button type="submit" className="py-2 px-4 w-2/5 rounded-3xl bg-blue-600 text-white hover:underline drop-shadow">Log In</button>
                </div>
                <div className="text-lg mx-auto py-4">Not a Member? <a className="text-blue-600 hover:underline" href="/auth/signup">Signup</a></div>
            </form>
        </div>
  )
}

export default LogInPage