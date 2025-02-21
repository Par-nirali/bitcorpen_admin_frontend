import React, { useState } from "react";
import styles from "./shownewsdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import DeleteNewsPopup from "./DeleteNewsPopup";
// import UpdateUserPopup from "./UpdateUserPopup";
// import SendMsgUser from "./SendMsgUser";

const ShowNewsDetail = ({ setSelectedProject, warningpopup }: any) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const selectedUserDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedUserDetails, "selectedUserDetails");

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.backUpMainDiv}>
          <button
            className={styles.backMainDiv}
            // onClick={() => setSelectedProject("sales projects")}
            onClick={() => dispatch(selectedProjects("news"))}
          >
            {/* <div className={styles.backArrow}> */}
            <img src="/icons/back.svg" alt="back" />
            {/* </div> */}
            <p>News</p>
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              // dispatch(selectedDetails(news));
              setShowPopup(true);
            }}
          >
            <img src="/icons/delete.svg" alt="delete" /> Delete
          </button>
        </div>

        {/* <div className={styles.pHeadingDiv}>
            <h3>Add Project</h3>
          </div> */}

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <div className={styles.newsHeadDiv}>
              <h3 className={styles.newsTitle}>
                Level Up Your Career with Expert Insights
              </h3>
              <p className={styles.newsSubTitle}>
                Discover actionable strategies to unlock your true potential and
                achieve professional growth in any industry.
              </p>
              <span className={styles.newsPublishTime}>
                Published on Dec 19, 2024 • 5 min read
              </span>
            </div>
            <hr className={styles.hrLine} />
            <div className={styles.newsDetailDiv}>
              <span className={styles.newsDescText}>
                Advancing your career is not just about working hard; it&apos;s
                about working smart. In today’s fast-paced professional world,
                it’s critical to stay ahead by continuously developing your
                skills and making informed decisions. This article outlines key
                strategies to help you reach the next level in your career,
                whether you&apos;re aiming for a promotion, transitioning roles,
                or starting fresh
              </span>
              <div className={styles.newsPointsDiv}>
                <div className={styles.newsPointDetailDiv}>
                  <h5 className={styles.newsPointHeadText}>
                    1. Set Clear Goals and Prioritize Them
                  </h5>
                  <span className={styles.newsDescText}>
                    Clarity is the foundation of success. Begin by identifying
                    your short-term and long-term career goals. Use tools like
                    SMART goal-setting frameworks to ensure your objectives are
                    Specific, Measurable, Achievable, Relevant, and Time-bound.
                  </span>
                  <p className={styles.newsExtraText}>
                    Pro Tip : Break your goals into actionable steps and track
                    your progress regularly.
                  </p>
                  <div className={styles.newsPointImgDiv}>
                    <img src="/newspointimg.png" alt="newspoint" />
                  </div>
                </div>
              </div>
              <div className={styles.conclusionDiv}>
                <h5 className={styles.newsPointHeadText}>Conclusion</h5>
                <span className={styles.newsDescText}>
                  Taking your career to the next level requires a combination of
                  effort, planning, and the right mindset. By setting clear
                  goals, learning continuously, and building a strong network,
                  you’ll be well on your way to achieving your professional
                  aspirations. Remember, the journey is just as important as the
                  destination—so enjoy the process!
                </span>
              </div>
            </div>
            <hr className={styles.hrLine} />
            <div className={styles.newsCommentDiv}>
              <div className={styles.commnetUserProfImg}>
                <img src="/icons/profile.svg" alt="commentuserprofile" />
              </div>
              <div className={styles.commentRightDiv}>
                <div className={styles.commentRightUpDiv}>
                  <div className={styles.commentUserDiv}>
                    <p>Nathan B</p>
                    <span>3d ago</span>
                  </div>
                  <div className={styles.commentTextDiv}>
                    <p>
                      Networking is a crucial part of professional growth. Here
                      are five tips to help you expand your network effectively,
                      Here are five tips to help you expand your network
                    </p>
                    <span>Show 2 replies</span>
                  </div>
                </div>
                <div className={styles.commentActionsDiv}>
                  <div className={styles.commentLeftDiv}>
                    <div className={styles.ationTextDiv}>
                      <img src="/icons/upvote.svg" alt="upvote" />
                      <p>2 Upvotes</p>
                    </div>
                    <div className={styles.ationTextDiv}>
                      <img src="/icons/downvote.svg" alt="downvote" />
                      <p>1 Downvote</p>
                    </div>
                    <div className={styles.ationTextDiv}>
                      <img src="/icons/reply.svg" alt="reply" />
                      <p>Reply</p>
                    </div>
                  </div>
                  <p className={styles.viewMoreText}>view more</p>
                </div>
              </div>
            </div>
            <hr className={styles.hrLine} />
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <DeleteNewsPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ShowNewsDetail;
