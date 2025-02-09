import React from "react";
import styles from "./slidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProjects,
  setCeodepartment,
  setPrevvalue,
  setDesignationId,
  setSelectedEmpl,
  setShowEmp,
} from "../redux/actions";

const Slidebar = ({
  setSelectedProject,
  setLogout,
  userDetail,
  submanagername,
  setSubManagerName,
}: any) => {
  const selectedproject = useSelector((state: any) => state.selectedproject);
  const dispatch = useDispatch();

  return (
    <div className={styles.wSpaceLeftMain}>
      <div className={styles.wSpaceLeftSub}>
        <div className={styles.wSpaceLeftUp}>
          {/* <div className={styles.headingDivImg}>
            <img src="/logo.svg" alt="Logo" />
          </div> */}

          <div className={styles.slidebarRoutes}>
            {/* {userDetail?.role === "ADMIN" && ( */}
            <>
              <p className={styles.headingDiv}>Dashboard</p>
              {/* <div
                  className={`${styles.wSpaceLeftHead} ${
                    selectedproject === "all_projects"
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => dispatch(selectedProjects("all_projects"))}
                >
                  <img src="/myprojectsb.svg" alt="All Projects" />
                  <p>All Projects</p>
                </div> */}
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "dashboard" ||
                  selectedproject === "recenetallsubscribed" ||
                  selectedproject === "recenetalljoin"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("dashboard"))}
              >
                <img src="/icons/dashboard.svg" alt="Dashboard" />
                <p>Dashboard</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "userdetails" ||
                  selectedproject === "users"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("users"))}
              >
                <img src="/icons/user.svg" alt="Users" />
                <p>Users</p>
              </div>
              <p className={styles.headingDiv}>Subscriptions</p>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "credit_logs" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("credit_logs"))}
              >
                <img src="/icons/credit.svg" alt="Credit Logs" />
                <p>Credit Logs</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "subscribers" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("subscribers"))}
              >
                <img src="/icons/subscriber.svg" alt="Subscribers" />
                <p>Subscribers</p>
              </div>
              <p className={styles.headingDiv}>Support</p>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "issuehelpdetails" ||
                  selectedproject === "help_support_admin"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("help_support_admin"))}
              >
                <img src="/icons/help.svg" alt="Help & Support" />
                <p>Help & Support</p>
              </div>

              <p className={styles.headingDiv}>Controls</p>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "affiliateuserdetail" ||
                  selectedproject === "affiliation"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("affiliation"))}
              >
                <img src="/icons/affiliation.svg" alt="Affiliation" />
                <p>Affiliation</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "en_assist" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("en_assist"))}
              >
                <img src="/icons/enassist.svg" alt="EN Assist" />
                <p>EN Assist</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "addmember" || selectedproject === "team"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("team"))}
              >
                <img src="/icons/team.svg" alt="Team" />
                <p>Team</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "addpartners" ||
                  selectedproject === "partners"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("partners"))}
              >
                <img src="/icons/partner.svg" alt="Partners Collaboration" />
                <p>Partners Collaboration</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "ad_controls" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("ad_controls"))}
              >
                <img src="/icons/ad.svg" alt="Ad Controls" />
                <p>Ad Controls</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "leader_board" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("leader_board"))}
              >
                <img src="/icons/leader.svg" alt="Leader Board" />
                <p>Leader Board</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "notifications" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("notifications"))}
              >
                <img
                  src="/icons/notification.svg"
                  alt="Notifications Settings"
                />
                <p>Notifications Settings</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "sub_admins" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("sub_admins"))}
              >
                <img src="/icons/subadmin.svg" alt="Sub Admins" />
                <p>Sub Admins</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "flag_user" ? styles.selected : ""
                }`}
                onClick={() => dispatch(selectedProjects("flag_user"))}
              >
                <img src="/icons/flaguser.svg" alt="Flag User" />
                <p>Flag User</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "content_moderation"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => dispatch(selectedProjects("content_moderation"))}
              >
                <img src="/icons/content.svg" alt="Content Moderation" />
                <p>Content Moderation</p>
              </div>
              <p className={styles.headingDiv}>Publication</p>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "my_review" ? styles.selectedstar : ""
                }`}
                onClick={() => dispatch(selectedProjects("news"))}
              >
                <img src="/icons/news.svg" alt="News" />
                <p>News</p>
              </div>
              <div
                className={`${styles.wSpaceLeftHead} ${
                  selectedproject === "inbox" ? styles.selectedhome : ""
                }`}
                onClick={() => dispatch(selectedProjects("articles"))}
              >
                <img src="/icons/articles.svg" alt="Articles" />
                <p>Articles</p>
              </div>
            </>
            {/* )} */}
            {/* {userDetail?.role === "SUB_ADMIN" && (
              <>
                <p className={styles.headingDiv}>Support</p>
                <div
                  className={`${styles.wSpaceLeftHead} ${
                    selectedproject === "my_projects"
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => dispatch(selectedProjects("help_support"))}
                >
                  <img src="/help-icon.svg" alt="Help & Support" />
                  <p>Help & Support</p>
                </div>
                <p className={styles.headingDiv}>Settings</p>
                <div
                  className={`${styles.wSpaceLeftHead} ${
                    selectedproject === "my_review" ? styles.selectedstar : ""
                  }`}
                  onClick={() => dispatch(selectedProjects("notifications"))}
                >
                  <img src="/notifications-icon.svg" alt="Notifications" />
                  <p>Notifications</p>
                </div>
                <div
                  className={`${styles.wSpaceLeftHead} ${
                    selectedproject === "inbox" ? styles.selectedInbox : ""
                  }`}
                  onClick={() => dispatch(selectedProjects("profile"))}
                >
                  <img src="/profile-icon.svg" alt="Profile" />
                  <p>Profile</p>
                </div>
              </>
            )} */}
          </div>
        </div>

        <div className={styles.wSpaceLeftBtm}>
          <div className={styles.logOut} onClick={() => setLogout(true)}>
            <img src="/logout.svg" alt="Logout" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
