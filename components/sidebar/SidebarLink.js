// import "../../styles/globals.css"

import Link from "next/link";

function SidebarLink({ text, Icon, Route }) {
  return(
    <>
    <Link href={Route} >
      <div className="sidebarlink" >
        <Icon />
        <h2>{text}</h2>
      </div>
    </Link>
    </>
  );
}
export default SidebarLink;