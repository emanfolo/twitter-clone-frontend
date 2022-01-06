import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import { useState, useMemo, useContext } from "react";


import SidebarLink from './SidebarLink'


import HomeIcon from "@material-ui/icons/Home";
// import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { Button } from "@material-ui/core"



const Sidebar = () => {

  const {user, setUser} = useContext(UserContext)


  return (
  <>  


    <div className="sidebar">
   

        {user ? (
          <>
          <SidebarLink text="Home" active={true} Icon={HomeIcon} Route="/home"/>
          <SidebarLink text="Explore" Icon={ExploreOutlinedIcon} Route="/explore"/>
          <SidebarLink text="Notifications" Icon={NotificationsNoneIcon} Route="/notifications"/>
          <SidebarLink text="Profile" Icon={PermIdentityIcon} Route={`/${user.username}`}/>
          <SidebarLink text="Logout" Icon={LogoutIcon} Route="/user/logout"/>
          <Button id="tweet">
              Tweet
          </Button>
          </>
        ): (
          <> 
          <SidebarLink text="Explore" Icon={ExploreOutlinedIcon} Route="/explore"/>
          <SidebarLink text="Login" Icon={PermIdentityIcon} Route="/user/login"/>
          <SidebarLink text="Register" Icon={MoreHorizIcon} Route="/user/new"/>
          </>
        )}
        
    </div>
  </>
  )
}

export default Sidebar 