import type { MenuProps } from "antd";
import { Dropdown, Table } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import styles from "./withdrawls.module.scss";
// import AccountVerificationPopup from "./AccountVerificationPopup";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Pagination from "../Pagination/Pagination";

const Withdrawls = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [withdrawlsData, setWithdrawlsData] = useState<any>([]);
  const [withdrawlsDashboard, setWithdrawlsDashboard] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<string>("Month");
  const [dropdownLabel, setDropdownLabel] = useState<string>("Month");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const getDropdownItems = (): MenuProps["items"] => [
    {
      key: "7 Days",
      label: "7 Days",
      onClick: () => {
        setDropdownLabel("7 Days");
        setCurrentFilter("7 Days");
        getWithdrawlsAllData("7 Days");
      },
    },
    {
      key: "10 Days",
      label: "10 Days",
      onClick: () => {
        setDropdownLabel("10 Days");
        setCurrentFilter("10 Days");
        getWithdrawlsAllData("10 Days");
      },
    },
    {
      key: "Month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("Month");
        getWithdrawlsAllData("Month");
      },
    },
  ];

  // const getAccountVerifDashboard = async () => {
  //   let token = localStorage.getItem("auth-token");

  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/account-verification/get-total-details`,
  //       headers: { Authorization: `${token}` },
  //     });
  //     console.log(response, "response");
  //     setWithdrawlsDashboard(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getWithdrawlsAllData = async (filterDate: string) => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/withdrawal/withdrawal-history?filter=${selectedFilter}&filterDate=${filterDate}`,
        headers: { Authorization: `${token}` },
      });

      console.log(response.data.data, "response of accont verification");
      setWithdrawlsDashboard(response.data.dashbord);
      const selectAllWithdrawls = response.data;
      if (selectAllWithdrawls && selectAllWithdrawls.data) {
        const formattedData = selectAllWithdrawls.data.map(
          (withdrawl: any, index: number) => ({
            _id: withdrawl._id || index.toString(),
            enid: withdrawl.userId?.ENID || "ENID{NUMBER}",
            userName: withdrawl?.userId?.userName || "-",
            name: `${withdrawl?.userId?.firstName || "Test"} ${
              withdrawl?.userId?.lastName || "User"
            }`.trim(),
            requestedDate: new Date(withdrawl.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            accountDetails: `${withdrawl?.userId?.email || "-"} ${
              withdrawl?.userId?.phone || "-"
            }`,
            status: withdrawl?.status || "-",
            originalData: withdrawl,
          })
        );
        setWithdrawlsData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationItem = (record: any): MenuProps["items"] => [
    {
      key: "giveverification",
      label: "Give a Verification",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
  ];

  const columns = [
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
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
    // {
    //   title: "Id Proof's ",
    //   dataIndex: "idproofs",
    //   key: "idproofs",
    //   render: (_: any, record: any) => {
    //     const originalData = record.originalData;
    //     const imageBaseUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL;

    //     // Only render if originalData exists
    //     if (!originalData) return "-";

    //     return (
    //       <PhotoProvider>
    //         <div className={styles.idProofContainer}>
    //           {originalData.photoID && (
    //             <div className={styles.idProofItem}>
    //               <PhotoView src={`${imageBaseUrl}/${originalData.photoID}`}>
    //                 <span className={styles.imageUrlText}>
    //                   {originalData.photoID}
    //                 </span>
    //                 {/* <span className={styles.imageLink}>View Image</span> */}
    //               </PhotoView>
    //             </div>
    //           )}

    //           {originalData.photoUrl && (
    //             <div className={styles.idProofItem}>
    //               <PhotoView src={`${imageBaseUrl}/${originalData.photoUrl}`}>
    //                 <span className={styles.imageUrlText}>
    //                   {originalData.photoUrl}
    //                 </span>
    //                 {/* <span className={styles.imageLink}>View Image</span> */}
    //               </PhotoView>
    //             </div>
    //           )}

    //           {originalData.affilationProof && (
    //             <div className={styles.idProofItem}>
    //               <PhotoView
    //                 src={`${imageBaseUrl}/${originalData.affilationProof}`}
    //               >
    //                 <span className={styles.imageUrlText}>
    //                   {originalData.affilationProof}
    //                 </span>
    //                 {/* <span className={styles.imageLink}>View Image</span> */}
    //               </PhotoView>
    //             </div>
    //           )}
    //         </div>
    //       </PhotoProvider>
    //     );
    //   },
    // },
    {
      title: "Requested Date ",
      dataIndex: "requestedDate",
      key: "requestedDate",
    },
    {
      title: "Account Details",
      dataIndex: "accountDetails",
      key: "accountDetails",
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
            backgroundColor:
              status === "SUCCESS"
                ? "#E6F6F4"
                : status === "Pending"
                ? "#ffe10033"
                : status === "Failed"
                ? "#ff4b4e33"
                : "#F5F5F5",
            color:
              status === "SUCCESS"
                ? "#009883"
                : status === "Pending"
                ? "#968612"
                : status === "Failed"
                ? "#968612"
                : "#3D3D3D",
          }}
        >
          {status === "SUCCESS"
            ? "Success"
            : status === "Pending"
            ? "Pending"
            : status === "Failed"
            ? "Failed"
            : "Unclaimed"}
        </span>
      ),
    },
    // {
    //   title: "Operate",
    //   dataIndex: "operate",
    //   key: "operate",
    //   render: (_: any, record: any) => (
    //     <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
    //       <a
    //         onClick={() => {
    //           dispatch(selectedDetails(record));
    //           dispatch(selectedProjects("showaccountdetails"));
    //         }}
    //         className={styles.eyeIcon}
    //       >
    //         <img src="/icons/eye.svg" alt="eye" />
    //       </a>
    //       <Dropdown
    //         menu={{ items: getVerificationItem(record) }}
    //         trigger={["hover"]}
    //         placement="bottomRight"
    //       >
    //         <a style={{ width: "24px", height: "24px" }}>
    //           <img src="/icons/more.svg" alt="edit" />
    //         </a>
    //       </Dropdown>
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    getWithdrawlsAllData("Month");
    setDropdownLabel("Month");
  }, [selectedFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return withdrawlsData.slice(startIndex, startIndex + itemsPerPage);
  }, [withdrawlsData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Withdrawls</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Withdrawal</h3>

              <div className={styles.leftPercentScore}>
                <p>${withdrawlsDashboard?.totalWithdrawal || 0}</p>
                {/* <span className={styles.userTitle}></span> */}
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Requests</h3>
              <div className={styles.leftPercentScore}>
                <p>{withdrawlsDashboard?.totalRequest || 0}</p>
                <span className={styles.userTitle}>Requests</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Success</h3>
              <div className={styles.leftPercentScore}>
                <p>{withdrawlsDashboard?.totalSuccess || 0}</p>
                <span className={styles.userTitle}>Requests</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Rejected</h3>
              <div className={styles.leftPercentScore}>
                <p>{withdrawlsDashboard?.totalFailed || 0}</p>
                <span className={styles.userTitle}>Requests</span>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              <p
                className={selectedFilter === "All" ? styles.activeFilter : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All
              </p>
              <p
                className={
                  selectedFilter === "SUCCESS" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("SUCCESS")}
              >
                Success
              </p>
              <p
                className={
                  selectedFilter === "PENDING" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("PENDING")}
              >
                Pending
              </p>
              <p
                className={
                  selectedFilter === "FAILED" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("FAILED")}
              >
                Failed
              </p>
              <p
                className={
                  selectedFilter === "UNCLAIMED" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("UNCLAIMED")}
              >
                Unclaimed
              </p>
            </div>
            {/* <div className={styles.inputMainDiv}>
              <p>
                <img src={"/icons/searchnormal.svg"} alt="search" />
              </p>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="Search Here"
                />
              </div>
            </div> */}
            <div className={styles.monthsDropdown}>
              <Dropdown
                menu={{ items: getDropdownItems() }}
                trigger={["hover"]}
                placement="bottomRight"
              >
                <div className={styles.dollarsLabel}>
                  <p>{dropdownLabel}</p>
                  <div className={styles.dropdownArrow}>
                    <img src="/icons/dashdownarrow.svg" alt="dropdownarrow" />
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                rowKey="key"
                bordered={true}
                columns={columns}
                // dataSource={withdrawlsData}
                dataSource={paginatedData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={withdrawlsData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>

      {/* {showPopup &&
        createPortal(
          <AccountVerificationPopup
            onClose={() => setShowPopup(false)}
            refreshData={getWithdrawlsAllData}
            refreshDashData={getAccountVerifDashboard}
          />,
          document.getElementById("modals")!
        )} */}
    </>
  );
};

export default Withdrawls;
