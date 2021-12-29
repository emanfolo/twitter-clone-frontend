import { useState, useContext, useEffect } from "react"
import NotificationCard from "./NotificationCard"
import { Notification } from "../../types/Interfaces";
import { UserContext } from "../../pages/UserContext";


  

const NotificationFeed = () => {

  const {user, setUser} = useContext(UserContext)

  const [notifications, setNotifications] = useState<Array<Notification>>([])

  const getNotifications = async () => {
    const authToken: string = user.accessToken

    const url = 'http://localhost:4000/notification/all'
    const res = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
    const json = await res.json();
    setNotifications(json);
  } 

  useEffect(() => {
    getNotifications()
  }, [])


  const notificationDisplay = notifications.map((data) => {
    return <>
      <NotificationCard key={data.id} data={data}/>
    </>
  })


  if (user){
    return <>
      <div className="notificationFeed">
        <h2>Notifications</h2>
        {notificationDisplay}
      </div>
  </>
  } else {
    return <>
    Please log in to view notifications
    </>
  }
  
}

export default NotificationFeed