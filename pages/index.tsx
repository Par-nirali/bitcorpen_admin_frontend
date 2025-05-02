import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header3 from "../components/Header/Header";
import Slidebar from "../components/Slidebar/Slidebar";
import Webpopup from "../components/Webpopup/Webpopup";

// Add this function in your Login.tsx file

// Map permission names to their corresponding routes
const permissionRouteMap: Record<string, string> = {
  dashboard: "/dashboard",
  user: "/users",
  creditlogs: "/creditlogs",
  subscribers: "/subscribers",
  helpAndSupport: "/helpandsupport",
  affiliation: "/affiliation",
  enassist: "/enassist",
  team: "/team",
  partners: "/partners",
  adcontrols: "/adcontrols",
  mobileadcontrols: "/mobileadcontrols",
  leaderboard: "/leaderboard",
  notifications: "/notification", // Note: for subadmin it's /notification not /notifications
  subadmins: "/subadmins",
  flaguser: "/flaguser",
  accountverification: "/accountverification",
  withdrawls: "/withdrawls",
  contentmoderation: "/contentmoderation",
  news: "/news",
  articles: "/articles",
};

// Function to determine the first permitted page from permissions array

const Home: NextPage = () => {
  const [cookie, setCookie] = useState<any>("");
  const router = useRouter();
  const getFirstPermittedPage = (permissions: string[]): string => {
    // Define priority order for permissions if needed
    // This is optional - you could define certain pages to take precedence
    const priorityOrder = ["dashboard", "user", "helpAndSupport"];

    // Check if any priority permissions exist in the user's permissions
    for (const priority of priorityOrder) {
      if (permissions.includes(priority)) {
        return permissionRouteMap[priority];
      }
    }

    // If no priority permissions found, use the first available permission
    for (const permission of permissions) {
      if (permissionRouteMap[permission]) {
        return permissionRouteMap[permission];
      }
    }

    // Default fallback route if no matches found
    return "/subadminprofile";
  };

  // useEffect(() => {
  //   const temp = Cookies.get("isLoggedIn");
  //   setCookie(temp);
  //   if (temp === "false" || !temp) {
  //     router.push("/login");
  //   }
  // }, []);

  // const getFirstPermittedPage = (permissions: any[]) => {
  //   const permittedPages = ["/dashboard", "/users", "/settings"];

  //   for (const permission of permissions) {
  //     if (permittedPages.includes(permission)) {
  //       return permission;
  //     }
  //   }

  //   return "/dashboard";
  // };

  useEffect(() => {
    const temp = Cookies.get("isLoggedIn");
    setCookie(temp);
    if (temp === "false" || !temp) {
      router.push("/login");
    } else {
      // Check user role for already logged in users
      const userData = JSON.parse(
        localStorage.getItem("bitcorpenadminData") || "{}"
      );
      if (userData.userRole === "SUBADMIN") {
        // For subadmin, get the first permitted page from stored permissions
        const permissions = JSON.parse(
          localStorage.getItem("subadminroles") || "[]"
        );
        if (permissions.length > 0) {
          // Import the getFirstPermittedPage function or redefine it here
          const redirectPath = getFirstPermittedPage(permissions);
          router.push(redirectPath);
        }
      }
    }
  }, []);

  return (
    <>
      {cookie === "true" && (
        <div className="mainCon">
          <Slidebar />
          <div className="subCon">
            <Header3 />
            <div className="scrollDiv"></div>
          </div>
        </div>
      )}
      <Webpopup />
      <div id="mainRealteDiv"></div>
    </>
  );
};

export default Home;
