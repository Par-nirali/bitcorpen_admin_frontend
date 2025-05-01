// import { Table } from "antd";
// import axios from "axios";
// import { get } from "lodash";
// import React, { useEffect, useMemo, useState } from "react";
// import { createPortal } from "react-dom";
// import { useDispatch } from "react-redux";
// import { selectedDetails, selectedProjects } from "../redux/actions";
// import UpdateUserPopup from "./UpdateUserPopup";
// import styles from "./users.module.scss";

// interface ModifyPopupProps {
//   setModifyPopup: (show: boolean) => void;
//   setShowSuccessModify: (show: boolean) => void;
//   setCurrentView: React.Dispatch<any>;
// }

// const Users = () => {
//   const dispatch = useDispatch();
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [allUser, setAllUser] = useState<any>("");
//   const [userTableData, setUserTableData] = useState<any>([]);
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const searchColumns = useMemo(() => ["userName", "status"], []);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMultipleEdit, setIsMultipleEdit] = useState(false);

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };

//   const handleSearch = (value: string) => {
//     setSearchQuery(value);
//   };

//   const search = (restaurant: Record<string, any>) => {
//     return searchColumns.some((column) => {
//       return (
//         get(restaurant, column, "")
//           .toString()
//           .toLowerCase()
//           .indexOf(searchQuery.toLowerCase()) > -1
//       );
//     });
//   };

//   const getAllUser = async () => {
//     let token = localStorage.getItem("auth-token");

//     let url = `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/user/getAll`;

//     if (selectedFilter !== "all") {
//       url = `${url}?filter=${selectedFilter}`;
//     }

//     try {
//       const response = await axios({
//         method: "get",
//         url: url,
//         headers: { Authorization: `${token}` },
//       });
//       console.log();

//       setAllUser(response.data.data);
//       const selectAllUserData = response.data.data;
//       if (selectAllUserData && selectAllUserData.users) {
//         const formattedData = selectAllUserData.users
//           .filter(search)
//           .map((user: any, index: number) => ({
//             _id: user._id || index.toString(),
//             enid: user.ENID || "ENID{NUMBER}",
//             profile: user?.profileImage
//               ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${user?.profileImage?.url}`
//               : "/profile.png",
//             email: user.email || "-",
//             userName: user.userName || "-",
//             name: `${user.firstName || "Test"} ${
//               user.lastName || "User"
//             }`.trim(),
//             phone: user.phoneNumber || "-",
//             plan: user.userType || "-",
//             status: user.status || "-",
//             joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//               year: "numeric",
//             }),
//             subscription: user.userType || "-",
//           }));
//         setUserTableData(formattedData);

//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditMultiple = () => {
//     if (selectedRowKeys.length > 0) {
//       setIsMultipleEdit(true);
//       setShowPopup(true);
//     }
//   };

//   const handleFilterSelect = (filter: string) => {
//     setSelectedFilter(filter);
//   };

//   const columns = [
//     {
//       title: "Nos.",
//       dataIndex: "index",
//       width: 80,
//       render: (_: any, __: any, index: number) => `#${index + 1}`,
//     },

//     {
//       title: "ENID",
//       dataIndex: "enid",
//       key: "enid",
//       render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
//     },
//     {
//       title: "Profile",
//       dataIndex: "profile",
//       key: "profile",
//       width: 150,
//       render: (profile: any) => (
//         <img
//           src={profile}
//           alt="Profile"
//           style={{ width: "84px", height: "84px" }}
//         />
//       ),
//     },
//     {
//       title: "User Name",
//       dataIndex: "userName",
//       key: "userName",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status: any) => (
//         <span
//           style={{
//             padding: "4px 8px",
//             borderRadius: "64px",
//             backgroundColor: status === "active" ? "#E8F7F7" : "#FFE9E9",
//             color: status === "active" ? "#00A3B1" : "#FF4D4F",
//           }}
//         >
//           {status === "active" ? "Active" : "Inactivated"}
//         </span>
//       ),
//     },
//     {
//       title: "Joined date",
//       dataIndex: "joinedDate",
//       key: "joinedDate",
//     },
//     {
//       title: "Subscription",
//       dataIndex: "subscription",
//       key: "subscription",
//     },
//     {
//       title: "Operate",
//       dataIndex: "operate",
//       key: "operate",

//       render: (_: any, record: any) => (
//         <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//           <a
//             onClick={() => {
//               dispatch(selectedDetails(record));
//               setIsMultipleEdit(false);
//               setShowPopup(true);
//             }}
//             className={styles.editIcon}
//           >
//             <img src="/icons/edit.svg" alt="edit" />
//           </a>
//           <a
//             onClick={() => {
//               dispatch(selectedDetails(record));
//               dispatch(selectedProjects("userdetails"));
//             }}
//             className={styles.eyeIcon}
//           >
//             <img src="/icons/eye.svg" alt="eye" />
//           </a>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     getAllUser();
//   }, [selectedFilter, searchQuery]);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setIsMultipleEdit(false);
//   };

