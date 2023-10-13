import BlogCard from "./BlogCard"

const BlogGroup = ({posts,byNotReq,extraStyle,isEditable}) => {
  return (
    <div className={"w-full flex flex-wrap gap-4 " + extraStyle}>
            {posts?.map(elem=><BlogCard key={elem.url} byNotReq={byNotReq} blog={elem} isEditable={isEditable}/>)}
    </div>
  )
}

export default BlogGroup