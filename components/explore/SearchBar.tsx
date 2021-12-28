import { useContext, useState} from 'react'
import Router, { useRouter } from "next/router";

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState(String)
  console.log(searchInput)

  const router = useRouter()

  const handleKeyPress = (event: any) => {
  if(event.key === 'Enter'){
    search()
    }
  }


  const search = () => {
    if (searchInput.length > 0){
      router.push(`/search/${searchInput}`)
    } else {
      console.log('please enter correct params')
    }
  }

  return (
  <>
    <div className='searchBar' >
        <input type="text" 
        placeholder="Search Flitter" 
        onChange={((e)=> {setSearchInput(e.target.value)})}
        onKeyPress={((e)=> {handleKeyPress(e)})}
        />
    </div>
  </>
  ); 

}

export default SearchBar