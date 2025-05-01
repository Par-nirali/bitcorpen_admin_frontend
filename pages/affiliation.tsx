import type { NextPage } from "next";
import CreditLogs from "../components/Creditlogs/CreditLogs";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import Subscribers from "../components/Subscribers/Subscribers";
import Affiliation from "../components/Affiliation/Affiliation";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AffiliationUserDetail from "../components/Affiliation/AffiliationUserDetail";
const Affiliations: NextPage = () => {
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
      case "affiliateuserdetail":
        return <AffiliationUserDetail />;
      case "affiliation":
      default:
        return <Affiliation />;
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
            {/* <Affiliation /> */}
            {redirectComponent}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Affiliations;
