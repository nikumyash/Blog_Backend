import SearchBar from "./SearchBar"
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon"
import useMediaQuery from "./../hooks/useMediaQuery"

const Navbar = () => {
    const isScreenLarge = useMediaQuery("(min-width:1024px)")
    return (
        <nav>
            <div className="bg-slate-300 flex justify-between items-center fixed top-0 z-20 w-full py-3 lg:py-6">
                <div className="mx-auto w-11/12 lg:w-5/6 flex justify-between items-center">
                    <div className="gap-8 lg:gap-16 flex justify-between items-center w-full">
                        <div className="font-bold text-xl lg:text-4xl">NIKLOG</div>
                        <div className="w-2/3 flex justify-between items-center gap-8">
                            <SearchBar className="w-full max-w-[300px] lg:w-1/2"/>
                            {isScreenLarge?(<div className="flex justify-between items-center md:gap-4 xl:gap-8">
                                <button className="text-xl">Explore</button>
                                <button className="text-xl">Log In</button>
                                <button className="text-xl">Sign In</button>
                            </div>):(
                                <Bars3Icon className="h-6 w-6 sm:h-8 sm:w-8"/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar