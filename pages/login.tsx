import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Login from "../components/Login/Login";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Webpopup from "../components/Webpopup/Webpopup";

const LoginPage: NextPage = () => {
  const [cookie, setCookie] = useState<any>("");
  const router = useRouter();

  // useEffect(() => {
  //   // const socket = SocketIOClient(URL);
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "true" || temp) {
  //     router.push("/");
  //   }
  // }, []);
  return (
    <>
      {/* {cookie !== "true" && <Login />} */}
      <Webpopup />
      <Login />
    </>
  );
};

export default LoginPage;
