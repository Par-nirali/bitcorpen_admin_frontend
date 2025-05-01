import React, { useEffect, useState } from "react";
import styles from "./supportadmin.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";
import axios from "axios";

const SupportAdmin = () => {
  const dispatch = useDispatch();
  // const [userDetail, setUserDetail] = useState<any>("");
  const [scoreData, setScoreData] = useState<any>("");
  const [helpTableData, setHelpTableData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (typeof window !== "undefined") {
  //       const userData = JSON.parse(
  //         localStorage.getItem("bitcorpenadminData") || "{}"
  //       );
  //       setUserDetail(userData);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const getHelpSupportHeadData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/helpAndSupport/getDetail`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setScoreData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHelpSupportTableData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/helpAndSupport/get?filter=${selectedFilter}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data);
      setHelpTableData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const filteredSubscribers = supportQuestions.filter((supportQue) => {
  //   if (activeFilter === "All") return true;
  //   return supportQue.status === activeFilter;
  // });

  useEffect(() => {
    getHelpSupportHeadData();
  }, []);

  useEffect(() => {
    getHelpSupportTableData();
  }, [selectedFilter]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Help & Support</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.pScoreDiv}>
            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Total Questions</h3>

              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalRequest}</p>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Answered</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalAnsweredRequest}</p>
              </div>
            </div>

            <div className={styles.pScoreLeftinnerDiv}>
              <h3>Pending Questions</h3>
              <div className={styles.leftPercentScore}>
                <p>{scoreData?.totalPendingRequest}</p>
              </div>
            </div>
          </div>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {/* {["All", "Resolved", "UnResolved", "Priority Support"].map(
                (filter) => (
                  <p
                    key={filter}
                    className={activeFilter === filter ? styles.selected : ""}
                    onClick={() => handleFilterClick(filter)}
                  >
                    {filter}
                  </p>
                )
              )} */}
              <p
                className={selectedFilter === "All" ? styles.selected : ""}
                onClick={() => handleFilterSelect("All")}
              >
                All
              </p>
              <p
                className={selectedFilter === "Resolved" ? styles.selected : ""}
                onClick={() => handleFilterSelect("Resolved")}
              >
                Resolved
              </p>
              <p
                className={
                  selectedFilter === "Unresolved" ? styles.selected : ""
                }
                onClick={() => handleFilterSelect("Unresolved")}
              >
                UnResolved
              </p>
              <p
                className={
                  selectedFilter === "priority_support" ? styles.selected : ""
                }
                onClick={() => handleFilterSelect("priority_support")}
              >
                Priority Support
              </p>
            </div>
            <div className={styles.inputMainDiv}>
              <p>{helpTableData?.length} Questions</p>
            </div>
          </div>
          <div
            className={styles.graphUserTableDiv}
            // onClick={() => dispatch(selectedProjects("issuehelpdetails"))}
          >
            <div className={styles.questionsContainer}>
              {helpTableData?.length > 0 ? (
                helpTableData?.map((item: any) => (
                  <div
                    key={item._id}
                    className={`
                ${styles.questionItem} ${
                      item?.status === "Resolved"
                        ? ""
                        : styles.unresolvedQueItem
                    }`}
                    onClick={() => {
                      dispatch(selectedDetails(item));
                      dispatch(selectedProjects("issuehelpdetails"));
                    }}
                  >
                    <div className={styles.questionContent}>
                      {item?.status === "Resolved" ? (
                        <div
                          className={styles.userDot}
                          style={{ backgroundColor: "transparent" }}
                        ></div>
                      ) : (
                        <div className={styles.userDot}></div>
                      )}
                      <div className={styles.userInfo}>
                        <span className={styles.username}>
                          {item?.userId?.userName || "UserName"}
                        </span>
                        <div className={styles.questionText}>
                          {item?.yourIssue}
                        </div>
                        <div className={styles.date}>
                          {item?.createdAt
                            ? new Date(item?.createdAt)
                                .toISOString()
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")
                            : "DD-MM-YYYY"}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`${styles.status} ${
                        item?.status === "Resolved"
                          ? ""
                          : styles.unresolvedStatus
                      }`}
                    >
                      {item?.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.noData}>No Data Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportAdmin;
