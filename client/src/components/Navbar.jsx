import SearchBar from "./SearchBar"
import {PencilSquareIcon} from "@heroicons/react/24/solid"
import useMediaQuery from "./../hooks/useMediaQuery"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slice/userSlice";

const Navbar = () => {
    const {isLoggedIn,user} = useSelector(state=>state.user)
    const isScreenLarge = useMediaQuery("(min-width:1024px)");
    const [isAvatarOpen,setAvatarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    useEffect(()=>{

    },[isLoggedIn])
    return (
        <nav className="relative">
            <div className="bg-slate-300 flex justify-between items-center top-0 z-20 w-full py-3 lg:py-4">
                <div className="mx-auto w-11/12 lg:w-5/6 flex justify-between items-center">
                    <div className="gap-8 lg:gap-16 flex justify-between items-center w-full">
                        <div className="font-bold text-xl lg:text-4xl cursor-pointer" onClick={()=>navigateTo("/")}>NIKLOG</div>
                        <div className="w-2/3 flex justify-between items-center gap-8">
                            <SearchBar className="w-full max-w-[320px] lg:w-1/2"/>
                            <div className="flex justify-between items-center md:gap-4 xl:gap-8">
                                {isLoggedIn? isScreenLarge?<button className="text-xl flex" onClick={()=>navigateTo("/posts/create")}>Write <PencilSquareIcon className="ml-1 h-6 w-6"/></button>:<></>:<></>}
                                {!isLoggedIn?<button className="text-xl" onClick={()=>navigateTo(`/auth/login`)}>Login/Signup</button>
                                :<div className="text-xl hover:cursor-pointer h-12 w-12 rounded-full overflow-hidden border-2 border-black" onClick={()=>setAvatarOpen(!isAvatarOpen)}><img className="object-cover h-full w-full" src={user?.profilePic}/></div>}                                
                            </div>
                        </div>
                    </div>
                </div>
                {isAvatarOpen && isLoggedIn && <div className="h-36 w-32 bg-white border-2 rounded-lg border-gray-300 absolute right-2 lg:right-24 -bottom-36 z-40">
                    <div className="pl-4 py-2">
                        <div className="py-2 hover:cursor-pointer" onClick={()=>navigateTo("/posts/create")}>Write</div>
                        <div className="py-2 hover:cursor-pointer" onClick={()=>navigateTo(`/user/${user?.name}/`)}>My Profile</div>
                        <div className="py-2 hover:cursor-pointer" onClick={()=>dispatch(logoutUser())}>Log out</div>
                    </div>
                </div>}
            </div>
        </nav>

    )
}

export default Navbar