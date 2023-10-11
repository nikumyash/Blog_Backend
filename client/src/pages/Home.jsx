import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { getFeed } from "../slice/feedSlice";
import BlogCategoryGroup from "../components/BlogCategoryGroup";
import Loading from "../components/Loading";

const Home = () => {
  const {isLoading,data,error} = useSelector(state=>state.feed)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getFeed())
  },[]);
  console.log(data);
  return (
    <>
    { isLoading? <Loading/> :
      (<div className="w-5/6 mx-auto my-16">
          {
            data?.map((cat)=>cat.count>0?<BlogCategoryGroup key={cat.name} cat={cat}/>:<></>
          )}
      </div>)
    }
    </>
  )
}

export default Home