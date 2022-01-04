import Link from "next/link"

const NotificationCard = (props: any) => {

  const { data } = props

  const typeOfNotif = data.type.toLowerCase()

  const notificationInfo = data[typeOfNotif]

  const iconDisplay = () => {
    return typeOfNotif == 'retweet' ? <> R Icon </> : typeOfNotif == 'like' ? <> L Icon</> : <> F Icon </>
  }

  const dataSource = () => {
    return typeOfNotif == 'follow' ? notificationInfo : notificationInfo.user
  }

  const link = () => {
    return typeOfNotif == 'follow' ? `/${notificationInfo.username}` : `/tweet/${notificationInfo.tweet.id}`
  }

  const headerDisplay = () => {
    return typeOfNotif == 'follow' ? 'followed you' : typeOfNotif == 'retweet' ? 'retweeted your tweet' : 'liked your tweet'
  }

  const contents = () => {
    return typeOfNotif == 'follow' ? <> <div>Profile</div></> : <> {notificationInfo.tweet.contents}</>
  }

  const contentsClassName = () => {
    return typeOfNotif == 'follow' ? 'contentFollow' : 'content'
  }

  return <>
  
  <div className="notificationCard">
    {iconDisplay()}
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
  
  
  </>
}

export default NotificationCard