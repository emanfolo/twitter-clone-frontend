import 'linkify-plugin-hashtag'
import Linkify from 'linkify-react'
import { useRouter } from "next/router";
import Link from 'next/link';


const TrendingCard = (props: any) => {

  const {data} = props


  const router = useRouter()

  const linkProps = {
  onClick: (event: any) => {
    const tag = event.target.href.split('#')[1]
    router.push(`http://localhost:3000/explore/hashtag/${tag}`)
   },
  }

  const linkCreator = (topic: string) => {
    if (topic[0] == '#'){
      return (
      <>
      <Link href={`/explore/hashtag/${data.split('#')[1]}`}>
        <div className="trending">
            <h2>
              {data}
            </h2>
        </div>
      </Link>
      </>)
    } else {
      return (
      <>
      <Link href={`/search/${data}`}>
        <div className="trending">
            <h2>
              {data}
            </h2>
        </div>
      </Link>
      </>)
    }
  }

  return <>

    {linkCreator(data)}

  </>

}

export default TrendingCard