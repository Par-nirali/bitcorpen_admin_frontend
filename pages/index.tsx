import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Login from "../components/Login/Login";
import Performance from "../components/MainPage/MainPage";
import Header3 from "../components/Header/Header3";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Webpopup from "../components/Webpopup/Webpopup";
import { createPortal } from "react-dom";

const Landingpage = dynamic(
  () => {
    return import("../components/MainPage/MainPage");
  },
  { ssr: false }
);

const Home: NextPage = () => {
  const [cookie, setCookie] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    const temp = Cookies.get("isLoggedIn");
    setCookie(temp);
    if (temp === "false" || !temp) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className="mainCon">
        {cookie === "true" && <Header3 />}
        {cookie === "true" && <Landingpage />}
      </div>
      {/* <div className="mainCon">
        <Header3 />
        <Landingpage />
      </div> */}
      <Webpopup />
      <div id="mainRealteDiv"></div>
    </>
  );
};

export default Home;
