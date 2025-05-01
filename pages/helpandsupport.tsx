import type { NextPage } from "next";
import CreditLogs from "../components/Creditlogs/CreditLogs";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import Subscribers from "../components/Subscribers/Subscribers";
import SupportAdmin from "../components/HelpAndSupportAdmin/SupportAdmin";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IssueHelpedDetail from "../components/HelpAndSupportAdmin/IssueHelpedDetail";
import { useSelector } from "react-redux";

const Helpsupport: NextPage = () => {
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
      case "issuehelpdetails":
        return <IssueHelpedDetail />;
      case "help_support_admin":
      default:
        return <SupportAdmin />;
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
          <div className="scrollDiv">{redirectComponent}</div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Helpsupport;
