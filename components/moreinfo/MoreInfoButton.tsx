import { useState } from "react"

const MoreInfoButton = () => {

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "moreInfoModalOpen" : "moreInfoModalClosed"
  }

  return <>

    <button id="moreInfoButton" onClick={(()=> toggleModalClass())}> ... </button>


    <div id="myMoreInfoModal" className={useModalClass()}> 

      <div className="moreInfoModalContent">
        <span onClick={(()=> {toggleModalClass()})} className="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>

    </div> 
     

  </>
}

export default MoreInfoButton