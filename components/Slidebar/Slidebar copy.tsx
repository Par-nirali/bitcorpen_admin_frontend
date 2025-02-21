// import React, { useEffect, useState } from "react";
// import styles from "./slidebar.module.scss";
// import { CiHome } from "react-icons/ci";
// import { TbFolderOpen } from "react-icons/tb";
// import { IoIosLogOut } from "react-icons/io";
// import { LuFolderCheck } from "react-icons/lu";
// import { useDispatch, useSelector } from "react-redux";
// import { LuFolderX } from "react-icons/lu";

// import {
//   selectedProjects,
//   setCeodepartment,
//   setPrevvalue,
//   setDesignationId,
//   setSelectedEmpl,
//   setShowEmp,
// } from "../redux/actions";
// import axios from "axios";

// const Slidebar = ({
//   setSelectedProject,

//   setLogout,
//   userDetail,
//   submanagername,
//   setSubManagerName,
// }: any) => {
//   const selectedproject = useSelector((state: any) => state.selectedproject);
//   const ceodepartmentid = useSelector((state: any) => state.ceodepartmentid);
//   const showemp = useSelector((state: any) => state.showemp);
//   const [submanager, setSubManager] = useState([]);
//   const dispatch = useDispatch();
//   const [ceodepartments, setCeoDepartments] = useState([]);
//   const selectedemp = useSelector((state: any) => state.selectedemp || []);

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
//     const submanager = async () => {
//       if (userDetail && userDetail._id) {
//         try {
//           const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/getChildUser/${userDetail._id}`
//           );

//           setSubManager(res.data);
//           dispatch(setDesignationId(res.data[0]?.designation));
//         } catch (error) {
//           console.error("Error fetching submanager:", error);
//         }
//       }
//     };
//     submanager();
//   }, [userDetail]);

//   useEffect(() => {
//     if (selectedemp.length > 0) {
//       dispatch(selectedProjects("ceoempreview"));
//     }
//   }, [showemp]);

//   return (
//     <>
//       <div className={styles.wSpaceLeftMain}>
//         <div className={styles.wSpaceLeftSub}>
//           <div className={styles.wSpaceLeftUp}>
//             <div className={styles.headingDiv}>
//               <p>Dashboard</p>
//             </div>

//             <div className={styles.slidebarRoutes}>
//               {userDetail?.designation?.name === "MANAGER" && (
//                 <>
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "all projects"
//                         ? styles.selectedmyprojects
//                         : ""
//                     }`}
//                     onClick={() => dispatch(selectedProjects("all projects"))}
//                     data-button-type="myprojects"
//                   >
//                     <img src="/myprojectsb.svg" />
//                     <p>All Projects</p>
//                   </div>

//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "reviewed projects"
//                         ? styles.selectedreviewed
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("reviewed projects"))
//                     }
//                     data-button-type="rprojects"
//                   >
//                     <img src="/rprojectsb.svg" />
//                     <p>Reviewed Projects</p>
//                   </div>

//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "cancel projects"
//                         ? styles.selectedcprojects
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("cancel projects"))
//                     }
//                     data-button-type="cprojects"
//                   >
//                     <img src="/cancelpb.svg" />
//                     <p>Cancel Projects</p>
//                   </div>
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "notificationinbox"
//                         ? styles.selectedInbox
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("notificationinbox"))
//                     }
//                     data-button-type="inbox"
//                   >
//                     <img src="/inbox.svg" />
//                     <p>Inbox</p>
//                   </div>
//                 </>
//               )}
//               {userDetail?.designation?.name === "BDE" && (
//                 <>
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "my projects bde"
//                         ? styles.selectedmyprojects
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("my projects bde"))
//                     }
//                     data-button-type="myprojects"
//                   >
//                     <img src="/myprojectsb.svg" />
//                     <p>My Projects</p>
//                   </div>

//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "myreviewbde"
//                         ? styles.selectedstar
//                         : ""
//                     }`}
//                     onClick={() => dispatch(selectedProjects("myreviewbde"))}
//                     data-button-type="star"
//                   >
//                     <img src="/rstarb.svg" />
//                     <p>My Review</p>
//                   </div>
//                 </>
//               )}
//               {(userDetail?.designation?.name === "EMPLOYEE" ||
//                 userDetail?.designation?.name === "TEAM_LEAD" ||
//                 userDetail?.designation?.name === "MANAGER") && (
//                 <>
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "myreview" ? styles.selectedstar : ""
//                     }`}
//                     onClick={() => dispatch(selectedProjects("myreview"))}
//                     data-button-type="star"
//                   >
//                     <img src="/rstarb.svg" />
//                     <p>My Review</p>
//                   </div>

