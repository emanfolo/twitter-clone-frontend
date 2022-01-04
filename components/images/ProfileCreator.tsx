import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from './s3config';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../pages/UserContext';

const ProfileCreator = (props: any) => {

  const {type} = props
  const {user} = useContext(UserContext)
  const router = useRouter()

  const s3 = new ReactS3Client(s3Config)

  const [selectedProfileImage, setSelectedProfileImage] = useState(null)
  const [selectedHeaderImage, setSelectedHeaderImage] = useState(null)
  const [bio, setBio] = useState("")

  const handleProfileImageInput = (e: any) => {
    setSelectedProfileImage(e.target.files[0])
  }

  const handleHeaderImageInput = (e: any) => {
    setSelectedHeaderImage(e.target.files[0])
  }

  const storeURL = async (type: string, imageURL: string) => {
    const apiURL = `http://localhost:4000/profile/image/${type}`
    const authToken = user.accessToken
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify( {
      image: imageURL,
      })
    })
    console.log(response)
  }

  const handleUpload = async (file: any, type: string) => {
    const username = user.userDetails.username
    const filename = type == "profile" ? `${username}-profile-picture` : `${username}-header-picture`
    if (file){
      try {
        const res = await s3.uploadFile(file, filename);
        console.log(res)
        storeURL(type, res.location)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const createProfile = async () => {
    const apiURL = 'http://localhost:4000/profile/bio'
    const authToken = user.accessToken
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
      bio: bio,
      })
    })
    console.log(response)
    router.push('/explore')
  }

  return <>
    <div style={{display: 'flex', flexDirection: 'column', margin:'5%', gap:'10px'}} >
    <div> Edit your profile </div>
    <input type="file" onChange={handleProfileImageInput} ></input>
    <input type="file" onChange={handleHeaderImageInput} ></input>
    <textarea placeholder="Enter a bio" value={bio} onChange={(e)=> {setBio(e.target.value)}} />
    <button onClick={()=> {handleUpload(selectedProfileImage, 'profile'); handleUpload(selectedHeaderImage, 'header'); createProfile()}} >Save</button>
    </div>
  </>
}

export default ProfileCreator