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
        <SidebarLink text="Explore" Icon={SearchIcon} Route="/discover"/>

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
      {/* <nav>
        <div>
        <Link href="/home">
          <a>Home</a>
        </Link>
        </div>
        <div>
          <Link href="/discover">
          <a>Discover</a>
        </Link>
        </div>
        {user ? (
          <>
            <div>
              <Link href="/profile">
              Profile
            </Link>
            </div>
            
            <div>
              <Link href="user/logout">
              Logout
            </Link>
            </div>
            
          </>
        ) : (
          <>
          <div>
            <Link href="/user/login">
              Log in
            </Link>
          </div>
          <div>
            <Link href="/user/new">
            Register
            </Link>
          </div>
          </>
        )}
      </nav> */}
  </>
  )
}

export default Sidebar