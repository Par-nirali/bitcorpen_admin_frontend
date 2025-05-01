import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import Webpopup from "../components/Webpopup/Webpopup";

const Home: NextPage = () => {
  const [cookie, setCookie] = useState<any>("");

  const router = useRouter();

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    const temp = Cookies.get("isLoggedIn");
    setCookie(temp);
    if (temp === "false" || !temp) {
      router.push("/login");
    } else {
      // Check user role for already logged in users
      const userData = JSON.parse(
        localStorage.getItem("bitcorpenadminData") || "{}"
      );
      if (userData.userRole === "SUBADMIN") {
        // For subadmin, get the first permitted page from stored permissions
        const permissions = JSON.parse(
          localStorage.getItem("subadminroles") || "[]"
        );
        if (permissions.length > 0) {
          // Import the getFirstPermittedPage function or redefine it here
          const redirectPath = getFirstPermittedPage(permissions);
          router.push(redirectPath);
        }
      }
    }
  }, []);

  return (
    <>
      {cookie === "true" && (
        <div className="mainCon">
          <Slidebar />
          <div className="subCon">
            <Header3 />
            <div className="scrollDiv"></div>
          </div>
        </div>
      )}
      <Webpopup />
      <div id="mainRealteDiv"></div>
    </>
  );
};

export default Home;
