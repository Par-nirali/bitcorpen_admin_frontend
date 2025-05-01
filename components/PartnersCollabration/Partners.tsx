import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import styles from "./partners.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemovePartnerPopup from "./RemovePartnerPopup";
import StatusChangePopup from "./StatusChangePopup";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const Partners = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();
  // const [allPartnerData, setAllPartnerData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [partnerTableData, setPartnerTableData] = useState<any[]>([]);
  const [partnerDashboard, setPartnerDashboard] = useState<any>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const getAllPartnerData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/partner-collaboration/get`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      const allPartnerData = response.data.data;
      // setAllPartnerData(response.data.data);
      if (allPartnerData) {
        const formattedData = allPartnerData.map(
          (partner: any, index: number) => ({
            _id: partner._id || index.toString(),
            // enid: partner.ENID || "ENID{NUMBER}",
            companyName: partner?.companyName || "Company Name",
            logo: partner?.logo
              ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${partner?.logo}`
              : "/profile.png",
            url: partner.website || "-",
            type: partner.partnerType || "-",
            status: partner.status || "-",
            joinedDate: new Date(partner.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            originalData: partner,
            // subscription: partner.userType || "-",
          })
        );
        setPartnerTableData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerStatusClick = (
    currentStatus: "Active" | "Deactivated"
  ) => {
    setSelectedStatus(currentStatus);
    setShowStatusPopup(true);
  };

  const getMoreItems = (partner: any): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => {
        dispatch(selectedDetails(partner));
        dispatch(selectedProjects("addpartners"));
      },
    },
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(partner));
        setShowPopup(true);
      },
    },
    {
      key: "status",
      label: partner.status === "active" ? "Inactivate" : "Activate",
      onClick: () => {
        dispatch(selectedDetails(partner));
        setShowStatusPopup(true);
        // handlePartnerStatusClick(partner.status);
      },
    },
  ];

  const getPartnerDashboard = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/partner-collaboration/dashboard`,
        headers: { Authorization: `${token}` },
      });
      setPartnerDashboard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    // {
    //   title: "Nos.",
    //   dataIndex: "index",
    //   width: 80,
    //   render: (_: any, __: any, index: number) => `#${index + 1}`,
    // },
    // {
    //   title: "",
    //   dataIndex: "checkbox",
    //   key: "checkbox",
    //   render: () => <input type="checkbox" />,
    // },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo: any) => (
        <img src={logo} alt="logo" style={{ width: "84px", height: "84px" }} />
      ),
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url: any) => (
        <a style={{ color: "#009883", textDecoration: "underline" }}>{url}</a>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
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
          <Dropdown
            menu={{ items: getMoreItems(record) }}
            trigger={["hover"]}
            placement="bottomRight"
            // style={{ width: "100%" }}
          >
            <a>
              <img src="/icons/more.svg" alt="more" />
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllPartnerData();
    getPartnerDashboard();
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return partnerTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [partnerTableData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Partners Collaborated</p>
          <button
            className={styles.addPartnerBtn}
            type="button"
            onClick={() => {
              dispatch(selectedDetails(""));
              dispatch(selectedProjects("addpartners"));
            }}
          >
            Add Partner
          </button>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Partners</h3>

              <div className={styles.leftPercentScore}>
                <p>{partnerDashboard?.totalPC}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Partners</h3>
              <div className={styles.leftPercentScore}>
                <p>{partnerDashboard?.activePC}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive Partners</h3>
              <div className={styles.leftPercentScore}>
                <p>{partnerDashboard?.inactivePC}</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>
          </div>

          <div className={styles.graphUserTableDiv}>
            <div className={styles.dropdownsSection}>
              <p className={styles.dollarsTitle}>Partners Details</p>
            </div>

            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                columns={columns}
                dataSource={paginatedData}
                // dataSource={partnerTableData}
                // dataSource={data}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={partnerTableData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>

      {showPopup &&
        createPortal(
          <RemovePartnerPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllPartnerData}
            refreshDashData={getPartnerDashboard}
          />,
          document.getElementById("modals")!
        )}
      {showStatusPopup &&
        createPortal(
          <StatusChangePopup
            // currentStatus={selectedStatus!}
            onClose={() => {
              setShowStatusPopup(false);
              // setSelectedStatus(undefined);
            }}
            refreshData={getAllPartnerData}
            refreshDashData={getPartnerDashboard}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Partners;
