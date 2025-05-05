import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdControls from "../AdControls/AdControls";
import AddAdControls from "../AdControls/AddAdControls";
import AdminEditProfile from "../AdminEditProfile/AdminEditProfile";
import Affiliation from "../Affiliation/Affiliation";
import AffiliationUserDetail from "../Affiliation/AffiliationUserDetail";
import Articles from "../Articles/Articles";
import ShowArticleDetail from "../Articles/ShowArticleDetail";
import ContentModeration from "../ContentModeration/ContentModeration";
import UserContentPost from "../ContentModeration/UserContentPosts";
import CreditLogs from "../Creditlogs/CreditLogs";
import Dashboard from "../Dashboard/Dashboard";
import RecentAllJoin from "../Dashboard/RecentAllJoin/RecentAllJoin";
import RecentAllSubscribed from "../Dashboard/RecentAllSubscribed/RecentAllSubscribed";
import EditSubAdminProfile from "../EditSubAdminProfile/EditSubAdminProfile";
import EnAssist from "../EnAssist/EnAssist";
import FlagUser from "../FlagUsers/FlagUser";
// import HeaderNotifHelpDetail from "../HeaderNotification/headerNotifHelpDetail";
import HeaderNotifHelpDetail from "../HeaderNotification/HeaderNotifHelpDetail";
import HeaderNotification from "../HeaderNotification/HeaderNotification";
import IssueHelpedDetail from "../HelpAndSupportAdmin/IssueHelpedDetail";
import SupportAdmin from "../HelpAndSupportAdmin/SupportAdmin";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import News from "../News/News";
import ShowNewsDetail from "../News/ShowNewsDetail";
import WriteNews from "../News/WriteNews";
import NotificationSetting from "../NotiifcationSetting/NotificationSetting";
import AddPartners from "../PartnersCollabration/AddPartners";
import Partners from "../PartnersCollabration/Partners";
import { selectedProjects } from "../redux/actions";
import Slidebar from "../Slidebar/Slidebar";
import AddSubAdmin from "../SubAdmins/AddSubAdmin";
import SubAdmins from "../SubAdmins/SubAdmins";
import Subscribers from "../Subscribers/Subscribers";
import AddMember from "../Teams/AddMember";
import Team from "../Teams/Team";
import ShowUserDetail from "../Users/ShowUserDetail";
import Users from "../Users/Users";
import styles from "./mainpage.module.scss";

const Performance = () => {
  const [userDetail, setUserDetail] = useState<any>("");
  const [selectedProject, setSelectedProject] = useState<any>("");
  const [showpopup, setShowPopup] = useState(false);
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();
  const selectedproject = useSelector((state: any) => state.selectedproject);
  const [submanagername, setSubManagerName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("bitcorpenadminData") || "{}"
        );
        setUserDetail(userData);
      }
    };
    setShowPopup(false);
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userDetail?.userRole === "ADMIN") {
      setSelectedProject("dashboard");
      dispatch(selectedProjects("dashboard"));
    } else if (userDetail?.userRole === "SUBADMIN") {
      setSelectedProject("help_support_admin");
      dispatch(selectedProjects("help_support_admin"));
    } else {
      setSelectedProject("");
      dispatch(selectedProjects(""));
    }
  }, [userDetail]);

  return (
    <>
      <div className={styles.pMainDiv}>
        <div className={styles.pContainer}>
          <div className={styles.pSubDiv}>
            <Slidebar
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              setLogout={setLogout}
              userDetail={userDetail}
              submanagername={submanagername}
              setSubManagerName={setSubManagerName}
            />

            {selectedproject === "dashboard" ? (
              <Dashboard />
            ) : selectedproject === "users" ? (
              <Users />
            ) : selectedproject === "credit_logs" ? (
              <CreditLogs />
            ) : selectedproject === "subscribers" ? (
              <Subscribers />
            ) : selectedproject === "help_support_admin" ? (
              <SupportAdmin />
            ) : selectedproject === "affiliation" ? (
              <Affiliation />
            ) : selectedproject === "en_assist" ? (
              <EnAssist />
            ) : selectedproject === "userdetails" ? (
              <ShowUserDetail />
            ) : selectedproject === "issuehelpdetails" ? (
              <IssueHelpedDetail />
            ) : selectedproject === "recenetalljoin" ? (
              <RecentAllJoin />
            ) : selectedproject === "recenetallsubscribed" ? (
              <RecentAllSubscribed />
            ) : selectedproject === "affiliateuserdetail" ? (
              <AffiliationUserDetail />
            ) : selectedproject === "team" ? (
              <Team />
            ) : selectedproject === "addmember" ? (
              <AddMember />
            ) : selectedproject === "partners" ? (
              <Partners />
            ) : selectedproject === "addpartners" ? (
              <AddPartners />
            ) : selectedproject === "ad_controls" ? (
              <AdControls />
            ) : selectedproject === "addadcontrols" ? (
              <AddAdControls />
            ) : selectedproject === "leader_board" ? (
              <LeaderBoard />
            ) : selectedproject === "notifications" ? (
              <NotificationSetting />
            ) : selectedproject === "sub_admins" ? (
              <SubAdmins />
            ) : selectedproject === "addaubadmins" ? (
              <AddSubAdmin />
            ) : selectedproject === "flag_user" ? (
              <FlagUser />
            ) : selectedproject === "content_moderation" ? (
              <ContentModeration />
            ) : selectedproject === "usercontentposts" ? (
              <UserContentPost />
            ) : selectedproject === "news" ? (
              <News />
            ) : selectedproject === "news_details" ? (
              <ShowNewsDetail />
            ) : selectedproject === "writenews" ? (
              <WriteNews />
            ) : selectedproject === "articles" ? (
              <Articles />
            ) : selectedproject === "article_details" ? (
              <ShowArticleDetail articleId={""} />
            ) : selectedproject === "edit_profile" ? (
              <AdminEditProfile />
            ) : selectedproject === "header_notification" ? (
              <HeaderNotification />
            ) : selectedproject === "headernotifhelpdetail" ? (
              <HeaderNotifHelpDetail />
            ) : selectedproject === "editsubadminsprofile" ? (
              <EditSubAdminProfile />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Performance;
