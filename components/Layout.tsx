import Link from "next/link";
import { UserContext } from "../pages/UserContext";
import { useState, useMemo } from "react";
import Sidebar from './sidebar/Sidebar'

const Layout = ({children}: any) => {


  return ( 
  <> 
  <div className="LayoutDiv" style={{display: 'flex', width: '100%', height: '100%'}}>
  <div style={{width: '30%'}}>
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