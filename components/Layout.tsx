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
  <div className="LayoutDiv" style={{display: 'flex', width: '100%', height: '100%'}}>
  <div style={{width: '30%'}}>
    {/* <DynamicSiderbarWithNoSSR /> */}
    <Sidebar />
  </div>
  
  <div className="content"style={{width: '70%'}} >
    { children }
  </div>
  </div>
  
  </> 
  );


}

export default Layout