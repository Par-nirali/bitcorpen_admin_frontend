import type { NextPage } from "next";
import Dashboard from "../components/Dashboard/Dashboard";
import Slidebar from "../components/Slidebar/Slidebar";
import Header3 from "../components/Header/Header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecentAllJoin from "../components/Dashboard/RecentAllJoin/RecentAllJoin";
import RecentAllSubscribed from "../components/Dashboard/RecentAllSubscribed/RecentAllSubscribed";

const Dashboards: NextPage = () => {
  const [cookie, setCookie] = useState<any>("");
  const router = useRouter();
  const selectedproject = useSelector((state: any) => state.selectedproject);
  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);

  const renderContent = () => {
    switch (selectedproject) {
      case "recenetalljoin":
        return <RecentAllJoin />;
      case "recenetallsubscribed":
        return <RecentAllSubscribed />;
      case "dashboard":
      default:
        return <Dashboard />;
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
            {/* <Dashboard /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Dashboards;
