import type { NextPage } from "next";
import FlagUser from "../components/FlagUsers/FlagUser";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserContentPost from "../components/ContentModeration/UserContentPosts";

const Flaguser: NextPage = () => {
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
      case "flag_user":
      default:
        return <FlagUser />;
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
            {/* <FlagUser /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Flaguser;
