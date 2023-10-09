import { useEffect, useState } from "react"

function useMediaQuery(query) {
    const [matches,setMatches] = useState(false);
    useEffect(()=>{
        const res = window.matchMedia(query);
        if(res.matches!==matches){
            setMatches(res.matches);
        }
        const listener = ()=>setMatches(res.matches);
        console.log(res.matches)
        window.addEventListener("resize",listener);
        return ()=> window.removeEventListener("resize",listener)
    },[query,matches])
    return matches;
}

export default useMediaQuery