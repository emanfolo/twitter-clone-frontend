import { useState } from "react"

const MoreInfoButton = () => {

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "replyModalOpen" : "replyModalClosed"
  }

  return <>

    <button id="replyButton" onClick={(()=> toggleModalClass())}> ... </button>


    <div id="myModal" className={useModalClass()}> 

      <div className="replyModalContent">
        <span onClick={(()=> {toggleModalClass()})} className="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>

    </div> 

  </>
}

export default MoreInfoButton