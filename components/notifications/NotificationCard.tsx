import Link from "next/link";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AddIcon from "@mui/icons-material/Add";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

const NotificationCard = (props: any) => {
  const { data } = props;

  const typeOfNotif = data.type.toLowerCase();

  const notificationInfo = data[typeOfNotif];

  const iconDisplay = () => {
    return typeOfNotif == "retweet" ? (
      <>
        {" "}
        <AutorenewIcon />{" "}
      </>
    ) : typeOfNotif == "like" ? (
      <>
        {" "}
        <FavoriteTwoToneIcon />
      </>
    ) :  typeOfNotif == "reply" ? (
      <>
      {" "}
      <ReplyOutlinedIcon /> 
      </> 
    ) : (
      <>
        {" "}
        <AddIcon />
      </>
    );
  };

  const dataSource = () => {
    return typeOfNotif == "follow" ? notificationInfo : notificationInfo.user;
  };

  console.log(notificationInfo)

  const link = () => {
    return typeOfNotif == "follow"
      ? `/${notificationInfo.username}`
      : typeOfNotif == "reply" 
      ? `/tweet/${notificationInfo.id}`
      : `/tweet/${notificationInfo.tweet.id}`;
  };

  const headerDisplay = () => {
    return typeOfNotif == "follow"
      ? " followed you"
      : typeOfNotif == "retweet"
      ? "retweeted your tweet"
      : typeOfNotif == "like" 
      ? "liked your tweet" 
      : "replied to your tweet"
  };

  const contents = () => {
    return typeOfNotif == "follow" ? (
      <></>
    ) : typeOfNotif == "reply" ? ( 
    <> {notificationInfo.contents} </>
    ) : (
      <> {notificationInfo.tweet.contents}</>
    );
  };

  const contentsClassName = () => {
    return typeOfNotif == "follow" ? "contentFollow" : "content";
  };

  return (
    <>
      <div className="notificationCard">
        <div className="iconDisplay">{iconDisplay()}</div>
        <div className="notification">
          <Link href={`/${dataSource().username}`}>
            <img src={dataSource().profile.image}></img>
          </Link>
          <div className="headline">
            <Link href={`/${dataSource().username}`}>
              <div> {`${dataSource().name}`} </div>
            </Link>
            <Link href={link()}>{headerDisplay()}</Link>
          </div>
          <Link href={link()}>
            <div className={contentsClassName()}>{contents()}</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