//                   {(userDetail?.designation?.name === "EMPLOYEE" ||
//                     userDetail?.designation?.name === "TEAM_LEAD") && (
//                     <div
//                       className={`${styles.wSpaceLeftHead} ${
//                         selectedproject === "my projects"
//                           ? styles.selectedmyprojects
//                           : ""
//                       }`}
//                       onClick={() => dispatch(selectedProjects("my projects"))}
//                       data-button-type="myprojects"
//                     >
//                       <img src="/myprojectsb.svg" />
//                       <p>My Projects</p>
//                     </div>
//                   )}

//                   {userDetail?.designation?.name === "MANAGER" && (
//                     <div
//                       className={`${styles.wSpaceLeftHead} ${
//                         selectedproject === "manager my projects"
//                           ? styles.selectedmyprojects
//                           : ""
//                       }`}
//                       onClick={() =>
//                         dispatch(selectedProjects("manager my projects"))
//                       }
//                       data-button-type="myprojects"
//                     >
//                       <img src="/myprojectsb.svg" />
//                       <p>My Projects</p>
//                     </div>
//                   )}
//                 </>
//               )}

//               {userDetail?.designation?.name === "MANAGER_LEAD" && (
//                 <>
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "topmanager projects"
//                         ? styles.selectedmyprojects
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("topmanager projects"))
//                     }
//                     data-button-type="myprojects"
//                   >
//                     <img src="/myprojectsb.svg" />
//                     <p>All Projects</p>
//                   </div>

//                   {submanager.map((subman: any) => (
//                     <div
//                       key={subman._id}
//                       className={`${styles.wSpaceLeftHead} ${
//                         selectedproject === subman._id
//                           ? styles.selectedmanagers
//                           : ""
//                       }`}
//                       onClick={() => {
//                         dispatch(selectedProjects(subman._id));

//                         setSelectedProject(subman._id);
//                         setSubManagerName(
//                           `${subman.firstName} ${subman.lastName}`
//                         );
//                       }}
//                       data-button-type="managers"
//                     >
//                       <img src="/managerb.svg" />
//                       <p>
//                         {`${subman?.firstName} ${subman?.lastName}`.length > 16
//                           ? `${`${subman?.firstName} ${subman?.lastName}`.slice(
//                               0,
//                               16
//                             )}...`
//                           : `${subman?.firstName} ${subman?.lastName}`}
//                       </p>
//                     </div>
//                   ))}
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "notificationinbox"
//                         ? styles.selectedInbox
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("notificationinbox"))
//                     }
//                     data-button-type="inbox"
//                   >
//                     <img src="/inbox.svg" />
//                     <p>Inbox</p>
//                   </div>
//                 </>
//               )}

//               {(userDetail?.designation?.name === "SALES_LEAD" ||
//                 userDetail?.designation?.name === "SALES_PERSON") && (
//                 <>
//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "my targets"
//                         ? styles.selectedhome
//                         : ""
//                     }`}
//                     onClick={() => dispatch(selectedProjects("my targets"))}
//                     data-button-type="home"
//                   >
//                     <img src="/homeb.svg" />
//                     <p>My Target</p>
//                   </div>

//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "sales projects" ||
//                       selectedproject === "salesaddprojects"
//                         ? styles.selectedmyprojects
//                         : ""
//                     }`}
//                     onClick={() => dispatch(selectedProjects("sales projects"))}
//                     data-button-type="myprojects"
//                   >
//                     <img src="/myprojectsb.svg" />
//                     <p>Projects</p>
//                   </div>
//                   {(userDetail?._id ===
//                     `${process.env.NEXT_PUBLIC_SALES_SHOW_ID}` ||
//                     userDetail?.designation?.name === "SALES_LEAD") && (
//                     <div
//                       className={`${styles.wSpaceLeftHead} ${
//                         selectedproject === "team leader all projects"
//                           ? styles.selectedmyprojects
//                           : ""
//                       }`}
//                       onClick={() =>
//                         dispatch(selectedProjects("team leader all projects"))
//                       }
//                       data-button-type="allprojects"
//                     >
//                       <img src="/myprojectsb.svg" />
//                       <p>All Projects</p>
//                     </div>
//                   )}

