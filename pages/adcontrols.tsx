import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AdControls from "../components/AdControls/AdControls";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import AddAdControls from "../components/AdControls/AddAdControls";

const Adcontrols: NextPage = () => {
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
      case "addadcontrols":
        return <AddAdControls />;
      case "ad_controls":
      default:
        return <AdControls />;
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
            {/* <AdControls /> */}
            {redirectComponent}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Adcontrols;
