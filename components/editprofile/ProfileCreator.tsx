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

  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL
  

  const storeURL = async (type: string, imageURL: string) => {
    const authToken = user.accessToken
    const response = await fetch(`${apiURL}/profile/image/${type}`, {
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
    const username = user.username
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
    const authToken = user.accessToken
    const response = await fetch(`${apiURL}/profile/bio`, {
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
    <div className='profileCreator' >
    <h2> Edit your profile </h2>
    <div>
     <h4> Add a profile picture</h4> 
      <input type="file" onChange={handleProfileImageInput} ></input>
    </div>
    <div>
      <h4> Add a header picture</h4>
      <input type="file" onChange={handleHeaderImageInput} ></input>
    </div>
    <textarea placeholder="Enter a bio" value={bio} onChange={(e)=> {setBio(e.target.value)}} />
    <button className='blackButton' onClick={()=> {handleUpload(selectedProfileImage, 'profile'); handleUpload(selectedHeaderImage, 'header'); createProfile()}} >Save</button>
    </div>
  </>
}

export default ProfileCreator