import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import Team from "../components/Teams/Team";
import { useSelector } from "react-redux";
import AddMember from "../components/Teams/AddMember";

const Teams: NextPage = () => {
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
      case "addmember":
        return <AddMember />;
      case "team":
      default:
        return <Team />;
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
            {/* <Team /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Teams;
