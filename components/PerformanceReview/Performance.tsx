// import React, { useState, useEffect } from "react";
// import styles from "./performance.module.scss";
// import axios from "axios";
// import Slidebar from "../Slidebar/Slidebar";
// import { FaArrowUp } from "react-icons/fa6";
// import Projects from "../Projects/Projects";
// import Review from "../Review/Review";
// import Allprojects from "../Managerprojects/Allprojects";
// import Addprojectpopup from "../Dashboard/Addprojectpopup";
// import Reviewpopup from "../ReviewPopup/Reviewpopup";
// import Reviewedprojects from "../ReviewedProjects/Reviewedprojects";
// import Logout from "../Logout/Logout";
// import Topmanagerprojects from "../Topmanagerprojects/Topmanagerprojects";
// import Assignproject from "../Assignproject/Assignproject";
// import SubManagerprojects from "../Managerprojects/SubManagerprojects";
// import Target from "../Salesteamlead/Target";
// import Project from "../Salesteamlead/Project";
// import Salesaddproject from "../Salesteamlead/Salesaddproject";
// import Dashboard from "../Ceo/Dashboard/Dashboard";
// import Departments from "../Ceo/Departments/Departments";
// import Dmanagers from "../Ceo/Dmanagers/Dmanagers";
// import { useDispatch, useSelector } from "react-redux";
// import { selectedProjects } from "../redux/actions";
// import Assigntarget from "../Ceo/Ceoassign/Assigntarget";
// import Managermyprojects from "../Managerprojects/Managermyprojects";
// import DeleteProjects from "../DeleteProjects/DeleteProjects";
// import CancelledProjects from "../CancelledProjects/Cancelledprojects";
// import EmpRevieww from "../Ceo/Empreview/Empreview";
// import Empprojects from "../Ceo/EmpProjects/Empprojects";
// import Warningpopup from "../Warningpopup/Warningpopup";
// import Errorpopup from "../Errpopup/Errpopup";
// import Inbox from "../Inbox/Inbox";
// import TeamLeaderAllprojects from "../Salesteamlead/TeamLeaderAllProjects";
// import AllEmployees from "../Ceo/AllEmployees/AllEmployees";
// import BDEMyProjects from "../BDEsDashboard/MyProjectBDE";
// import BdeRevieww from "../BDEsDashboard/BdeReview";

// const Performance = () => {
//   const [userDetail, setUserDetail] = useState<any>("");
//   const [performanceScore, setPerformanceScore] = useState<any>("");
//   const [contributionScore, setContributionScore] = useState<any>("");
//   const [selectedProject, setSelectedProject] = useState<any>("");
//   const [showpopup, setShowPopup] = useState(false);
//   const [logout, setLogout] = useState(false);
//   const [assignproject, setAssignProject] = useState(false);
//   const [projectid, setProjectId] = useState("");
//   const [managerProjectId, setmanagerProjectId] = useState("");
//   const [assigntarget, setAssignTarget] = useState(false);
//   const [submanager, setSubManager] = useState([]);
//   const [ceomanagers, setCeoManagers] = useState([]);
//   const [showGroupId, setShowGroupId] = useState("");
//   const [deleteproject, setDeleteProject] = useState(false);
//   const dispatch = useDispatch();
//   const selectedproject = useSelector((state: any) => state.selectedproject);
//   const ceodepartmentid = useSelector((state: any) => state.ceodepartmentid);
//   const [warningpopup, setWarningPopup] = useState(false);
//   const [stopwarninpopup, setStopWarningpopup] = useState(false);
//   const [errorpopup, setErrorPopup] = useState(false);
//   const [submanagername, setSubManagerName] = useState("");
//   const [projectAmount, setProjectAmount] = useState("");
//   const [showProjectType, setShowProjectType] = useState("");
//   const [showStartDate, setStartDate] = useState("");
//   const [loader, setLoader] = useState(false);
  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (typeof window !== "undefined") {
//         const userData = JSON.parse(
//           localStorage.getItem("prsuserData") || "{}"
//         );
//         setUserDetail(userData);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (
//       userDetail?.designation?.name === "EMPLOYEE" ||
//       userDetail?.designation?.name === "TEAM_LEAD"
//     ) {
//       setSelectedProject("myreview");
//       dispatch(selectedProjects("myreview"));
//     } else if (userDetail?.designation?.name === "MANAGER") {
//       setSelectedProject("all projects");
//       dispatch(selectedProjects("all projects"));
//     } else if (userDetail?.designation?.name === "MANAGER_LEAD") {
//       setSelectedProject("topmanager projects");
//       dispatch(selectedProjects("topmanager projects"));
//     } else if (
//       userDetail?.designation?.name === "SALES_PERSON" ||
//       userDetail?.designation?.name === "SALES_LEAD"
//     ) {
//       setSelectedProject("my targets");
//       dispatch(selectedProjects("my targets"));
//     } else if (userDetail?.designation?.name === "CEO") {
//       setSelectedProject("ceo dashboard");
//       dispatch(selectedProjects("ceo dashboard"));
//     } else if (userDetail?.designation?.name === "BDE") {
//       setSelectedProject("my projects bde");
//       dispatch(selectedProjects("my projects bde"));
//     } else {
//       setSelectedProject("");
//       dispatch(selectedProjects(""));
//     }
//   }, [userDetail]);

//   // console.log("selected project is", selectedProject);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const userData = JSON.parse(localStorage.getItem("prsuserData") || "{}");
//       setUserDetail(userData);
//     }
//   }, []);

//   // useEffect(() => {

//   //     let tkn = localStorage.getItem("auth-token");
//   //     const score = async () => {
//   //         const res = await axios.get(
//   //             `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user`,
//   //             {
//   //                 headers: {
//   //                     Authorization: `Bearer ${tkn}`,
//   //                 },
//   //             },

//   //         );

//   //         console.log('new pc data', res.data)
//   //         setPerformanceScore(res.data.performanceScore)
//   //         setContributionScore(res.data.contributionScore)

//   //     };
//   //     score()

//   // }, [])

//   // console.log("projecccct is is", projectid);
//   // console.log("showP rojectType", showProjectType);

//   const [ceodepartments, setCeoDepartments] = useState([]);

//   useEffect(() => {
//     const ceoDepartments = async () => {
//       if (userDetail?.designation?.name === "CEO") {
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/department/getDepartment`
//           );
//           setCeoDepartments(res.data);
//         } catch (error) {
//           console.error("Error fetching managers:", error);
//         }
//       }
//     };
//     ceoDepartments();
//   }, [userDetail]);

//   useEffect(() => {
//     const subManagerDepart = async () => {
//       if (userDetail && userDetail._id) {
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/getChildUser/${userDetail._id}`
//           );
//           // console.log(res.data, "Employees Data");
//           setSubManager(res.data);
//         } catch (error) {
//           console.error("Error fetching submanager:", error);
//         }
//       }
//     };
//     subManagerDepart();
//   }, [userDetail]);

//   // console.log("delete popup", deleteproject);

//   return (
//     <>
//       <div className={styles.pMainDiv}>
//         <div className={styles.pContainer}>
//           <div className={styles.pSubDiv}>
//             <Slidebar
//               selectedProject={selectedProject}
//               setSelectedProject={setSelectedProject}
//               setLogout={setLogout}
//               userDetail={userDetail}
//               submanagername={submanagername}
//               setSubManagerName={setSubManagerName}
//             />
//             {selectedproject === "myreview" ? (
//               <Review />
//             ) : selectedproject === "my projects" ? (
//               <Projects />
//             ) : selectedproject === "all projects" ? (
//               <Allprojects
//                 // showpopup={showpopup}
//                 // setShowPopup={setShowPopup}
//                 setProjectId={setProjectId}
//                 setProjectAmount={setProjectAmount}
//                 deleteproject={deleteproject}
//                 setDeleteProject={setDeleteProject}
//                 setStartDate={setStartDate}
//                 setShowProjectType={setShowProjectType}
//                 loader={loader}
//                 setLoader={setLoader}
//               />
//             ) : selectedproject === "team leader all projects" ? (
//               <TeamLeaderAllprojects
//                 showpopup={showpopup}
//                 setShowPopup={setShowPopup}
//                 setProjectId={setProjectId}
//                 setProjectAmount={setProjectAmount}
//                 deleteproject={deleteproject}
//                 setDeleteProject={setDeleteProject}
//                 setStartDate={setStartDate}
//                 setShowProjectType={setShowProjectType}
//                 loader={loader}
//                 setLoader={setLoader}
//               />
//             ) : selectedproject === "reviewed projects" ? (
//               <Reviewedprojects />
//             ) : selectedproject === "cancel projects" ? (
//               <CancelledProjects
//                 showpopup={showpopup}
//                 setShowPopup={setShowPopup}
//                 setProjectId={setProjectId}
//                 deleteproject={deleteproject}
//                 setDeleteProject={setDeleteProject}
//               />
//             ) : selectedproject === "manager my projects" ? (
//               <Managermyprojects />
//             ) : selectedproject === "my projects bde" ? (
//               <BDEMyProjects />
//             ) : selectedproject === "myreviewbde" ? (
//               <BdeRevieww />
//             ) : selectedproject === "topmanager projects" ? (
//               <Topmanagerprojects
//                 assignproject={assignproject}
//                 setAssignProject={setAssignProject}
//                 setmanagerProjectId={setmanagerProjectId}
//               />
//             ) : submanager.find(
//                 (subman: any) => subman._id === selectedproject
//               ) ? (
//               <SubManagerprojects
//                 // setmanagerProjectId={setmanagerProjectId}
//                 setProjectId={setProjectId}
//                 setShowPopup={setShowPopup}
//                 submanagername={submanagername}
//               />
//             ) : selectedproject === "my targets" ? (
//               <Target />
//             ) : selectedproject === "notificationinbox" ? (
//               <Inbox setLoader={setLoader} loader={loader} />
//             ) : selectedproject === "sales projects" ? (
//               <Project setSelectedProject={setSelectedProject} />
//             ) : selectedproject === "salesaddprojects" ? (
//               <Salesaddproject
//                 setSelectedProject={setSelectedProject}
//                 warningpopup={warningpopup}
//                 setWarningPopup={setWarningPopup}
//                 setErrorPopup={setErrorPopup}
//                 errorpopup={errorpopup}
//                 stopwarninpopup={stopwarninpopup}
//                 setStopWarningpopup={setStopWarningpopup}
//               />
//             ) : selectedproject === "ceo dashboard" ? (
//               <Dashboard />
//             ) : selectedproject === "allemployees" ? (
//               <AllEmployees />
//             ) : selectedproject === "ceoempreview" ? (
//               <EmpRevieww />
//             ) : selectedproject === "ceoempprojects" ? (
//               <Empprojects />
//             ) : ceodepartments.find(
//                 (dept: any) => dept._id === selectedproject
//               ) ? (
//               <Departments
//                 setSelectedProject={setSelectedProject}
//                 setAssignTarget={setAssignTarget}
//                 assigntarget={assigntarget}
//                 setCeoManagers={setCeoManagers}
//                 setShowGroupId={setShowGroupId}
//                 showGroupId={showGroupId}
//                 // setSelectedDate={setSelectedDate}
//                 // selectedDate={selectedDate}
//               />
//             ) : ceodepartments.find(
//                 (dept: any) => dept.departmentName === ceodepartmentid
//               ) ? (
//               <Dmanagers
//                 setSelectedProject={setSelectedProject}
//                 setCeoManagers={setCeoManagers}
//                 setShowGroupId={setShowGroupId}
//                 ceomanagers={ceomanagers}
//                 showGroupId={showGroupId}
//               />
//             ) : null}
//           </div>
//         </div>

//         {/* : selectedproject === "ceo managers" ? (
//               <Dmanagers setSelectedProject={setSelectedProject} />
//             ) :  */}

//         {showpopup && (
//           <Reviewpopup
//             setShowPopup={setShowPopup}
//             projectid={projectid}
//             setProjectId={setProjectId}
//             projectAmount={projectAmount}
//             showStartDate={showStartDate}
//             showProjectType={showProjectType}
//             setLoader={setLoader}
//             loader={loader}
//             // showProjectType={showProjectType}
//           />
//         )}
//         {logout && <Logout logout={logout} setLogout={setLogout} />}
//         {assignproject && (
//           <Assignproject
//             setAssignProject={setAssignProject}
//             setmanagerProjectId={setmanagerProjectId}
//             managerProjectId={managerProjectId}
//             setSelectedProject={setSelectedProject}
//           />
//         )}

//         {deleteproject && (
//           <DeleteProjects
//             deleteproject={deleteproject}
//             setDeleteProject={setDeleteProject}
//             projectid={projectid}
//             setProjectId={setProjectId}
//             showpopup={showpopup}
//             setShowPopup={setShowPopup}
//           />
//         )}

//         {assigntarget && (
//           <Assigntarget
//             assigntarget={assigntarget}
//             setAssignTarget={setAssignTarget}
//             // selectedDate={selectedDate}
//           />
//         )}

//         {warningpopup && (
//           <Warningpopup
//             warningpopup={warningpopup}
//             setWarningPopup={setWarningPopup}
//             stopwarninpopup={stopwarninpopup}
//             setStopWarningpopup={setStopWarningpopup}
//           />
//         )}

//         {errorpopup && (
//           <Errorpopup errorpopup={errorpopup} setErrorPopup={setErrorPopup} />
//         )}
//       </div>
//     </>
//   );
// };

// export default Performance;
