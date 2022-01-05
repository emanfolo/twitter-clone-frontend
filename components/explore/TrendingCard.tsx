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
    router.push(`/explore/hashtag/${tag}`)
   },
  }

  const linkCreator = (topic: string) => {
    let route;
    if(topic[0] == '#'){
      route = `/explore/hashtag/${data.split('#')[1]}`
    } else {
      route = `/search/${data}`
    }
    return route
  }


  return <>

    {/* {linkCreator(data)} */}
      <Link href={linkCreator(data)}>
        <div className="trending">
            <h2>
              {data}
            </h2>
        </div>
      </Link>

  </>

}

export default TrendingCard