//   return (
//     <>
//       <div className={styles.pSubRightDiv}>
//         <div className={styles.pHeadingDiv}>
//           <p className={styles.tabTitle}>Users</p>
//         </div>

//         <div className={styles.dashboardScroll}>
//           <div className={styles.pScoreDiv}>
//             <div className={styles.pScoreLeftinnerDiv}>
//               <h3>Total Users Joined</h3>

//               <div className={styles.leftPercentScore}>
//                 <p>{allUser?.totalUser}</p>
//                 <span className={styles.userTitle}>Users</span>
//               </div>
//             </div>

//             <div className={styles.pScoreLeftinnerDiv}>
//               <h3>Active Users</h3>
//               <div className={styles.leftPercentScore}>
//                 <p>{allUser?.totalActiveUser}</p>
//                 <span className={styles.userTitle}>Users</span>
//               </div>
//             </div>

//             <div className={styles.pScoreLeftinnerDiv}>
//               <h3>Inactive Users </h3>
//               <div className={styles.leftPercentScore}>
//                 <p>{allUser?.totalInactiveUser}</p>
//                 <span className={styles.userTitle}>Users</span>
//               </div>
//             </div>

//             <div className={styles.pScoreLeftinnerDiv}>
//               <h3>Suspended </h3>
//               <div className={styles.leftPercentScore}>
//                 <p>{allUser?.totalSuspendedUser}</p>
//                 <span className={styles.userTitle}>Users</span>
//               </div>
//             </div>
//           </div>
//           <div className={styles.tableFilterMainDiv}>
//             <div className={styles.userFilter}>
//               <p
//                 className={selectedFilter === "all" ? styles.activeFilter : ""}
//                 onClick={() => handleFilterSelect("all")}
//               >
//                 All Users
//               </p>
//               <p
//                 className={
//                   selectedFilter === "active" ? styles.activeFilter : ""
//                 }
//                 onClick={() => handleFilterSelect("active")}
//               >
//                 Active Users
//               </p>
//               <p
//                 className={
//                   selectedFilter === "inactivate" ? styles.activeFilter : ""
//                 }
//                 onClick={() => handleFilterSelect("inactivate")}
//               >
//                 Inactive Users
//               </p>
//               <p
//                 className={
//                   selectedFilter === "suspended" ? styles.activeFilter : ""
//                 }
//                 onClick={() => handleFilterSelect("suspended")}
//               >
//                 Suspended Users
//               </p>
//             </div>
//             <div className={styles.inputMainDiv}>
//               <p>
//                 <img src={"/icons/searchnormal.svg"} alt="search" />
//               </p>
//               <div className={styles.inputDiv}>
//                 <input
//                   id="search"
//                   type="text"
//                   placeholder="Search Here"
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className={styles.graphUserTableDiv}>
//             <div className={styles.dropdownsSection}>
//               <p className={styles.dollarsTitle}>Users Details</p>
//               <div className={styles.editUserDiv}>
//                 <p>Edit Multiple</p>
//                 <a
//                   className={styles.editIcon}
//                   onClick={handleEditMultiple}
//                   style={{
//                     cursor:
//                       selectedRowKeys.length > 0 ? "pointer" : "not-allowed",
//                     opacity: selectedRowKeys.length > 0 ? 1 : 0.5,
//                   }}
//                 >
//                   <img src={"/icons/edit.svg"} alt="edit" />
//                 </a>
//               </div>
//             </div>

//             <div className={styles.graphDivtable}>
//               <Table
//                 rowSelection={rowSelection}
//                 rowKey="_id"
//                 bordered={true}
//                 columns={columns}
//                 loading={loading}
//                 dataSource={userTableData}
//                 pagination={false}
//                 className={styles.recentJoinTable}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {showPopup &&
//         createPortal(
//           <UpdateUserPopup
//             onClose={() => setShowPopup(false)}
//             refreshData={getAllUser}
//             userIds={
//               isMultipleEdit ? selectedRowKeys.map((key) => key.toString()) : []
//             }
//             isMultipleEdit={isMultipleEdit}
//           />,
//           document.getElementById("modals")!
//         )}
//     </>
//   );
// };

// export default Users;
import { Table } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import UpdateUserPopup from "./UpdateUserPopup";
import Pagination from "../Pagination/Pagination";
import styles from "./users.module.scss";

