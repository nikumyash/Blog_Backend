import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon"

// eslint-disable-next-line react/prop-types
const SearchBar = ({className}) => {
  return (
    <div className={className}>
        <div className="rounded-3xl bg-white flex items-center border-black border-2">
          <input className="w-full rounded-l-3xl pl-4 py-2 focus:outline-none" placeholder="Search..."></input>
          <div className="flex items-center justify-center p-2">
            <MagnifyingGlassIcon className="h-6 w-6 hover:cursor-pointer"/>
          </div>
        </div>
    </div>
  )
}

export default SearchBar