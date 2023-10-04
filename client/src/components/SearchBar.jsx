import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex items-center bg-slate-50 border-gray-400 border-2 flex-grow max-w-md'>
        <input type="text" placeholder="Search.." className="p-2 bg-inherit flex-1 focus:outline-none" />
        <div className='block p-2 right-0'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        </div>
    </div>
  )
}

export default SearchBar