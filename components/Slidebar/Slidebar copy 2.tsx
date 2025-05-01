// import { useDispatch, useSelector } from "react-redux";
// import { selectedProjects } from "../redux/actions";
// import styles from "./slidebar.module.scss";

// const Slidebar = ({ userDetail }: any) => {
//   const selectedproject = useSelector((state: any) => state.selectedproject);
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (userDetail?.userRole === "ADMIN") {
//   //     setSelectedProject("myreview");
//   //     dispatch(selectedProjects("myreview"));
//   //   } else if (userDetail?.userRole === "SUBADMIN") {
//   //     setSelectedProject("all projects");
//   //     dispatch(selectedProjects("help_support_admin"));
//   //   } else {
//   //     setSelectedProject("");
//   //     dispatch(selectedProjects(""));
//   //   }
//   // }, [userDetail]);

//   return (
//     <div className={styles.wSpaceLeftMain}>
//       <div className={styles.wSpaceLeftSub}>
//         <div className={styles.wSpaceLeftUp}>
//           <div className={styles.slidebarRoutes}>
//             {userDetail?.userRole === "ADMIN" && (
//               <>
//                 <p className={styles.headingDiv}>Dashboard</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "dashboard" ||
//                     selectedproject === "recenetallsubscribed" ||
//                     selectedproject === "recenetalljoin"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("dashboard"))}
//                 >
//                   <img src="/icons/dashboard.svg" alt="Dashboard" />
//                   <p>Dashboard</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "userdetails" ||
//                     selectedproject === "users"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("users"))}
//                 >
//                   <img src="/icons/user.svg" alt="Users" />
//                   <p>Users</p>
//                 </div>
//                 <p className={styles.headingDiv}>Subscriptions</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "credit_logs" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("credit_logs"))}
//                 >
//                   <img src="/icons/credit.svg" alt="Credit Logs" />
//                   <p>Credit Logs</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "subscribers" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("subscribers"))}
//                 >
//                   <img src="/icons/subscriber.svg" alt="Subscribers" />
//                   <p>Subscribers</p>
//                 </div>
//                 <p className={styles.headingDiv}>Support</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "issuehelpdetails" ||
//                     selectedproject === "help_support_admin"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("help_support_admin"))
//                   }
//                 >
//                   <img src="/icons/help.svg" alt="Help & Support" />
//                   <p>Help & Support</p>
//                 </div>

//                 <p className={styles.headingDiv}>Controls</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "affiliateuserdetail" ||
//                     selectedproject === "affiliation"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("affiliation"))}
//                 >
//                   <img src="/icons/affiliation.svg" alt="Affiliation" />
//                   <p>Affiliation</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "en_assist" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("en_assist"))}
//                 >
//                   <img src="/icons/enassist.svg" alt="EN Assist" />
//                   <p>EN Assist</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addmember" ||
//                     selectedproject === "team"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("team"))}
//                 >
//                   <img src="/icons/team.svg" alt="Team" />
//                   <p>Team</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addpartners" ||
//                     selectedproject === "partners"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("partners"))}
//                 >
//                   <img src="/icons/partner.svg" alt="Partners Collaboration" />
//                   <p>Partners Collaboration</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addadcontrols" ||
//                     selectedproject === "ad_controls"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("ad_controls"))}
//                 >
//                   <img src="/icons/ad.svg" alt="Ad Controls" />
//                   <p>Ad Controls</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "leader_board" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("leader_board"))}
//                 >
//                   <img src="/icons/leader.svg" alt="Leader Board" />
//                   <p>Leader Board</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "notifications" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("notifications"))}
//                 >
//                   <img
//                     src="/icons/notification.svg"
//                     alt="Notifications Settings"
//                   />
//                   <p>Notifications Settings</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addaubadmins" ||
//                     selectedproject === "sub_admins"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("sub_admins"))}
//                 >
//                   <img src="/icons/subadmin.svg" alt="Sub Admins" />
//                   <p>Sub Admins</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "flag_user" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("flag_user"))}
//                 >
//                   <img src="/icons/flaguser.svg" alt="Flag User" />
//                   <p>Flag User</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "usercontentposts" ||
//                     selectedproject === "content_moderation"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("content_moderation"))
//                   }
//                 >
//                   <img src="/icons/content.svg" alt="Content Moderation" />
//                   <p>Content Moderation</p>
//                 </div>
//                 <p className={styles.headingDiv}>Publication</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "news_details" ||
//                     selectedproject === "writenews" ||
//                     selectedproject === "news"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("news"))}
//                 >
//                   <img src="/icons/news.svg" alt="News" />
//                   <p>News</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "article_details" ||
//                     selectedproject === "articles"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("articles"))}
//                 >
//                   <img src="/icons/articles.svg" alt="Articles" />
//                   <p>Articles</p>
//                 </div>
//               </>
//             )}
//             {userDetail?.userRole === "SUBADMIN" && (
//               <>
//                 <p className={styles.headingDiv}>Support</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "issuehelpdetails" ||
//                     selectedproject === "help_support_admin"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("help_support_admin"))
//                   }
//                 >
//                   <img src="/icons/help.svg" alt="Help & Support" />
//                   <p>Help & Support</p>
//                 </div>
//                 <p className={styles.headingDiv}>Settings</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "notifications" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("notifications"))}
//                 >
//                   <img
//                     src="/icons/notification.svg"
//                     alt="Notifications Settings"
//                   />
//                   <p>Notifications</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "editsubadminsprofile"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("editsubadminsprofile"))
//                   }
//                 >
//                   <img
//                     src="/icons/profileicon.svg"
//                     alt="headerprofile setting"
//                   />
//                   <p>Profile</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slidebar;
// import { useDispatch, useSelector } from "react-redux";
// import { selectedProjects } from "../redux/actions";
// import styles from "./slidebar.module.scss";

// const Slidebar2 = ({ userDetail }: any) => {
//   const selectedproject = useSelector((state: any) => state.selectedproject);
//   const dispatch = useDispatch();

//  useEffect(() => {
//    if (userDetail?.userRole === "ADMIN") {
//      setSelectedProject("myreview");
//      dispatch(selectedProjects("myreview"));
//    } else if (userDetail?.userRole === "SUBADMIN") {
//      setSelectedProject("all projects");
//      dispatch(selectedProjects("help_support_admin"));
//    } else {
//      setSelectedProject("");
//      dispatch(selectedProjects(""));
//    }
//  }, [userDetail]);

//   return (
//     <div className={styles.wSpaceLeftMain}>
//       <div className={styles.wSpaceLeftSub}>
//         <div className={styles.wSpaceLeftUp}>
//           <div className={styles.slidebarRoutes}>
//             {userDetail?.userRole === "ADMIN" && (
//               <>
//                 <p className={styles.headingDiv}>Dashboard</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "dashboard" ||
//                     selectedproject === "recenetallsubscribed" ||
//                     selectedproject === "recenetalljoin"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("dashboard"))}
//                 >
//                   <img src="/icons/dashboard.svg" alt="Dashboard" />
//                   <p>Dashboard</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "userdetails" ||
//                     selectedproject === "users"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("users"))}
//                 >
//                   <img src="/icons/user.svg" alt="Users" />
//                   <p>Users</p>
//                 </div>
//                 <p className={styles.headingDiv}>Subscriptions</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "credit_logs" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("credit_logs"))}
//                 >
//                   <img src="/icons/credit.svg" alt="Credit Logs" />
//                   <p>Credit Logs</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "subscribers" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("subscribers"))}
//                 >
//                   <img src="/icons/subscriber.svg" alt="Subscribers" />
//                   <p>Subscribers</p>
//                 </div>
//                 <p className={styles.headingDiv}>Support</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "issuehelpdetails" ||
//                     selectedproject === "help_support_admin"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("help_support_admin"))
//                   }
//                 >
//                   <img src="/icons/help.svg" alt="Help & Support" />
//                   <p>Help & Support</p>
//                 </div>

//                 <p className={styles.headingDiv}>Controls</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "affiliateuserdetail" ||
//                     selectedproject === "affiliation"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("affiliation"))}
//                 >
//                   <img src="/icons/affiliation.svg" alt="Affiliation" />
//                   <p>Affiliation</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "en_assist" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("en_assist"))}
//                 >
//                   <img src="/icons/enassist.svg" alt="EN Assist" />
//                   <p>EN Assist</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addmember" ||
//                     selectedproject === "team"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("team"))}
//                 >
//                   <img src="/icons/team.svg" alt="Team" />
//                   <p>Team</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addpartners" ||
//                     selectedproject === "partners"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("partners"))}
//                 >
//                   <img src="/icons/partner.svg" alt="Partners Collaboration" />
//                   <p>Partners Collaboration</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addadcontrols" ||
//                     selectedproject === "ad_controls"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("ad_controls"))}
//                 >
//                   <img src="/icons/ad.svg" alt="Ad Controls" />
//                   <p>Ad Controls</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "leader_board" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("leader_board"))}
//                 >
//                   <img src="/icons/leader.svg" alt="Leader Board" />
//                   <p>Leader Board</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "notifications" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("notifications"))}
//                 >
//                   <img
//                     src="/icons/notification.svg"
//                     alt="Notifications Settings"
//                   />
//                   <p>Notifications Settings</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "addaubadmins" ||
//                     selectedproject === "sub_admins"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("sub_admins"))}
//                 >
//                   <img src="/icons/subadmin.svg" alt="Sub Admins" />
//                   <p>Sub Admins</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "flag_user" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("flag_user"))}
//                 >
//                   <img src="/icons/flaguser.svg" alt="Flag User" />
//                   <p>Flag User</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "usercontentposts" ||
//                     selectedproject === "content_moderation"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("content_moderation"))
//                   }
//                 >
//                   <img src="/icons/content.svg" alt="Content Moderation" />
//                   <p>Content Moderation</p>
//                 </div>
//                 <p className={styles.headingDiv}>Publication</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "news_details" ||
//                     selectedproject === "writenews" ||
//                     selectedproject === "news"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("news"))}
//                 >
//                   <img src="/icons/news.svg" alt="News" />
//                   <p>News</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "article_details" ||
//                     selectedproject === "articles"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("articles"))}
//                 >
//                   <img src="/icons/articles.svg" alt="Articles" />
//                   <p>Articles</p>
//                 </div>
//               </>
//             )}
//             {userDetail?.userRole === "SUBADMIN" && (
//               <>
//                 <p className={styles.headingDiv}>Support</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "issuehelpdetails" ||
//                     selectedproject === "help_support_admin"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("help_support_admin"))
//                   }
//                 >
//                   <img src="/icons/help.svg" alt="Help & Support" />
//                   <p>Help & Support</p>
//                 </div>
//                 <p className={styles.headingDiv}>Settings</p>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "notifications" ? styles.selected : ""
//                   }`}
//                   onClick={() => dispatch(selectedProjects("notifications"))}
//                 >
//                   <img
//                     src="/icons/notification.svg"
//                     alt="Notifications Settings"
//                   />
//                   <p>Notifications</p>
//                 </div>
//                 <div
//                   className={`${styles.wSpaceLeftHead} ${
//                     selectedproject === "editsubadminsprofile"
//                       ? styles.selected
//                       : ""
//                   }`}
//                   onClick={() =>
//                     dispatch(selectedProjects("editsubadminsprofile"))
//                   }
//                 >
//                   <img
//                     src="/icons/profileicon.svg"
//                     alt="headerprofile setting"
//                   />
//                   <p>Profile</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slidebar2;
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./slidebar.module.scss";

const Slidebar = ({ userDetail }: any) => {
  const router = useRouter();

  // Function to check if path is active
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path + "/");
  };

  return (
    <div className={styles.wSpaceLeftMain}>
      <div className={styles.wSpaceLeftSub}>
        <div className={styles.wSpaceLeftUp}>
          <div className={styles.slidebarRoutes}>
            {userDetail?.userRole === "ADMIN" && (
              <>
                <p className={styles.headingDiv}>Dashboard</p>
                <Link href="/dashboard">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/dashboard") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/dashboard.svg" alt="Dashboard" />
                    <p>Dashboard</p>
                  </div>
                </Link>
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
                <p className={styles.headingDiv}>Subscriptions</p>
                <Link href="/subscriptions/creditlogs">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/subscriptions/creditlogs")
                        ? styles.selected
                        : ""
                    }`}
                  >
                    <img src="/icons/credit.svg" alt="Credit Logs" />
                    <p>Credit Logs</p>
                  </div>
                </Link>
                <Link href="/subscriptions/subscribers">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/subscriptions/subscribers")
                        ? styles.selected
                        : ""
                    }`}
                  >
                    <img src="/icons/subscriber.svg" alt="Subscribers" />
                    <p>Subscribers</p>
                  </div>
                </Link>
                <p className={styles.headingDiv}>Support</p>
                <Link href="/helpsupport">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/helpsupport") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/help.svg" alt="Help & Support" />
                    <p>Help & Support</p>
                  </div>
                </Link>

                <p className={styles.headingDiv}>Controls</p>
                <Link href="/controls/affiliation">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/affiliation") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/affiliation.svg" alt="Affiliation" />
                    <p>Affiliation</p>
                  </div>
                </Link>
                <Link href="/controls/enassist">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/enassist") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/enassist.svg" alt="EN Assist" />
                    <p>EN Assist</p>
                  </div>
                </Link>
                <Link href="/controls/team">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/team") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/team.svg" alt="Team" />
                    <p>Team</p>
                  </div>
                </Link>

                {/* Continue with the same pattern for other menu items */}
                <Link href="/controls/partners">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/partners") ? styles.selected : ""
                    }`}
                  >
                    <img
                      src="/icons/partner.svg"
                      alt="Partners Collaboration"
                    />
                    <p>Partners Collaboration</p>
                  </div>
                </Link>

                <Link href="/controls/adcontrols">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/adcontrols") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/ad.svg" alt="Ad Controls" />
                    <p>Ad Controls</p>
                  </div>
                </Link>

                <Link href="/controls/leaderboard">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/leaderboard") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/leader.svg" alt="Leader Board" />
                    <p>Leader Board</p>
                  </div>
                </Link>

                <Link href="/controls/notifications">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/notifications") ? styles.selected : ""
                    }`}
                  >
                    <img
                      src="/icons/notification.svg"
                      alt="Notifications Settings"
                    />
                    <p>Notifications Settings</p>
                  </div>
                </Link>

                <Link href="/controls/subadmins">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/subadmins") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/subadmin.svg" alt="Sub Admins" />
                    <p>Sub Admins</p>
                  </div>
                </Link>

                <Link href="/controls/flaguser">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/flaguser") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/flaguser.svg" alt="Flag User" />
                    <p>Flag User</p>
                  </div>
                </Link>

                <Link href="/controls/contentmoderation">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/contentmoderation")
                        ? styles.selected
                        : ""
                    }`}
                  >
                    <img src="/icons/content.svg" alt="Content Moderation" />
                    <p>Content Moderation</p>
                  </div>
                </Link>

                <p className={styles.headingDiv}>Publication</p>
                <Link href="/publication/news">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/publication/news") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/news.svg" alt="News" />
                    <p>News</p>
                  </div>
                </Link>

                <Link href="/publication/articles">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/publication/articles") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/articles.svg" alt="Articles" />
                    <p>Articles</p>
                  </div>
                </Link>
              </>
            )}

            {userDetail?.userRole === "SUBADMIN" && (
              <>
                <p className={styles.headingDiv}>Support</p>
                <Link href="/support">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/support") ? styles.selected : ""
                    }`}
                  >
                    <img src="/icons/help.svg" alt="Help & Support" />
                    <p>Help & Support</p>
                  </div>
                </Link>

                <p className={styles.headingDiv}>Settings</p>
                <Link href="/controls/notifications">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/controls/notifications") ? styles.selected : ""
                    }`}
                  >
                    <img
                      src="/icons/notification.svg"
                      alt="Notifications Settings"
                    />
                    <p>Notifications</p>
                  </div>
                </Link>

                <Link href="/profile/edit">
                  <div
                    className={`${styles.wSpaceLeftHead} ${
                      isActive("/profile/edit") ? styles.selected : ""
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
