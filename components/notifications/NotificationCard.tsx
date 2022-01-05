import Link from "next/link"
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
const NotificationCard = (props: any) => {


  const { data } = props


  const typeOfNotif = data.type.toLowerCase()

  const notificationInfo = data[typeOfNotif]

  console.log(notificationInfo)


  const iconDisplay = () => {
    return typeOfNotif == 'retweet' ? <> <AutorenewIcon/> </> : typeOfNotif == 'like' ? <> <FavoriteTwoToneIcon/></> : <> <AddIcon /></>
  }

  const dataSource = () => {
    return typeOfNotif == 'follow' ? notificationInfo : notificationInfo.user
  }

  const link = () => {
    return typeOfNotif == 'follow' ? `/${notificationInfo.username}` : `/tweet/${notificationInfo.tweet.id}`
  }

  const headerDisplay = () => {
    return typeOfNotif == 'follow' ? ' followed you' : typeOfNotif == 'retweet' ? 'retweeted your tweet' : 'liked your tweet'
  }

  const contents = () => {
    return typeOfNotif == 'follow' ? <></> : <> {notificationInfo.tweet.contents}</>
  }

  const contentsClassName = () => {
    return typeOfNotif == 'follow' ? 'contentFollow' : 'content'
  }

  return <>
  
  <div className="notificationCard">
    <div className="iconDisplay">
      {iconDisplay()}
    </div>
    <div className="notification">
      <Link href={`/${dataSource().username}`}>
          <img src={dataSource().profile.image}></img>
    </Link>
      <div className="headline">
        <Link href={`/${dataSource().username}`}>
          <div> {`${dataSource().name}`} </div> 
        </Link>
        <Link href={link()}>
          {headerDisplay()}
        </Link>
      </div>
    <Link href={link()}>
    <div className={contentsClassName()}>
      {contents()}
    </div>
    </Link>
    </div>
    
  </div>
  
  
  </>
}

export default NotificationCard