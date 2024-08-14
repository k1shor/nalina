import "@/styles/globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import Sidebar from "./Components/Admin/Sidebar";
import { useRouter } from "next/router";
import { isAuthenticated } from "./api/userAPI";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [admin, setadmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  isAuthenticated().then((user) => {
    if (user?.token) {

      // console.log(user?.token, "user from local storage");
      setadmin(true);
      // console.log(admin, "admin")
    } else {
      setadmin(false);
    }
    setLoading(false);
  });
  // }, []);

  // async function getUser() {
  //   return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false;
  // }

  useEffect(() => {
    if (!loading) {
      if (router.pathname.match(/^[/]admin$/) && admin) {
        router.push('/admin/dashboard')
      }
      else if (router.pathname.startsWith('/admin') && !admin) {
        router.push('/admin'); // Redirect to login or any other page
      }
    }
  }, [loading, admin, router.pathname]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

  const allowed = router.pathname.startsWith('/admin') && admin;

  return (
    <>
      <Head>
        <title>Nalina Groups</title>
      </Head>
      {allowed ? (
        <div className="flex">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="w-3/4">
            <Component {...pageProps} />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  );
}
