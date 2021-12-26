import Link from "next/link";
import { UserContext } from "../../pages/UserContext";
import { useState, useMemo, useContext } from "react";


import SidebarLink from './SidebarLink'


import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { Button } from "@material-ui/core"



const Sidebar = () => {

  const {user, setUser} = useContext(UserContext)


  return (
  <>  


    <div className="sidebar">
        <SidebarLink text="Home" active={true} Icon={HomeIcon} Route="/home"/>
        <SidebarLink text="Explore" Icon={SearchIcon} Route="/explore"/>

        {user ? (
          <>
          <SidebarLink text="Profile" Icon={PermIdentityIcon} Route={`/profile/${user.userDetails.username}`}/>
          <SidebarLink text="Logout" Icon={DeleteIcon} Route="/user/logout"/>
          <Button id="tweet">
              Tweet
          </Button>
          </>
        ): (
          <> 
          <SidebarLink text="Login" Icon={PermIdentityIcon} Route="/user/login"/>
          <SidebarLink text="Register" Icon={MoreHorizIcon} Route="/user/new"/>
          </>
        )}
        
    </div>
  </>
  )
}

export default Sidebar 