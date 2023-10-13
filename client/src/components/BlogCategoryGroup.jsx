import { useNavigate } from "react-router-dom"
import BlogCard from "./BlogCard"
import BlogGroup from "./BlogGroup"

const BlogCategoryGroup = ({cat}) => {
    const navigateTo = useNavigate();
    return (
    <div className="max-w-[1340px] mx-auto w-11/12 mb-16">
        <div className="flex items-center px-2 justify-between">
            <h1 className="text-3xl">{cat.name}</h1>
            <div className="text-lg hover:underline hover:cursor-pointer text-blue-700" onClick={()=>navigateTo("/posts/search?cat="+encodeURIComponent(cat?.name))}>View More</div>
        </div>
        <BlogGroup posts={cat?.posts} extraStyle={"border-t-2 pt-2 border-gray-300"}/>
    </div>
  )
}

export default BlogCategoryGroup