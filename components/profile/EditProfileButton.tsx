import Link from "next/link";

const EditProfileButton = () => {
  return (
    <>
      <Link href={"/user/editprofile"}>
        <button className="whiteButton"> Edit</button>
      </Link>
    </>
  );
};

export default EditProfileButton;
