import SearchBar from "./SearchBar"
import {Bars3Icon,XMarkIcon} from "@heroicons/react/24/solid"
import useMediaQuery from "./../hooks/useMediaQuery"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const isScreenLarge = useMediaQuery("(min-width:1024px)");
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const navigateTo = useNavigate();
    
    return (
        <nav>
            <div className="bg-slate-300 flex justify-between items-center  top-0 z-20 w-full py-3 lg:py-6">
                <div className="mx-auto w-11/12 lg:w-5/6 flex justify-between items-center">
                    <div className="gap-8 lg:gap-16 flex justify-between items-center w-full">
                        <div className="font-bold text-xl lg:text-4xl cursor-pointer" onClick={()=>navigateTo("/")}>NIKLOG</div>
                        <div className="w-2/3 flex justify-between items-center gap-8">
                            <SearchBar className="w-full max-w-[320px] lg:w-1/2"/>
                            {isScreenLarge?(<div className="flex justify-between items-center md:gap-4 xl:gap-8">
                                <button className="text-xl">Explore</button>
                                <button className="text-xl" onClick={()=>navigateTo(`/auth/login?redirect=${window.location}`)}>Login/Signup</button>
                                {/* <button className="text-xl">Sign In</button> */}
                            </div>):(
                                <Bars3Icon className="h-6 w-6 sm:h-8 sm:w-8" onClick={()=>setIsMenuOpen(true)}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!isScreenLarge && isMenuOpen && (<div className="fixed z-30 bg-slate-400 right-0 bottom-0 h-full w-[300px] drop-shadow-2xl">
                    <div className="flex justify-end p-2">
                        <XMarkIcon className="h-12 w-12 text-gray-300" onClick={()=>setIsMenuOpen(false)}/>
                    </div>
                    <div className="p-4 pb-0">
                        <div className="text-2xl border-b-2 border-gray-300 py-2 px-4">Home</div>
                        <div className="text-2xl border-b-2 border-gray-300 py-2 px-4">Explore</div>
                        <div className="text-2xl border-b-2 border-gray-300 py-2 px-4" onClick={()=>navigateTo(`/auth/login?redirect=${window.location}`)}>Log In/Sign Up</div>
                    </div>
                    <div className="bottom-0 px-4">
                        <div className="text-2xl border-b-2 border-gray-300 py-2 px-4">Create a Blog</div>
                        <div className="text-2xl border-b-2 border-gray-300 py-2 px-4">Manage Blogs</div>
                        <div className="text-2xl border-b-2 border-gray-300 py-2 px-4">My Profile</div>
                    </div>
            </div>)}
        </nav>

    )
}

export default Navbar