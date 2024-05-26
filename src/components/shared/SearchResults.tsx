import { searchResultsProps } from "@/types"
import { GridPostList } from "./GridPostList"
import Loader from "./Loader"

const SearchResults = ({isSearchFetching, searchedPosts}: searchResultsProps) => {
    if(isSearchFetching) return <Loader />

    if(searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents}/>
        )
    }
  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResults