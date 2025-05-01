import type { NextPage } from "next";
import Dashboard from "../components/Dashboard/Dashboard";
import Slidebar from "../components/Slidebar/Slidebar";
import Header3 from "../components/Header/Header";
import Users from "../components/Users/Users";
import { selectedProjects } from "../components/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ShowUserDetail from "../components/Users/ShowUserDetail";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const User: NextPage = () => {
  // const [cookie, setCookie] = useState<any>("");
  // const router = useRouter();

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);
  //   const dispatch = useDispatch();
  const selectedproject = useSelector((state: any) => state.selectedproject);
  //   console.log("selectedproject", selectedproject);

  //   useEffect(() => {
  //     if (selectedproject !== "userdetails") {
  //       console.log("selectedproject", selectedproject);
  //       dispatch(selectedProjects("userdetails"));
  //     }
  //   }, []);

  const renderContent = () => {
    switch (selectedproject) {
      case "userdetails":
        return <ShowUserDetail />;
      case "users":
      default:
        return <Users />;
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
            {redirectComponent}
            {/* <Users /> */}
            {/* {!selectedproject ? (
              <Userss />
            ) : selectedproject === "userdetails" ? (
              <ShowUserDetail />
            ) : null} */}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default User;
