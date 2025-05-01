import React, { useEffect, useMemo, useState } from "react";
import styles from "./recentalljoin.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProjects,
  selectedRecJoinUserDetails,
} from "../../redux/actions";
import { Table } from "antd";
import Pagination from "../../Pagination/Pagination";

const RecentAllJoin = ({
  setSelectedProject,
  warningpopup,
  setWarningPopup,
  errorpopup,
  setErrorPopup,
  stopwarninpopup,
  setStopWarningpopup,
}: any) => {
  const dispatch = useDispatch();
  const selectRecJoinUserData = useSelector(
    (state: any) => state.selectedRecJoinUserDetails
  );
  console.log(selectRecJoinUserData, "selectRecJoinUserData allllllllll");
  const [showRecJoinUser, setShowRecJoinUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const getRecentJoinUser = async () => {
    if (selectRecJoinUserData && selectRecJoinUserData.recentJoined) {
      const formattedData = selectRecJoinUserData.recentJoined.map(
        (user: any, index: number) => ({
          key: user._id || index.toString(),
          enid: user.ENID || "ENID{NUMBER}",
          userName: user.userName || "-",
          name: `${user.firstName || "Test"} ${user.lastName || "User"}`.trim(),
          plan: user.userType || "-",
          status: user.status || "-",
          joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          joinedThrough: user.userIS || "-",
        })
      );
      setShowRecJoinUser(formattedData);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <p className={styles.enidTag}>{text}</p>,
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
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => (
        <p className={styles.statusTag}>
          {text === "active" ? "Active" : text}
        </p>
      ),
    },
    {
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Joined Through ",
      dataIndex: "joinedThrough",
      key: "joinedThrough",
      render: (text: any) =>
        text === "ORGANIC"
          ? "Organic"
          : text === "AD"
          ? "Ad"
          : text === "AFFILIATES"
          ? "Affiliates"
          : text,
    },
  ];

  useEffect(() => {
    if (selectRecJoinUserData) {
      getRecentJoinUser();
    }
  }, [selectRecJoinUserData]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return showRecJoinUser.slice(startIndex, startIndex + itemsPerPage);
  }, [showRecJoinUser, currentPage, itemsPerPage]);

  return (
    <div className={styles.pSubRightDiv}>
      <button
        className={styles.backMainDiv}
        onClick={() => dispatch(selectedProjects("dashboard"))}
      >
        <img src="/icons/back.svg" alt="back" />

        <p>Recent Joined</p>
      </button>

      <div className={styles.dashboardScroll}>
        <div className={styles.pScoreDiv}>
          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Organic Joiners</h3>

            <div className={styles.leftPercentScore}>
              <p>{selectRecJoinUserData?.totalOrganicUser}</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>

          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Joined Through AD</h3>
            <div className={styles.leftPercentScore}>
              <p>{selectRecJoinUserData?.totalAdUser}</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>

          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Affiliate Joiners</h3>
            <div className={styles.leftPercentScore}>
              <p>{selectRecJoinUserData?.totalAffilatesUser}</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>
        </div>
        <div className={styles.graphTableDiv}>
          <div className={styles.graphDivtable}>
            <Table
              bordered={true}
              // border={"1px solid #000"}
              columns={columns}
              dataSource={paginatedData}
              // dataSource={showRecJoinUser}
              pagination={false}
              className={styles.recentJoinTable}
              loading={showRecJoinUser.length === 0}
            />
          </div>
        </div>
        <Pagination
          totalItems={showRecJoinUser.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default RecentAllJoin;
