import Link from "next/link"

const EditProfileButton = () => {
  return <> 
    <Link href={'/user/editprofile'}>
      <button> Edit</button>
    </Link>
    
  </>
}

export default EditProfileButton