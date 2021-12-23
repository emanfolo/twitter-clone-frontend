import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "./UserContext";
import { useState, useMemo, useEffect } from "react";
import Layout from '../components/Layout'
import Cookie from 'js-cookie'


function MyApp({ Component, pageProps}: AppProps) {
  const [user, setUser] = useState("");

  useEffect(() => {
    Cookie.set('user', JSON.stringify(user))
  }, [user])

  const value = useMemo(() => ({user, setUser}), [user, setUser])

  return (
  <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
   </UserContext.Provider>
  );
}



export default MyApp;
