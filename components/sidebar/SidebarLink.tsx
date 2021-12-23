// import "../../styles/globals.css"

import Link from "next/link";

interface props {
  active?: boolean,
  Route: string,
  text: string,
  Icon: any,
}

function SidebarLink(props: props) {

  const { text, Icon, Route } = props

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