import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "./UserContext";
import { useState, useMemo } from "react";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div style={{display: 'flex', justifyContent: 'space-evenly', gap: '20px'}}>
      <nav>
        
        <Link href="/home">
          <a>Home</a>
        </Link>
        <Link href="/discover">
          <a>Discover</a>
        </Link>

        {user ? (
          <>
            <Link href="/profile">
              Profile
            </Link>

            <Link href="user/logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href="/user/login">
              Log in
            </Link>
            <Link href="/user/new">
              Register
            </Link>
          </>
        )}
      </nav>
      </div>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
