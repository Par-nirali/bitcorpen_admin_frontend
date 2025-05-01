import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header3 from "../components/Header/Header";
import Partners from "../components/PartnersCollabration/Partners";
import Slidebar from "../components/Slidebar/Slidebar";
import { useSelector } from "react-redux";
import AddPartners from "../components/PartnersCollabration/AddPartners";
const Partner: NextPage = () => {
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
      case "addpartners":
        return <AddPartners />;
      case "partners":
      default:
        return <Partners />;
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
            {/* <Partners /> */}
            {redirectComponent}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Partner;
