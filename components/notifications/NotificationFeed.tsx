import { useState, useContext } from "react"
import NotificationCard from "./NotificationCard"

import { Notification } from "../../types/Interfaces";

import { UserContext } from "../../pages/UserContext";


  

const NotificationFeed = () => {

  const {user, setUser} = useContext(UserContext)

  const [notifications, setNotifications] = useState<Array<Notification>>([])

  const getNotifications = async () => {
    const authToken = user.userDetails.accessToken

  } 

  if (user){
    return <>
      <div className="notificationFeed">
        <h2>Notifications</h2>
        <NotificationCard/>
      </div>
  </>
  } else {
    return <>
    Please log in to view notifications
    </>
  }
  
}

export default NotificationFeed