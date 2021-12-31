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
  <div style={{}} className="leftSide">
    {/* <DynamicSiderbarWithNoSSR /> */}
    <Sidebar />
  </div>
  
  <div className="middle" >
    { children }
  </div>

  <div className="rightSide" > Right Sided Content</div>
  </div>
  
  </> 
  );


}

export default Layout