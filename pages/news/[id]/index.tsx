import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Header3 from "../../../components/Header/Header";
// import ShowNewsDetail from "../../../components/News/ShowNewsDetail";
import Slidebar from "../../../components/Slidebar/Slidebar";
import dynamic from "next/dynamic";

const ShowNewsDetail = dynamic(
  () => {
    return import("../../../components/News/ShowNewsDetail");
  },
  { ssr: false }
);
const Header3 = dynamic(
  () => {
    return import("../../../components/Header/Header");
  },
  { ssr: false }
);
const Newsdetails: NextPage = () => {
  // const [cookie, setCookie] = useState<any>("");
  // const router = useRouter();

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);

  return (
    <>
      {/* {cookie === "true" && ( */}
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">
            <ShowNewsDetail />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Newsdetails;
