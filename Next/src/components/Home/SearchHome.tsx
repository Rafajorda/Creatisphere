
'use server'
import { handleSearch } from "./handleSearch";
 const SearchHome = async () => {
  

  return (
    <form action={handleSearch} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          name="search"
          className="w-full p-4 pr-12 text-lg border-2 border-gray-300 rounded-full shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-blue-500 p-2 text-white transition hover:bg-blue-600"
        >
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchHome;

