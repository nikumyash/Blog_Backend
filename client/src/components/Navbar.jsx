import { Link } from 'react-router-dom'
import ContentWrapper from './ContentWrapper'
import SearchBar from './SearchBar'

const Navbar = () => {
    return (
    <ContentWrapper>
        <nav className="h-16 bg-blue-500 flex items-center justify-around flex-auto">
            <Link to="/" className="text-md md:text-lg font-bold mx-4">
                BlogItOut
            </Link>
            <SearchBar/>
            <div className='md:hidden m-4 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <ul className="hidden md:flex">
                <li><Link to="/browse" className='block mx-4'>Browse</Link></li>
                <li><Link to="/create"className='block mx-4'>Create a Blog</Link></li>
                <li><Link to="/user/profile" className='block mx-4'>Profile</Link></li>
            </ul>
        </nav>
    </ContentWrapper>
  )
}

export default Navbar