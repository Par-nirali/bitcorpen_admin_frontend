import React, { useState } from "react";
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

const Partners = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Deactivated"
  >();

  const handlePlanStatusClick = (currentStatus: "Active" | "Deactivated") => {
    setSelectedStatus(currentStatus);
    setShowStatusPopup(true);
  };

  const getMoreItems = (record: any): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => {
        setShowPopup(true);
      },
    },
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        setShowPopup(true);
      },
    },
    {
      key: "status",
      label: record.status === "Active" ? "Deactivate" : "Activate",
      onClick: () => {
        handlePlanStatusClick(record.status);
      },
    },
  ];
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
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: () => (
        <img
          src="/profile.png"
          alt="Profile"
          style={{ width: "84px", height: "84px" }}
        />
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
            backgroundColor: status === "Active" ? "#E8F7F7" : "#FFE9E9",
            color: status === "Active" ? "#00A3B1" : "#FF4D4F",
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

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      companyName: "John#Dummy Name",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Active",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
      url: "encolunyty/dummy-referral-spam.html",
      type: "Partner",
    },
    {
      key: "2",
      enid: "ENID5666959",
      companyName: "Dummy Name#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Active",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
      url: "encolunyty/dummy-referral-spam.html",
      type: "Partner",
    },
    {
      key: "3",
      enid: "ENID5666959",
      companyName: "John#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Deactivated",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
      url: "encolunyty/dummy-referral-spam.html",
      type: "Partner",
    },
  ];

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Partners Collaborated</p>
          <button
            className={styles.addPartnerBtn}
            type="button"
            onClick={() => dispatch(selectedProjects("addpartners"))}
          >
            Add Partner
          </button>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Partners</h3>

              <div className={styles.leftPercentScore}>
                <p>500</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Active Partners</h3>
              <div className={styles.leftPercentScore}>
                <p>7888</p>
                <span className={styles.userTitle}>Users</span>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Inactive Partners</h3>
              <div className={styles.leftPercentScore}>
                <p>756</p>
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
                dataSource={data}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
        </div>
      </div>

      {showPopup &&
        createPortal(
          <RemovePartnerPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
      {showStatusPopup &&
        createPortal(
          <StatusChangePopup
            currentStatus={selectedStatus!}
            onClose={() => {
              setShowStatusPopup(false);
              setSelectedStatus(undefined);
            }}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Partners;
