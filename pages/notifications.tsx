import type { NextPage } from "next";
import Header3 from "../components/Header/Header";
import NotificationSetting from "../components/NotiifcationSetting/NotificationSetting";
import Slidebar from "../components/Slidebar/Slidebar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const Notifications: NextPage = () => {
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
            <NotificationSetting />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Notifications;
