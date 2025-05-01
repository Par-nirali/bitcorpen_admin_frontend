import type { NextPage } from "next";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import SubAdmins from "../components/SubAdmins/SubAdmins";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AddSubAdmin from "../components/SubAdmins/AddSubAdmin";
import { useSelector } from "react-redux";
const Subadmins: NextPage = () => {
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
      case "addaubadmins":
        return <AddSubAdmin />;
      case "sub_admins":
      default:
        return <SubAdmins />;
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
            {/* <SubAdmins /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Subadmins;
