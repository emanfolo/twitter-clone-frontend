import Link from "next/link"

const NotificationCard = (props: any) => {

  // console.log(props)

  const { data } = props

  const typeOfNotif = data.type.toLowerCase()

  const notificationInfo = data[typeOfNotif]

  console.log(notificationInfo.user.username)

  return <>
  
  <div className="notificationCard">
    { typeOfNotif == 'retweet' ? <> R Icon </> : <> L Icon</> }
    <Link href={`/${notificationInfo.user.username}`}>
          <img src={notificationInfo.user.profile.image}></img>
    </Link>
      <div className="headline">
        <Link href={`/${notificationInfo.user.username}`}>
          <div> {`${notificationInfo.user.name}`} </div> 
        </Link>
        <Link href={`/tweet/${notificationInfo.tweet.id}`}>
        { typeOfNotif == 'retweet' ? `${typeOfNotif}ed your tweet` : `${typeOfNotif}d your tweet` }
        </Link>
      </div>
    <Link href={`/tweet/${notificationInfo.tweet.id}`}>
    <div className="content">
      {notificationInfo.tweet.contents}
    </div>
    </Link>
  </div>
  
  
  </>
}

export default NotificationCard