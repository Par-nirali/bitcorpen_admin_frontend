import React, { useState } from "react";
import styles from "./headernotification.module.scss";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects, selectedDetails } from "../redux/actions";
import { createPortal } from "react-dom";

const supportQuestions = [
  {
    id: 1,
    user: "John_Doe",
    question:
      "I need to change my email address or personal details. Where can I do this?",
    date: "05-22-2024",
    status: "Unresolved",
  },
  {
    id: 2,
    user: "John_Doe",
    question:
      "I need to change my email address or personal details. Where can I do this?",
    date: "05-22-2024",
    status: "Resolved",
    answer:
      "To change your email address or personal details, go to Settings > Profile. There you can update your information. Changes will be effective immediately.",
  },
  {
    id: 3,
    user: "John_Doe",
    question:
      "I need to change my email address or personal details. Where can I do this?",
    date: "05-22-2024",
    status: "Unresolved",
  },
];
const HeaderNotification = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState<any>("All");

  const handleFilterClick = (filter: any) => {
    setActiveFilter(filter);
  };

  const filteredSubscribers = supportQuestions.filter((supportQue) => {
    if (activeFilter === "All") return true;
    return supportQue.status === activeFilter;
  });

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Notifications</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.tableFilterMainDiv}>
            <div className={styles.userFilter}>
              {["All", "Resolved", "Unresolved"].map((filter) => (
                <p
                  key={filter}
                  className={activeFilter === filter ? styles.selected : ""}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </p>
              ))}
            </div>
            <div className={styles.inputMainDiv}>
              <p>{supportQuestions.length} Questions</p>
            </div>
          </div>
          <div
            className={styles.graphUserTableDiv}
            // onClick={() => dispatch(selectedProjects("issuehelpdetails"))}
          >
            <div className={styles.questionsContainer}>
              {filteredSubscribers.map((item) => (
                <div
                  key={item.id}
                  className={`
                ${styles.questionItem} ${
                    item.status === "Resolved" ? "" : styles.unresolvedQueItem
                  }`}
                  onClick={() => {
                    dispatch(selectedDetails(item));
                    dispatch(selectedProjects("issuehelpdetails"));
                  }}
                >
                  <div className={styles.questionContent}>
                    {item.status === "Resolved" ? (
                      <div
                        className={styles.userDot}
                        style={{ backgroundColor: "transparent" }}
                      ></div>
                    ) : (
                      <div className={styles.userDot}></div>
                    )}
                    <div className={styles.userInfo}>
                      <span className={styles.username}>{item.user}</span>
                      <div className={styles.questionText}>{item.question}</div>
                      <div className={styles.date}>{item.date}</div>
                    </div>
                  </div>
                  <span
                    className={`${styles.status} ${
                      item.status === "Resolved" ? "" : styles.unresolvedStatus
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {showPopup &&
        createPortal(
          <UpdateUserPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )} */}
    </>
  );
};

export default HeaderNotification;
