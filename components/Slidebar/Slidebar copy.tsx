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

import React from "react";

const Slidebaropy = () => {
  return <div></div>;
};

export default Slidebaropy;
