import type { NextPage } from "next";
// import Header3 from "../../components/Header/Header";
import News from "../../components/News/News";
import Slidebar from "../../components/Slidebar/Slidebar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ShowNewsDetail from "../../components/News/ShowNewsDetail";
import { useSelector } from "react-redux";
// import WriteNews from "../../components/News/WriteNews";
import dynamic from "next/dynamic";

// const News = dynamic(
//   () => {
//     return import("../../components/News/News");
//   },
//   { ssr: false }
// );
const Header3 = dynamic(
  () => {
    return import("../../components/Header/Header");
  },
  { ssr: false }
);
const WriteNews = dynamic(
  () => {
    return import("../../components/News/WriteNews");
  },
  { ssr: false }
);

const New: NextPage = () => {
  const selectedproject = useSelector((state: any) => state.selectedproject);
  // const [cookie, setCookie] = useState<any>("");
  // const router = useRouter();
  // const { id } = router.query;

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);

  const renderContent = () => {
    switch (selectedproject) {
      case "writenews":
        return <WriteNews />;
      case "news":
      default:
        return <News />;
    }
  };

  const redirectComponent = renderContent();

  return (
    <>
      {/* {cookie === "true" && ( */}
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">
            {/* <News /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default New;
