import { useState } from "react"
import { TweetInfo } from "../../types/Interfaces"
import TweetBox from "../home/TweetBox"
import ReplyTweetBox from "./ReplyTweetBox"
import TweetReplyForm from "./TweetReplyForm"

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

    <button id="replyButton" onClick={(()=> toggleModalClass())}> Reply </button>


    <div id="myModal" className={useModalClass()}> 

      <div className="replyModal">
        <div className="replyModalContent">
          <span onClick={(()=> {toggleModalClass()})} className="close">&times;</span>
        <TweetReplyForm tweetInfo={tweetInfo} toggleModalClass={toggleModalClass} setStateChanged={setStateChanged}/>
        {/* <TweetBox tweetInput={tweetInput} 
      setTweetInput={setTweetInput} 
      tweetButtonActive={tweetButtonActive} 
      setTweetButtonActive={setTweetButtonActive} 
      limit={limit}
      setLimit={setLimit} /> */}
      

        </div>
      </div>

    </div> 

  </>
}

export default ReplyButton