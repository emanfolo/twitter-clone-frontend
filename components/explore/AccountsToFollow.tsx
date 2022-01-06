import { User } from "../../types/Interfaces"
import { useEffect, useState } from "react"
import ProfileCard from "../profile/ProfileCard"
import Link from "next/link"

const AccountsToFollow = () => {

  const [profiles, setProfiles] = useState<Array<User>>()
  const [stateChanged, setStateChanged] = useState("")

  const apiURL = process.env.NODE_ENV == "production" ?  "https://twitter-clone-backend-ef.herokuapp.com" : "http://localhost:4000"


  const getProfiles = async () => {
    const response = await fetch(`${apiURL}/profile/recommended`)
    const json = await response.json()
    setProfiles(json)
  }

  useEffect(() => {
      getProfiles()
  }, [stateChanged])

  const profilesDisplay = profiles?.map((data) => {
    const key = data.id

    return <>
      <Link href={`/${data.username}`}>
        <div>
          <ProfileCard profile={data} key={data.id} setStateChanged={setStateChanged} />
        </div>
      </Link>
      
    </>
  })

  return <>
    <div className="accountsContainer">
      {profilesDisplay}
    </div>
  </>
}

export default AccountsToFollow