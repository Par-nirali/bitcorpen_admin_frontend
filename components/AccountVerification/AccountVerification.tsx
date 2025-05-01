import type { MenuProps } from "antd";
import { Dropdown, Table } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import styles from "./accountverification.module.scss";
import AccountVerificationPopup from "./AccountVerificationPopup";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Pagination from "../Pagination/Pagination";

const AccountVerification = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [accountVerifyData, setAccountVerifyData] = useState<any>([]);
  const [accountDashboard, setAccountDashboard] = useState<any>("");
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
        getAccountVerifTableData("7 Days");
      },
    },
    {
      key: "10 Days",
      label: "10 Days",
      onClick: () => {
        setDropdownLabel("10 Days");
        setCurrentFilter("10 Days");
        getAccountVerifTableData("10 Days");
      },
    },
    {
      key: "Month",
      label: "Month",
      onClick: () => {
        setDropdownLabel("Month");
        setCurrentFilter("Month");
        getAccountVerifTableData("Month");
      },
    },
  ];

  const getAccountVerifDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/account-verification/get-total-details`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "response");
      setAccountDashboard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAccountVerifTableData = async (filterDate: string) => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/account-verification/get-data?filter=${selectedFilter}&filterDate=${filterDate}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data, "response of accont verification");
      const selectAllAccountVerify = response.data;
      if (selectAllAccountVerify && selectAllAccountVerify.data) {
        const formattedData = selectAllAccountVerify.data.map(
          (account: any, index: number) => ({
            _id: account._id || index.toString(),
            enid: account.userId?.ENID || "ENID{NUMBER}",
            userName: account?.userId?.userName || "-",
            name: `${account?.userId?.firstName || "Test"} ${
              account?.userId?.lastName || "User"
            }`.trim(),
            status: account?.status || "-",
            originalData: account,
          })
        );
        setAccountVerifyData(formattedData);
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
    {
      title: "Id Proof's ",
      dataIndex: "idproofs",
      key: "idproofs",
      render: (_: any, record: any) => {
        const originalData = record.originalData;
        const imageBaseUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL;

        // Only render if originalData exists
        if (!originalData) return "-";

        return (
          <PhotoProvider>
            <div className={styles.idProofContainer}>
              {originalData.photoID && (
                <div className={styles.idProofItem}>
                  <PhotoView src={`${imageBaseUrl}/${originalData.photoID}`}>
                    <span className={styles.imageUrlText}>
                      {originalData.photoID}
                    </span>
                    {/* <span className={styles.imageLink}>View Image</span> */}
                  </PhotoView>
                </div>
              )}

              {originalData.photoUrl && (
                <div className={styles.idProofItem}>
                  <PhotoView src={`${imageBaseUrl}/${originalData.photoUrl}`}>
                    <span className={styles.imageUrlText}>
                      {originalData.photoUrl}
                    </span>
                    {/* <span className={styles.imageLink}>View Image</span> */}
                  </PhotoView>
                </div>
              )}

              {originalData.affilationProof && (
                <div className={styles.idProofItem}>
                  <PhotoView
                    src={`${imageBaseUrl}/${originalData.affilationProof}`}
                  >
                    <span className={styles.imageUrlText}>
                      {originalData.affilationProof}
                    </span>
                    {/* <span className={styles.imageLink}>View Image</span> */}
                  </PhotoView>
                </div>
              )}
            </div>
          </PhotoProvider>
        );
      },
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
              status === "VERIFIED"
                ? "#E6F6F4"
                : status === "PENDING"
                ? "#ff4b4e33"
                : "#ffe10033",
            color:
              status === "VERIFIED"
                ? "#009883"
                : status === "PENDING"
                ? "#FF4B4E"
                : "#968612",
          }}
        >
          {status}
        </span>
      ),
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
              dispatch(selectedProjects("showaccountdetails"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a>
          <Dropdown
            menu={{ items: getVerificationItem(record) }}
            trigger={["hover"]}
            placement="bottomRight"
          >
            <a style={{ width: "24px", height: "24px" }}>
              <img src="/icons/more.svg" alt="edit" />
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAccountVerifDashboard();
  }, []);

  useEffect(() => {
    getAccountVerifTableData("Month");
    setDropdownLabel("Month");
  }, [selectedFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return accountVerifyData.slice(startIndex, startIndex + itemsPerPage);
  }, [accountVerifyData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Account Verification </p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>All</h3>

              <div className={styles.leftPercentScore}>
                <p>{accountDashboard?.totalENAssist || 0}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Verified</h3>
              <div className={styles.leftPercentScore}>
                <p>{accountDashboard?.totalApprovedENAssist || 0}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Pending</h3>
              <div className={styles.leftPercentScore}>
                <p>{accountDashboard?.totalPendingENAssist || 0}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Rejected</h3>
              <div className={styles.leftPercentScore}>
                <p>{accountDashboard?.totalRejectENAssist || 0}</p>
                <span className={styles.userTitle}>Users</span>
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
                  selectedFilter === "verified" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("verified")}
              >
                Verified
              </p>
              <p
                className={
                  selectedFilter === "pending" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("pending")}
              >
                Pending
              </p>
              <p
                className={
                  selectedFilter === "rejected" ? styles.activeFilter : ""
                }
                onClick={() => handleFilterSelect("rejected")}
              >
                Rejected
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
                // dataSource={accountVerifyData}
                dataSource={paginatedData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={accountVerifyData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>

      {showPopup &&
        createPortal(
          <AccountVerificationPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAccountVerifTableData}
            refreshDashData={getAccountVerifDashboard}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default AccountVerification;
