import React, { useEffect, useMemo, useState } from "react";
import styles from "./subadmins.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal, render } from "react-dom";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RemoveSubAdminPopup from "./RemoveSubAdminPopup";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const SubAdmins = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subAdminData, setSubAdminData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const getMoreItems = (record: any): MenuProps["items"] => [
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
  ];

  const getAllSubAdmins = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subAdmin/get`,
        headers: { Authorization: `${token}` },
      });

      const selectAllSubAdminData = response.data;
      console.log("selectAllSubAdminData", selectAllSubAdminData);

      if (selectAllSubAdminData && selectAllSubAdminData.data) {
        const formattedData = selectAllSubAdminData.data.map(
          (admin: any, index: number) => {
            const resources =
              admin.permission?.flatMap(
                (perm: any) =>
                  perm.permits?.map((permit: any) => permit.resource) || []
              ) || [];

            return {
              _id: admin._id || index.toString(),
              name: `${admin.firstName || "Test"} ${
                admin.lastName || "User"
              }`.trim(),
              profileImage: admin?.profileImage
                ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${admin?.profileImage?.url}`
                : "/profile.png",
              email: admin.email || "-",
              password: admin.password || "-",
              phoneNumber: admin.phoneNumber || "-",
              status: admin.status || "-",
              resources: resources,
              originalData: admin,
            };
          }
        );
        setSubAdminData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (profileImage: any) => (
        <img
          src={profileImage}
          alt="Profile"
          style={{ width: "84px", height: "84px" }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      // render: (phoneNumber: any) => (
      //   <span>{phoneNumber.replace(/\d(?=\d{4})/g, "x")}</span>
      //   // <span>{phoneNumber.replace(/^(\d{4})\d*(\d{4})$/, "$1xxxx$2")}</span>
      // ),
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
      title: "Roles",
      dataIndex: "resources",
      key: "resources",
      render: (resources: any) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {Array.isArray(resources) && resources.length > 0 ? (
            resources.map((resource, index) => (
              <span key={index} className={styles.rolesName}>
                {resource}
              </span>
            ))
          ) : (
            <span>-</span>
          )}
        </div>
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
              dispatch(selectedProjects("addaubadmins"));
            }}
            className={styles.editIcon}
          >
            <img src="/icons/edit.svg" alt="edit" />
          </a>
          <Dropdown
            menu={{ items: getMoreItems(record) }}
            trigger={["hover"]}
            placement="bottomRight"
          >
            <a style={{ width: "24px", height: "24px" }}>
              <img src="/icons/more.svg" alt="more" />
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllSubAdmins();
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return subAdminData.slice(startIndex, startIndex + itemsPerPage);
  }, [subAdminData, currentPage, itemsPerPage]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Sub Admins</p>
          <button
            className={styles.addPartnerBtn}
            type="button"
            onClick={() => {
              dispatch(selectedDetails(""));
              dispatch(selectedProjects("addaubadmins"));
            }}
          >
            Add Sub Admin
          </button>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                columns={columns}
                dataSource={paginatedData}
                // dataSource={subAdminData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
          <Pagination
            totalItems={subAdminData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>

      {showPopup &&
        createPortal(
          <RemoveSubAdminPopup
            onClose={() => setShowPopup(false)}
            refreshData={getAllSubAdmins}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default SubAdmins;
