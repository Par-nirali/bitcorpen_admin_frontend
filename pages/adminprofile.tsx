import type { NextPage } from "next";
import CreditLogs from "../components/Creditlogs/CreditLogs";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import Subscribers from "../components/Subscribers/Subscribers";
import SupportAdmin from "../components/HelpAndSupportAdmin/SupportAdmin";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AdminEditProfile from "../components/AdminEditProfile/AdminEditProfile";
import { useSelector } from "react-redux";

const AdminProfile: NextPage = () => {
  // const selectedproject = useSelector((state: any) => state.selectedproject);
  // const [cookie, setCookie] = useState<any>("");
  // const router = useRouter();

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);

  // const renderContent = () => {
  //   switch (selectedproject) {
  //     // case "usercontentposts":
  //     //   return <UserContentPost />;
  //     case "edit_profile":
  //     default:
  //       return <AdminEditProfile />;
  //   }
  // };

  // const redirectComponent = renderContent();

  return (
    <>
      {/* {cookie === "true" && ( */}
      <div className="mainCon">
        <Slidebar />
        <div className="subCon">
          <Header3 />
          <div className="scrollDiv">
            <AdminEditProfile />
            {/* {redirectComponent} */}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default AdminProfile;
