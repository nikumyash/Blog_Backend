

const BlogCard = ({blog}) => {
  return (
          <div className="h-[460px] min-w-[300px] max-w-[330px] rounded-lg border-2 border-gray-300">
                {blog.thumbnailImage && (<div className="w-full">
                    <img  className="object-cover w-full h-full bg-blue-300" src={blog.thumbnailImage} alt="image couldnt be loaded"></img>
                </div>)}
                <div className="px-2">
                    <h1 className="py-2 text-xl text-blue-700 font-bold hover:underline cursor-pointer">
                        {blog?.title.slice(0,50)+"..."}
                    </h1>
                    <p className="pt-2">
                        {blog?.content.slice(0,150)+"..."} 
                    </p>
                    <div className="pt-2 flex justify-between">
                        <p>By : <span className="hover:cursor-pointer hover:underline">{blog?.author?.name}</span></p>
                        <p>{new Date(blog?.createdAt).toLocaleString()}</p>
                    </div>
                </div>
          </div>
  )
}

export default BlogCard