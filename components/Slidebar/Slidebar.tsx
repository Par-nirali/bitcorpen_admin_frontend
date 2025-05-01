import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./slidebar.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import axios from "axios";
import { createPortal } from "react-dom";
import SignOutPopup from "../Header/SignOutPopup";

const Slidebar = (selectedProject: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedproject = useSelector((state: any) => state.selectedproject);
  const [userDetail, setUserDetail] = useState<any>("");
  const [showPopup, setShowPopup] = useState(false);
  const [permitsData, setPermitsData] = useState<any>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("bitcorpenadminData") || "{}"
        );
        setUserDetail(userData);
      }
    };

    fetchUserData();
  }, []);

  const getPermitesDetails = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/permission/get`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "PERMITSSSSSS");
      setPermitsData(response.data.data);
      localStorage.setItem("subadminroles", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (userDetail?.userRole === "SUBADMIN") {
      getPermitesDetails();
    }
  }, [userDetail]);

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path + "/");
  };

  const hasPermission = (permissionName: string) => {
    if (userDetail?.userRole === "ADMIN") return true;
    return permitsData.includes(permissionName);
  };

  return (
    <>
      <div className={styles.wSpaceLeftMain}>
        <div className={styles.wSpaceLeftSub}>
          <div className={styles.wSpaceLeftUp}>
            <div className={styles.headingDivSticky}>
              <div className={styles.headingDivImg}>
                <img src="/logo.svg" alt="Logo" />
              </div>
            </div>
            <div className={styles.slidebarRoutes}>
              {hasPermission("dashboard") && (
                <>
                  <p className={styles.headingDiv}>Dashboard</p>
                  <Link href="/dashboard">
                    <div
                      className={`${styles.wSpaceLeftHead} ${
                        isActive("/dashboard") || isActive("/")
                          ? styles.selected
                          : ""
                      }`}
                    >
                      <img src="/icons/dashboard.svg" alt="Dashboard" />
                      <p>Dashboard</p>
                    </div>
                  </Link>
                </>
              )}

              {hasPermission("user") && (
                <Link href="/users">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/users") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/user.svg" alt="Users" />
                    <p>Users</p>
                  </div>
                </Link>
              )}

              {(hasPermission("creditlogs") ||
                hasPermission("subscribers")) && (
                <p className={styles.headingDiv}>Subscriptions</p>
              )}

              {hasPermission("creditlogs") && (
                <Link href="/creditlogs">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/creditlogs") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/credit.svg" alt="Credit Logs" />
                    <p>Credit Logs</p>
                  </div>
                </Link>
              )}

              {hasPermission("subscribers") && (
                <Link href="/subscribers">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/subscribers") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/subscriber.svg" alt="Subscribers" />
                    <p>Subscribers</p>
                  </div>
                </Link>
              )}
              {hasPermission("helpAndSupport") && (
                <>
                  <p className={styles.headingDiv}>Support</p>
                  <Link href="/helpandsupport">
                    <div
                      className={`${styles.wSpaceLeftHead} ${
                        isActive("/helpandsupport") ? styles.selected : ""
                      }`}
                    >
                      <img src="/icons/help.svg" alt="Help & Support" />
                      <p>Help & Support</p>
                    </div>
                  </Link>
                </>
              )}

              {(hasPermission("affiliation") ||
                hasPermission("enassist") ||
                hasPermission("team") ||
                hasPermission("partners") ||
                hasPermission("adcontrols") ||
                hasPermission("mobileadcontrols") ||
                hasPermission("leaderboard") ||
                hasPermission("notifications") ||
                hasPermission("subadmins") ||
                hasPermission("flaguser") ||
                hasPermission("accountverification") ||
                hasPermission("widthdrawls") ||
                hasPermission("contentmoderation")) && (
                <p className={styles.headingDiv}>Controls</p>
              )}

              {hasPermission("accountverification") && (
                <Link href="/accountverification">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/accountverification") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/accountverify.svg" alt="Affiliation" />
                    <p>Account Verification</p>
                  </div>
                </Link>
              )}

              {hasPermission("affiliation") && (
                <Link href="/affiliation">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/affiliation") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/affiliation.svg" alt="Affiliation" />
                    <p>Affiliation</p>
                  </div>
                </Link>
              )}

              {hasPermission("withdrawls") && (
                <Link href="/withdrawls">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/withdrawls") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/withdrawls.svg" alt="withdrawls" />
                    <p>Withdrawls</p>
                  </div>
                </Link>
              )}

              {hasPermission("enassist") && (
                <Link href="/enassist">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/enassist") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/enassist.svg" alt="EN Assist" />
                    <p>EN Assist</p>
                  </div>
                </Link>
              )}

              {hasPermission("team") && (
                <Link href="/team">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/team") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/team.svg" alt="Team" />
                    <p>Team</p>
                  </div>
                </Link>
              )}

              {hasPermission("partners") && (
                <Link href="/partners">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/partners") ? styles.selected : ""
                    }`}
                  >
                    <img
                      src="/icons/partner.svg"
                      alt="Partners Collaboration"
                    />
                    <p>Partners Collaboration</p>
                  </div>
                </Link>
              )}

              {hasPermission("adcontrols") && (
                <Link href="/adcontrols">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/adcontrols") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/ad.svg" alt="Ad Controls" />
                    <p>Web Ad Controls</p>
                  </div>
                </Link>
              )}

              {hasPermission("mobileadcontrols") && (
                <Link href="/mobileadcontrols">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/mobileadcontrols") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/mobilead.svg" alt="Ad Controls" />
                    <p>Mobile Ad Controls</p>
                  </div>
                </Link>
              )}

              {hasPermission("leaderboard") && (
                <Link href="/leaderboard">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/leaderboard") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/leader.svg" alt="Leader Board" />
                    <p>Leader Board</p>
                  </div>
                </Link>
              )}

              {hasPermission("notifications") && (
                <Link
                  href={
                    userDetail?.userRole === "ADMIN"
                      ? "/notifications"
                      : "/notification"
                  }
                >
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive(
                        userDetail?.userRole === "ADMIN"
                          ? "/notifications"
                          : "/notification"
                      )
                        ? styles.selected
                        : ""
                    }`}
                  >
                    <img
                      src="/icons/notification.svg"
                      alt="Notifications Settings"
                    />
                    <p>
                      Notifications{" "}
                      {userDetail?.userRole === "ADMIN" ? "Settings" : ""}
                    </p>
                  </div>
                </Link>
              )}

              {hasPermission("subadmins") && (
                <Link href="/subadmins">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/subadmins") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/subadmin.svg" alt="Sub Admins" />
                    <p>Sub Admins</p>
                  </div>
                </Link>
              )}

              {hasPermission("flaguser") && (
                <Link href="/flaguser">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/flaguser") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/flaguser.svg" alt="Flag User" />
                    <p>Flag User</p>
                  </div>
                </Link>
              )}

              {hasPermission("contentmoderation") && (
                <Link href="/contentmoderation">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/contentmoderation") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/content.svg" alt="Content Moderation" />
                    <p>Content Moderation</p>
                  </div>
                </Link>
              )}
              {(hasPermission("news") || hasPermission("articles")) && (
                <p className={styles.headingDiv}>Publication</p>
              )}

              {hasPermission("news") && (
                <Link href="/news">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/news") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/news.svg" alt="News" />
                    <p>News</p>
                  </div>
                </Link>
              )}

              {hasPermission("articles") && (
                <Link href="/articles">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/articles") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/articles.svg" alt="Articles" />
                    <p>Articles</p>
                  </div>
                </Link>
              )}

              {userDetail?.userRole === "SUBADMIN" && (
                <>
                  <p className={styles.headingDiv}>Settings</p>
                  <Link href="/subadminprofile">
                    <div
                      className={`${styles.wSpaceLeftHead} ${
                        isActive("/subadminprofile") ? styles.selected : ""
                      }`}
                    >
                      <img
                        src="/icons/profileicon.svg"
                        alt="headerprofile setting"
                      />
                      <p>Profile</p>
                    </div>
                  </Link>
                </>
              )}

              {userDetail?.userRole === "SUBADMIN" && (
                <>
                  {/* <p className={styles.headingDiv}>Settings</p>
                <Link href="/subadminprofile">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/subadminprofile") ? styles.selected : ""
                    }`}
                  >
                    <img
                      src="/icons/profileicon.svg"
                      alt="headerprofile setting"
                    />
                    <p>Profile</p>
                  </div>
                </Link> */}
                  <div className={styles.wSpaceLeftBtm}>
                    <div
                      className={`${styles.logOut}`}
                      onClick={() => setShowPopup(true)}
                    >
                      <div className={styles.tabsImg}>
                        <img src="/icons/logout.svg" alt="profile" />
                      </div>
                      <p>Sign out</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <SignOutPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Slidebar;
