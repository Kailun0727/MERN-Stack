import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePageContext } from "../hooks/usePageContext";

const SearchBar = () =>{
    const [search, setSearch] = useState('')

    const {user} = useAuthContext()

   

    const {searchWorkout} = useSearch()

    const handleSearch = async (e) => {
        e.preventDefault()

        if(!user){
            return
          }

        await searchWorkout(search)

    }

    return (
        <form onSubmit={handleSearch} className="search">
            <div className="search">
                <input
                    className="search"
                    placeholder="Enter exercise title to search"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button className="search">Search</button>
            </div>
         
        </form>
    )
}

export default SearchBar;