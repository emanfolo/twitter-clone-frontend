import { useState } from "react"
import { TweetInfo } from "../../types/Interfaces"
import TweetBox from "../home/TweetBox"
import ReplyTweetBox from "./ReplyTweetBox"
import TweetReplyForm from "./TweetReplyForm"
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

interface Props {
  tweetInfo: TweetInfo
  setStateChanged: Function
}

const ReplyButton = (props: Props) => {

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "replyModalOpen" : "replyModalClosed"
  }

  const {tweetInfo, setStateChanged} = props

  

  return <>

    <button id="replyButton" onClick={(()=> toggleModalClass())}> <ReplyOutlinedIcon/> </button>


    <div id="myModal" className={useModalClass()}> 

      <div className="replyModal">
        <div className="replyModalContent">
          <span onClick={(()=> {toggleModalClass()})} className="close">&times;</span>
        <TweetReplyForm tweetInfo={tweetInfo} toggleModalClass={toggleModalClass} setStateChanged={setStateChanged}/>
        </div>
      </div>

    </div> 

  </>
}

export default ReplyButton