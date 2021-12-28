import { useContext, useState} from 'react'
import Router, { useRouter } from "next/router";

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState(String)
  console.log(searchInput)

  const router = useRouter()



  const search = () => {
    if (searchInput.length > 0){
      router.push(`/search/${searchInput}`)
    } else {
      console.log('please enter correct params')
    }
    
  }

  return (
  <>
    <div >
        <input  type="text" placeholder="Search" onChange={((e)=> {setSearchInput(e.target.value)})}/>
        <button style={{height: '18px'}} type="submit" onClick={((e)=> {search()})}> </button>
    </div>
  </>
  ); 

}

export default SearchBar