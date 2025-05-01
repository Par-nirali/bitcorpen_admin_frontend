import type { NextPage } from "next";
import ContentModeration from "../components/ContentModeration/ContentModeration";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserContentPost from "../components/ContentModeration/UserContentPosts";

const Contentmoderation: NextPage = () => {
  const selectedproject = useSelector((state: any) => state.selectedproject);
  // const [cookie, setCookie] = useState<any>("");
  // const router = useRouter();

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);
  const renderContent = () => {
    switch (selectedproject) {
      case "usercontentposts":
        return <UserContentPost />;
      case "content_moderation":
      default:
        return <ContentModeration />;
    }
  };

  const redirectComponent = renderContent();

  return (
    <>
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">
            {/* {cookie === "true" && ( */}
            {/* <ContentModeration /> */}
            {redirectComponent}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contentmoderation;
