import { useNavigate } from "react-router-dom"

const BlogCard = ({blog,byNotReq}) => {
    const navigateTo = useNavigate()
  return (
          <div className="h-[460px] w-[300px] mx-auto md:m-0 shadow-lg overflow-hidden rounded-lg border-2 border-gray-300relative">
                {blog.thumbnailImage && (<div className="h-[200px]">
                    <img  className="object-cover w-full h-full bg-blue-300" src={blog.thumbnailImage} alt="Image couldnt be loaded"></img>
                </div>)}
                <div className="px-2">
                    <h1 className="py-2 text-xl text-blue-700 font-bold break-words hover:underline cursor-pointer">
                        {blog.title.size>50?blog.title.slice(0,50) +"...":blog.title}
                    </h1>
                    <p className="pt-2 w-full break-words">
                        {blog.content.size>100?blog.content.slice(0,100)+"...":blog.content} 
                    </p>
                    <div className="pt-2 flex justify-between">
                    {!byNotReq && <p>By : <span className="hover:cursor-pointer hover:underline" onClick={()=>navigateTo("/user/"+blog?.author?.name)}>{blog?.author?.name}</span></p>}                       
                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
          </div>
  )
}

export default BlogCard