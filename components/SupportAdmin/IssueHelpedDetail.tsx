import React, { useState } from "react";
import styles from "./issuehelpeddetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import AnswerMsgUser from "./AnswerMsgUser";

const IssueHelpedDetail = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const selectedQuestion = useSelector((state: any) => state.selectedQuestion);
  console.log(selectedQuestion, "selectedQuestion");
  if (!selectedQuestion) {
    return null;
  }

  const isUnresolved = selectedQuestion?.status === "Unresolved";

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("help_support_admin"))}
        >
          <img src="/icons/back.svg" alt="back" />
          <p>Back </p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDiv}>
            <div className={styles.issueDetailDiv}>
              <div className={styles.userDiv}>
                <p className={styles.username}>{selectedQuestion?.user}</p>
                <span
                  className={`${styles.status} ${
                    isUnresolved ? styles.unresolvedStatus : ""
                  }`}
                >
                  {selectedQuestion?.status}
                </span>
              </div>
              <div className={styles.issueInfoDiv}>
                <span className={styles.date}>{selectedQuestion?.date}</span>
                <p className={styles.queTag}>Question</p>
                <span className={styles.questionText}>
                  {selectedQuestion?.question}
                </span>
                {!isUnresolved && selectedQuestion.answer && (
                  <>
                    <p className={styles.queTag}>Answer</p>
                    <span className={styles.questionText}>
                      {selectedQuestion?.answer}
                    </span>
                  </>
                )}
              </div>
              {isUnresolved && (
                <button
                  className={styles.submitButton}
                  onClick={() => setShowPopup(true)}
                  type="button"
                >
                  Answer
                </button>
              )}
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

export default IssueHelpedDetail;
