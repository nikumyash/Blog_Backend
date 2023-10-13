import { useEffect } from "react"
import BlogGroup from "../components/BlogGroup"
import {useSelector,useDispatch} from "react-redux";
import Loading from "./../components/Loading"
import { getProfile } from "../slice/profileSlice";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const {slug} = useParams()
    const {isLoading,data,error} = useSelector(state=>state.profile);
    console.log(data)
    const user = data?.user;
    const isEditable = user?.isEditable;
    useEffect(()=>{
        dispatch(getProfile(slug));
    },[slug])
    if(isLoading)return <Loading/>
    if(error)return <PageNotFound/>
  return (
    <section className="w-full sm:mx-8 lg:w-5/6 lg:mx-auto">
        {user && (<div className="w-full h-120 flex flex-col sm:flex-row items-center sm:p-20 border-b-2 pb-2 border-gray-300">
                <div className="bg-blue-700 h-72 w-72">
                    <img className="w-full h-full object-cover" src={user.profilePic}/>
                </div>
                <div className="w-full px-4">
                    <h1 className="text-5xl py-2">{user?.name}</h1>
                    <h4 className="px-1 pb-2">Email:- {user?.email}</h4>
                    <h4 className="px-1 pb-2">Bio:- {user?.bio}</h4>
                    <h4 className="px-1 pb-2">Joined At:- {new Date(user?.createdAt).toDateString()}</h4>
                {isEditable && <button className="px-4 py-1 text-center border-2">Edit</button>}                
                </div>
            </div>
            )}
        {user && <div className="max-w-[1340px] mx-auto my-4">
                <h1 className="text-3xl my-4">Posts</h1>
                <BlogGroup posts={user?.posts} byNotReq={true} isEditable={isEditable}/>
            </div>}
    </section>
  )
}

export default ProfilePage