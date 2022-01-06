import Sidebar from './sidebar/Sidebar'
import { useRouter } from "next/router";
import Trending from "./explore/Trending";
import SearchBar from "./explore/SearchBar";


const Layout = ({children}: any) => {

  const router = useRouter()

  return ( 
  <> 
  <div className="LayoutDiv" >
  <div style={{}} className="leftSide">
    <Sidebar />
  </div>
  
  <div className="middle" >
    { children }
  </div>
  
  <div className="rightSide" >
    <SearchBar />
    <Trending />
  </div>
    
  </div>
  
  </> 
  );


}

export default Layout