//                   <div
//                     className={`${styles.wSpaceLeftHead} ${
//                       selectedproject === "notificationinbox"
//                         ? styles.selectedInbox
//                         : ""
//                     }`}
//                     onClick={() =>
//                       dispatch(selectedProjects("notificationinbox"))
//                     }
//                     data-button-type="inbox"
//                   >
//                     <img src="/inbox.svg" />
//                     <p>Inbox</p>
//                   </div>
//                 </>
//               )}

//               {userDetail?.designation?.name === "CEO" && (
//                 <>
//                   {!showemp ? (
//                     <>
//                       <div
//                         className={`${styles.wSpaceLeftHead} ${
//                           selectedproject === "ceo dashboard"
//                             ? styles.selectedhome
//                             : ""
//                         }`}
//                         onClick={() =>
//                           dispatch(selectedProjects("ceo dashboard"))
//                         }
//                         data-button-type="home"
//                       >
//                         <img src="/homeb.svg" />
//                         <p>Dashboard</p>
//                       </div>
//                       <div
//                         className={`${styles.wSpaceLeftHead} ${
//                           selectedproject === "allemployees"
//                             ? styles.selectedallemployee
//                             : ""
//                         }`}
//                         onClick={() =>
//                           dispatch(selectedProjects("allemployees"))
//                         }
//                         data-button-type="allemployee"
//                       >
//                         <img src="/managerb.svg" />
//                         <p>All Employee</p>
//                       </div>

//                       {ceodepartments.map((dept: any) => (
//                         <div
//                           key={dept._id}
//                           className={`${styles.wSpaceLeftHead} ${
//                             selectedproject === dept._id ||
//                             selectedproject === dept.departmentName
//                               ? styles.selectedmyprojects
//                               : ""
//                           }`}
//                           onClick={() => {
//                             dispatch(selectedProjects(dept._id));
//                             dispatch(setCeodepartment(dept.departmentName));
//                             dispatch(setPrevvalue(dept._id));
//                           }}
//                           data-button-type="myprojects"
//                         >
//                           <img src="/myprojectsb.svg" />
//                           <p>{dept?.departmentName} </p>
//                         </div>
//                       ))}
//                       <div
//                         className={`${styles.wSpaceLeftHead} ${
//                           selectedproject === "notificationinbox"
//                             ? styles.selectedInbox
//                             : ""
//                         }`}
//                         onClick={() =>
//                           dispatch(selectedProjects("notificationinbox"))
//                         }
//                         data-button-type="inbox"
//                       >
//                         <img src="/inbox.svg" />
//                         <p>Inbox</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div
//                         className={`${styles.wSpaceLeftHead} ${
//                           selectedproject === "ceo dashboard"
//                             ? styles.selectedhomeCEO
//                             : ""
//                         }`}
//                         onClick={() => {
//                           dispatch(selectedProjects("ceo dashboard"));
//                           dispatch(setSelectedEmpl([]));
//                           dispatch(setShowEmp(false));
//                         }}
//                         data-button-type="home"
//                       >
//                         <img src="/homeb.svg" />
//                         <p>Home</p>
//                       </div>
//                       <div
//                         className={`${styles.wSpaceLeftHead} ${
//                           selectedproject === "ceoempreview"
//                             ? styles.selectedhome
//                             : ""
//                         }`}
//                         onClick={() =>
//                           dispatch(selectedProjects("ceoempreview"))
//                         }
//                         data-button-type="star"
//                       >
//                         <img src="/rstarb.svg" />
//                         <p>Review</p>
//                       </div>

//                       <div
//                         className={`${styles.wSpaceLeftHead} ${
//                           selectedproject === "ceoempprojects"
//                             ? styles.selectedmyprojects
//                             : ""
//                         }`}
//                         onClick={() =>
//                           dispatch(selectedProjects("ceoempprojects"))
//                         }
//                         data-button-type="myprojects"
//                       >
//                         <img src="/myprojectsb.svg" />
//                         <p>Projects Done</p>
//                       </div>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           <div className={styles.wSpaceLeftBtm}>
//             <div className={styles.logOut} onClick={() => setLogout(true)}>
//               <img src="/logout.svg" />
//               <p>Logout</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Slidebar;
import React from 'react'

const Slidebar copy = () => {
  return (
    <div>Slidebar copy</div>
  )
}

export default Slidebar copy