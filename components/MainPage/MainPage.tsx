import React, { useState, useEffect } from "react";
import styles from "./mainpage.module.scss";
import axios from "axios";
import Slidebar from "../Slidebar/Slidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Users/Users";
import CreditLogs from "../Creditlogs/CreditLogs";
import Subscribers from "../Subscribers/Subscribers";
import SupportAdmin from "../SupportAdmin/SupportAdmin";
import Affiliation from "../Affiliation/Affiliation";
import EnAssist from "../EnAssist/EnAssist";
import RecentAllJoin from "../Dashboard/RecentAllJoin/RecentAllJoin";
import RecentAllSubscribed from "../Dashboard/RecentAllSubscribed/RecentAllSubscribed";
import { ConfigProvider } from "antd";
import ShowUserDetail from "../Users/ShowUserDetail";
import IssueHelpedDetail from "../SupportAdmin/IssueHelpedDetail";
import AffiliationUserDetail from "../Affiliation/AffiliationUserDetail";
import Team from "../Teams/Team";
import AddMember from "../Teams/AddMember";
import Partners from "../PartnersCollabration/Partners";
import AddPartners from "../PartnersCollabration/AddPartners";

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
          localStorage.getItem("prsuserData") || "{}"
        );
        setUserDetail(userData);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userDetail?.designation?.name === "EMPLOYEE") {
      setSelectedProject("myreview");
      dispatch(selectedProjects("myreview"));
    } else if (userDetail?.designation?.name === "BDE") {
      setSelectedProject("my projects bde");
      dispatch(selectedProjects("my projects bde"));
    } else {
      setSelectedProject("");
      dispatch(selectedProjects(""));
    }
  }, [userDetail]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("prsuserData") || "{}");
      setUserDetail(userData);
    }
  }, []);

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
            ) : null}
          </div>
        </div>

        {/* {showpopup && (
          <Reviewpopup
            setShowPopup={setShowPopup}
            projectid={projectid}
            setProjectId={setProjectId}
            projectAmount={projectAmount}
            showStartDate={showStartDate}
            showProjectType={showProjectType}
            setLoader={setLoader}
            loader={loader}
          />
        )}

        {errorpopup && (
          <Errorpopup errorpopup={errorpopup} setErrorPopup={setErrorPopup} />
        )} */}
      </div>
    </>
  );
};

export default Performance;
// import React from "react";
// import styles from "./mainpage.module.scss";
// import Slidebar from "../Slidebar/Slidebar";

// const Performance = () => {
//   return (
//     <>
//       <>
//         <div className={styles.pMainDiv}>
//           <div className={styles.pContainer}>
//             <div className={styles.pSubDiv}>
//               <Slidebar />
//             </div>
//           </div>
//         </div>
//       </>
//     </>
//   );
// };

// export default Performance;
