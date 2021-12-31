import Link from "next/link";
import { UserContext } from "../pages/UserContext";
import { useState, useMemo } from "react";
import Sidebar from './sidebar/Sidebar'

import dynamic from 'next/dynamic'

const DynamicSiderbarWithNoSSR = dynamic(
  () => import('../components/sidebar/Sidebar'),
  {ssr: false}
)


const Layout = ({children}: any) => {


  return ( 
  <> 
  <div className="LayoutDiv" >
  <div style={{width: '30%'}} className="leftSide">
    {/* <DynamicSiderbarWithNoSSR /> */}
    <Sidebar />
  </div>
  
  <div className="middle"style={{width: '40%'}} >
    { children }
  </div>

  <div className="rightSide" style={{width: '30%', display:'flex', justifyContent:'center'}}> Right Sided Content</div>
  </div>
  
  </> 
  );


}

export default Layout