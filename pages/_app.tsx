import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "./UserContext";
import { useState, useMemo, useEffect } from "react";
import Layout from '../components/Layout'
import Cookie from 'js-cookie'


function MyApp({ Component, pageProps}: AppProps) {

  function getStorageValue(key: any, defaultValue: any) {
    // getting stored value
    if (typeof window !== 'undefined'){
      const saved = localStorage.getItem(key);
      if (saved){
      const initial = JSON.parse(saved);
      return initial || defaultValue;
    }
    }
  }

  function setLocalStorage(key: any, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
  }
}


  const [user, setUser] = useState(() => getStorageValue('user', ''));

  useEffect(() => {
    // storing input name
    setLocalStorage('user', user);
  }, [user]);

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
