import Head from "next/head";
import Link from "next/link";

const name = "Shin Code";
export const siteTitle = "Next.js blog";

// Type "nfe"
function Layout({ children }) {
  return (
    <div>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <img src="/images/profile.png" />
        <h1>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
