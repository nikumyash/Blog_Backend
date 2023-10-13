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
  return (
    <section className="w-full sm:mx-8 lg:w-5/6 lg:mx-auto mt-16">
      <div className="w-full mx-auto">{ isLoading? <Loading/> :
        (<div className="max-w-[1500px]">
            {
              data?.map((cat)=>cat.count>0?<BlogCategoryGroup key={cat.name} cat={cat}/>:<></>
            )}
        </div>)
      }</div>
    </section>
  )
}

export default Home