import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../context/UserContext";
import { useState, useMemo, useEffect } from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  function getStorageValue(key: any, defaultValue: any) {
    // getting stored value
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      if (saved !== undefined && saved) {
        const initial = JSON.parse(saved);
        return initial
      } else {
        return defaultValue;
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

  const [user, setUser] = useState(() => getStorageValue("user", ""));

  useEffect(() => {
    setLocalStorage("user", user);
  }, [user]);

  setTimeout(function () {
    setUser("");
  }, 1000 * 60 * 60);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