const Users = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allUser, setAllUser] = useState<any>("");
  const [userTableData, setUserTableData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const searchColumns = useMemo(() => ["userName", "status"], []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMultipleEdit, setIsMultipleEdit] = useState(false);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const search = (restaurant: Record<string, any>) => {
    return searchColumns.some((column) => {
      return (
        get(restaurant, column, "")
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) > -1
      );
    });
  };

  const getAllUser = async () => {
    let token = localStorage.getItem("auth-token");

    let url = `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/user/getAll`;

    if (selectedFilter !== "all") {
      url = `${url}?filter=${selectedFilter}`;
    }

    try {
      const response = await axios({
        method: "get",
        url: url,
        headers: { Authorization: `${token}` },
      });

      setAllUser(response.data.data);
      const selectAllUserData = response.data.data;
      if (selectAllUserData && selectAllUserData.users) {
        const formattedData = selectAllUserData.users
          .filter(search)
          .map((user: any, index: number) => ({
            _id: user._id || index.toString(),
            enid: user.ENID || "ENID{NUMBER}",
            profile: user?.profileImage
              ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${user?.profileImage?.url}`
              : "/profile.png",
            email: user.email || "-",
            userName: user.userName || "-",
            name: `${user.firstName || "Test"} ${
              user.lastName || "User"
            }`.trim(),
            phone: user.phoneNumber || "-",
            plan: user.userType || "-",
            status: user.status || "-",
            joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            subscription: user.userType || "-",
          }));
        setUserTableData(formattedData);

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMultiple = () => {
    if (selectedRowKeys.length > 0) {
      setIsMultipleEdit(true);
      setShowPopup(true);
    }
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const columns = [
    {
      title: "Nos.",
      dataIndex: "index",
      width: 80,
      render: (_: any, __: any, index: number) =>
        `#${(currentPage - 1) * itemsPerPage + index + 1}`,
    },
    // Other columns remain the same
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      width: 150,
      render: (profile: any) => (
        <img
          src={profile}
          alt="Profile"
          style={{ width: "84px", height: "84px" }}
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "64px",
            backgroundColor: status === "active" ? "#E8F7F7" : "#FFE9E9",
            color: status === "active" ? "#00A3B1" : "#FF4D4F",
          }}
        >
          {status === "active" ? "Active" : "Inactivated"}
        </span>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            onClick={() => {
              dispatch(selectedDetails(record));
              setIsMultipleEdit(false);
              setShowPopup(true);
            }}
            className={styles.editIcon}
          >
            <img src="/icons/edit.svg" alt="edit" />
          </a>
          <a
            onClick={() => {
              dispatch(selectedDetails(record));
              dispatch(selectedProjects("userdetails"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllUser();
  }, [selectedFilter, searchQuery]);

  // Get paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return userTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [userTableData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Users</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Users Joined</h3>

              <div className={styles.leftPercentScore}>
                <p>{allUser?.totalUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Users</h3>
              <div className={styles.leftPercentScore}>
                <p>{allUser?.totalActiveUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive Users </h3>
              <div className={styles.leftPercentScore}>
                <p>{allUser?.totalInactiveUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Suspended </h3>
              <div className={styles.leftPercentScore}>
                <p>{allUser?.totalSuspendedUser}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "all" ? styles.activeFilter : ""}
                onClick={() => handleFilterSelect("all")}
              >
                All Users
              </p>
              <p
                className={
                  selectedFilter === "active" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("active")}
              >
                Active Users
              </p>
              <p
                className={
                  selectedFilter === "inactivate" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("inactivate")}
              >
                Inactive Users
              </p>
              <p
                className={
                  selectedFilter === "suspended" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("suspended")}
              >
                Suspended Users
              </p>
            </div>
            <div className={styles.inputMainDiv}>
              <p>
                <img src={"/icons/searchnormal.svg"} alt="search" />
              </p>
              <div className={styles.inputDiv}>
                <input
                  id="search"
                  type="text"
                  placeholder="Search Here"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.dropdownsSection}>
              <p className={styles.dollarsTitle}>Users Details</p>
              <div className={styles.editUserDiv}>
                <p>Edit Multiple</p>
                <a
                  className={styles.editIcon}
                  onClick={handleEditMultiple}
                  style={{
                    cursor:
                      selectedRowKeys.length > 0 ? "pointer" : "not-allowed",
                    opacity: selectedRowKeys.length > 0 ? 1 : 0.5,
                  }}
                >
                  <img src={"/icons/edit.svg"} alt="edit" />
                </a>
              </div>
            </div>

            <div className={styles.graphDivtable}>
              <Table
                rowSelection={rowSelection}
                rowKey="_id"
                bordered={true}
                columns={columns}
                loading={loading}
                dataSource={paginatedData}
                pagination={false} // Disable antd's built-in pagination
                className={styles.recentJoinTable}
              />

              {/* Custom pagination component */}
            </div>
          </div>
          <Pagination
            totalItems={userTableData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>

      {showPopup &&
        createPortal(
          <UpdateUserPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllUser}
            userIds={
              isMultipleEdit ? selectedRowKeys.map((key) => key.toString()) : []
            }
            isMultipleEdit={isMultipleEdit}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Users;
