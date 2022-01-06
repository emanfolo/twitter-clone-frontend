import { useState, useContext, useEffect } from "react"
import NotificationCard from "./NotificationCard"
import { Notification } from "../../types/Interfaces";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from "@material-ui/core";


  

const NotificationFeed = () => {

  const {user, setUser} = useContext(UserContext)

  const [notifications, setNotifications] = useState<Array<Notification>>([])
  const [loading, setLoading] = useState(Boolean)

  const apiURL = process.env.NODE_ENV == "production" ?  "https://twitter-clone-backend-ef.herokuapp.com" : "http://localhost:4000"

  const getNotifications = async () => {
    setLoading(true)
    const authToken: string = user.accessToken
    const res = await fetch(`${apiURL}/notification/all`, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
    const json = await res.json();
    setNotifications(json);
    setLoading(false)
  } 

  useEffect(() => {
    getNotifications()
  }, [user])


  const notificationDisplay = notifications.map((data) => {
    return <>
      <NotificationCard key={data.id} data={data}/>
    </>
  })


  if (user){
    return <>
        <div className='homeHeading'>
          <h2>Notifications </h2>
        </div>
      <div className="notificationFeed">
        {notificationDisplay}
      </div>
  </>
  } else if (!user){
    return <>
    Please log in to view notifications
    </>
  } else if(loading){
  return <> <CircularProgress /></>
} else if (notifications.length == 0){
  return <>
    <div>
      <h2>
        Nothing to see here!
      </h2>
    </div>
  </>
}

else {
  return <> There&apos;s been an error</>
}
  
}

export default NotificationFeed