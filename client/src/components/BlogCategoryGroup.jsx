import BlogCard from "./BlogCard"

const BlogCategoryGroup = ({cat}) => {
    return (
    <div className="w-full my-16">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl">{cat.name}</h1>
            <div className="text-lg hover:underline hover:cursor-pointer text-blue-700">View More</div>
        </div>
        <div className="w-full border-t-2 pt-2 flex flex-wrap gap-4 border-gray-300">
            {cat?.posts?.map(elem=><BlogCard key={elem.url} blog={elem}/>)}
        </div>
    </div>
  )
}

export default BlogCategoryGroup