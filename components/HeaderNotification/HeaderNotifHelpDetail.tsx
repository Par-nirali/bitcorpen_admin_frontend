import React, { useEffect, useState } from "react";
import styles from "./headernotifhelpdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import AnswerMsgUser from "./AnswerMsgUser";
import { getSocket } from "../Login/Login";

const HeaderNotifHelpDetail = () => {
  const dispatch = useDispatch();
  const socket = getSocket();
  const [showPopup, setShowPopup] = useState(false);
  const selectedQuestion = useSelector((state: any) => state.selectedDetails);
  console.log(selectedQuestion, "selectedQuestion");

  if (!selectedQuestion) {
    return null;
  }

  // useEffect(() => {
  //   const initializeNotifications = async () => {

  //     if (socket) {
  //       socket.on("notification", (data: any) => {
  //         console.log(data, "data");
  //       });
  //     }
  //   };
  //   initializeNotifications();
  // }, []);

  // const isUnresolved = selectedQuestion.status === "Unresolved";
  // console.log(isUnresolved, "isUnresolved");

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("header_notification"))}
        >
          <img src="/icons/back.svg" alt="back" />
          <p>Back </p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDiv}>
            <div className={styles.issueDetailDiv}>
              {/* <div className={styles.userDiv}></div> */}
              <div className={styles.issueInfoDiv}>
                <span className={styles.date}>
                  {selectedQuestion?.createdAt
                    ? new Date(selectedQuestion?.createdAt)
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")
                    : "DD-MM-YYYY"}
                </span>
                {/* <p className={styles.queTag}>Question</p> */}
                <p className={styles.username}>
                  {" "}
                  {selectedQuestion?.title || "title"}
                </p>
                <span className={styles.questionText}>
                  {selectedQuestion?.message}
                </span>
                {/* {!isUnresolved && selectedQuestion.answere && (
                  <>
                    <p className={styles.queTag}>Answer</p>
                    <span className={styles.questionText}>
                      {selectedQuestion?.answere}
                    </span>
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <AnswerMsgUser onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default HeaderNotifHelpDetail;
