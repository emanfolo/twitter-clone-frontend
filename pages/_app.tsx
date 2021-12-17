import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "./UserContext";
import { useState, useMemo } from "react";
import Layout from '../components/Layout'
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

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
