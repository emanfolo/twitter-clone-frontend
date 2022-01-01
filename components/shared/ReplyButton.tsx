import { useState } from "react"
import { TweetInfo } from "../../types/Interfaces"
import TweetReplyForm from "./TweetReplyForm"

interface Props {
  tweetInfo: TweetInfo
}

const ReplyButton = (props: Props) => {

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "replyModalOpen" : "replyModalClosed"
  }

  const {tweetInfo} = props


  return <>

    <button id="replyButton" onClick={(()=> toggleModalClass())}> Reply </button>


    <div id="myModal" className={useModalClass()}> 

      <div className="replyModal">
        <div className="replyModalContent">
          <span onClick={(()=> {toggleModalClass()})} className="close">&times;</span>
        <TweetReplyForm tweetInfo={tweetInfo}/>
        </div>
        
      </div>

    </div> 

  </>
}

export default ReplyButton