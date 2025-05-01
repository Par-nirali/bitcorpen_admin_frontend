import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../../redux/actions";
import styles from "./recentallsubscribed.module.scss";
import Pagination from "../../Pagination/Pagination";

const RecentAllSubscribed = () => {
  const dispatch = useDispatch();
  const selectRecSubscribedUserData = useSelector(
    (state: any) => state.selectedRecSubscribedUserDetails
  );
  console.log(selectRecSubscribedUserData, "selectRecSubscribedUserData");
  const [showRecSubscribedUser, setShowRecSubscribedUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const getRecentSubscribedUser = async () => {
    if (selectRecSubscribedUserData && selectRecSubscribedUserData.data) {
      const formattedData = selectRecSubscribedUserData.data.map(
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
          planexpires: new Date(user.expireTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        })
      );
      setShowRecSubscribedUser(formattedData);
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
      title: "Plan Expires",
      dataIndex: "planexpires",
      key: "planexpires",
      // render: (text: any) =>
      //   text === "ORGANIC"
      //     ? "Organic"
      //     : text === "AD"
      //     ? "Ad"
      //     : text === "AFFILIATES"
      //     ? "Affiliates"
      //     : text,
    },
  ];

  const data = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      plan: "Recruiter",
      status: "Active",
      joinedDate: "Jan, 10 2025",
      joinedThrough: "Ad",
    },
  ];

  useEffect(() => {
    if (selectRecSubscribedUserData) {
      getRecentSubscribedUser();
    }
  }, [selectRecSubscribedUserData]);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return showRecSubscribedUser.slice(startIndex, startIndex + itemsPerPage);
  }, [showRecSubscribedUser, currentPage, itemsPerPage]);

  return (
    <div className={styles.pSubRightDiv}>
      <button
        className={styles.backMainDiv}
        // onClick={() => setSelectedProject("sales projects")}
        onClick={() => dispatch(selectedProjects("dashboard"))}
      >
        <img src="/icons/back.svg" alt="back" />
        <p>Recent Subscribed </p>
      </button>

      <div className={styles.dashboardScroll}>
        {/* <div className={styles.pScoreDiv}>
          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Organic Joiners</h3>

            <div className={styles.leftPercentScore}>
              <p>{selectRecSubscribedUserData?.totalOrganicUser}</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>

          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Joined Through AD</h3>
            <div className={styles.leftPercentScore}>
              <p>{selectRecSubscribedUserData?.totalAdUser}</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>

          <div className={styles.pScoreLeftinnerDiv}>
            <h3>Affiliate Joiners</h3>
            <div className={styles.leftPercentScore}>
              <p>{selectRecSubscribedUserData?.totalAffilatesUser}</p>
              <span className={styles.userTitle}>Users</span>
            </div>
          </div>
        </div> */}
        <div className={styles.graphTableDiv}>
          <div className={styles.graphDivtable}>
            <Table
              bordered={true}
              // border={"1px solid #000"}
              columns={columns}
              // dataSource={showRecSubscribedUser}
              dataSource={paginatedData}
              pagination={false}
              className={styles.recentJoinTable}
              loading={showRecSubscribedUser.length === 0}
            />
          </div>
        </div>
        <Pagination
          totalItems={showRecSubscribedUser.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default RecentAllSubscribed;
