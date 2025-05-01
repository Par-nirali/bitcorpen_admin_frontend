import React, { useState } from "react";
import styles from "./usercontentposts.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import styles1 from "./finalremovepopup.module.scss";
import { Table } from "antd";
import { createPortal } from "react-dom";
import { useToast } from "@chakra-ui/react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import axios from "axios";
import RemoveFlagUserPopup from "../FlagUsers/RemoveFlagUserPopup";
import SuspendFlagUserPopup from "../FlagUsers/SuspendFlagUserPopup";
import SendAlertPopup from "../FlagUsers/SendAlertPopup";
// import UpdateUserPopup from "./UpdateUserPopup";
// import SendMsgUser from "./SendMsgUser";

const UserContentPost = ({ setSelectedProject, warningpopup }: any) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [showSuspendPopup, setShowSuspendPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const selectedContentDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  console.log("selectedContentDetail", selectedContentDetail);

  // const handleRemove = async (requestId: string) => {
  //   try {
  //     console.log("Connection removed:", requestId);
  //     setSelectedUserId(requestId);
  //     setShowRejectPopup(true);
  //   } catch (error) {
  //     console.error("Error removing connection:", error);
  //   }
  // };

  // const handleBlock = async (requestId: string) => {
  //   try {
  //     console.log("User blocked:", requestId);
  //     setSelectedUserId(requestId);
  //     setShowBlockPopup(true);
  //   } catch (error) {
  //     console.error("Error blocking user:", error);
  //   }
  // };
  const getMoreItems = (): MenuProps["items"] => [
    {
      key: "remove",
      label: "Remove",
      onClick: () => {
        // dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
    {
      key: "sendalert",
      label: "Send Alert",
      onClick: () => {
        // dispatch(selectedDetails(record));
        setShowAlertPopup(true);
      },
    },
    {
      key: "suspend",
      label: "Suspend",
      onClick: () => {
        // dispatch(selectedDetails(record));
        setShowSuspendPopup(true);
      },
    },
  ];

  const handleSubmit = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/content-moderation/deletePost/${selectedContentDetail?.originalData?.postId?._id}`,
        // data: {
        //   reportId: selectedContentDetail._id,
        // },
        headers: {
          Authorization: `${tkn}`,
        },
      });
      console.log("API Response:", response.data);
      setShowSuccessPopup(true);
      // refreshData();
      // refreshDashData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (showSuccessPopup) {
    // const statusText = isDeactivating ? "Deactivated" : "Activated";

    return (
      <div className={styles1.modifyMainDiv}>
        <div className={styles1.modifyContainer}>
          <div className={styles1.modifySubDiv}>
            <div className={styles1.modifyHead}>
              <h5>Post Removed</h5>
              <p className={styles1.modifyLinkDiv}>
                <span className={styles1.enid}>
                  {selectedContentDetail?.originalData?.postId?.ENID}
                </span>{" "}
                Report is removed
              </p>
            </div>
            <button
              className={styles1.closeButton}
              onClick={() => {
                setShowSuccessPopup(false);
                dispatch(selectedProjects("content_moderation"));
                // onClose();
              }}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.backUpMainDiv}>
          <button
            className={styles.backMainDiv}
            // onClick={() => setSelectedProject("sales projects")}
            onClick={() => dispatch(selectedProjects("content_moderation"))}
          >
            {/* <div className={styles.backArrow}> */}
            <img src="/icons/back.svg" alt="back" />
            {/* </div> */}
            <p>
              {selectedContentDetail?.originalData?.postId?.userId?.firstName}{" "}
              {selectedContentDetail?.originalData?.postId?.userId?.lastName}
              &apos;s Post Report
            </p>
          </button>
          {/* <p
            className={`${styles.statusTag} ${
              selectedUserPostDetails?.status === "Resolved"
                ? ""
                : selectedUserPostDetails?.status === "Under Review"
                ? styles.yellow
                : styles.red
            }`}
          >
            {selectedUserPostDetails?.status}
          </p> */}
          {selectedContentDetail?.originalData?.flaggedUser ? (
            <>
              <Dropdown
                menu={{ items: getMoreItems() }}
                trigger={["hover"]}
                placement="bottomRight"
              >
                <a style={{ width: "24px", height: "24px" }}>
                  <img src="/icons/more.svg" alt="edit" />
                </a>
              </Dropdown>
            </>
          ) : (
            <div className={styles.deleteDiv} onClick={handleSubmit}>
              <img src="/icons/delete.svg" alt="delete" />
              <p className={styles.red}>Remove This Post</p>
            </div>
          )}
        </div>
        {/* <div className={styles.pHeadingDiv}>
            <h3>Add Project</h3>
          </div> */}

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            {/* {posts.map((post: any, index: number) => ( */}
            <div className={styles.postMainDiv}>
              <div className={styles.postUpDiv}>
                {/* <div className={styles.postCommentDiv}>
                    <img src={post.profileImage} alt="profile" />
                    <input
                      type="text"
                      placeholder="Commented on this Post"
                    ></input>
                  </div> */}
                <div className={styles.postProfDiv}>
                  <div className={styles.postProfImgDiv}>
                    <img
                      src={
                        selectedContentDetail?.originalData?.postId?.userId
                          ?.profileImage
                          ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedContentDetail?.originalData?.postId?.userId?.profileImage?.url}`
                          : "/memberflow/profilephoto.png"
                      }
                      alt="profile"
                    />
                  </div>
                  <div className={styles.postProfDetailDiv}>
                    <div className={styles.postProfDetailUp}>
                      <div className={styles.postProfDetailUpLeft}>
                        <p>
                          {
                            selectedContentDetail?.originalData?.postId?.userId
                              ?.firstName
                          }{" "}
                          {
                            selectedContentDetail?.originalData?.postId?.userId
                              ?.lastName
                          }
                        </p>
                        <div className={styles.postProfDays}>
                          <span>
                            {Math.floor(
                              (new Date().getTime() -
                                new Date(
                                  selectedContentDetail?.originalData?.postId
                                    ?.createdAt as string
                                ).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            Day Ago
                          </span>
                          {/* <img src="/icons/sun.svg" alt="sun" /> */}
                        </div>
                      </div>
                      {/* <div className={styles.followDropdown}>
                          <button className={styles.postProfFollowBtn}>
                            + Follow
                          </button>
                          <Dropdown
                            menu={{ items: getDropdownItems(post.id) }}
                            trigger={["hover"]}
                            placement="bottomRight"
                          >
                            <button className={styles.moreMenu}>
                              <img
                                src="/icons/more.svg"
                                alt="more"
                                className={styles.moreMenuImg}
                              />
                            </button>
                          </Dropdown>
                        </div> */}
                    </div>
                    <div className={styles.postProfDetailBtmText}>
                      <p>
                        {
                          selectedContentDetail?.originalData?.postId
                            ?.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {selectedContentDetail?.originalData?.postId && (
                <div className={styles.postPhotoDiv}>
                  {selectedContentDetail?.originalData?.postId?.mediaUrl ? (
                    selectedContentDetail?.originalData?.postId?.mediaUrl.match(
                      /\.(mp4|webm|ogg|wmv|avi|)$/i
                    ) ? (
                      <video controls>
                        <source
                          src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedContentDetail?.originalData?.postId?.mediaUrl}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={
                          selectedContentDetail?.originalData?.postId
                            ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedContentDetail?.originalData?.postId?.mediaUrl}`
                            : "/memberflow/profilephoto.png"
                        }
                        alt="post"
                      />
                    )
                  ) : (
                    <img src="/jobs/jobprofile.svg" alt="profile" />
                  )}
                </div>
              )}
              <div className={styles.postBtmDiv}>
                <div className={styles.postBtmLikesMainDiv}>
                  <p>
                    {selectedContentDetail?.originalData?.postId?.likeCount}{" "}
                    <span>Likes</span>
                  </p>
                  <div className={styles.postCmntShareDiv}>
                    <p>
                      {
                        selectedContentDetail?.originalData?.postId
                          ?.commentCount
                      }{" "}
                      <span>Comments</span>
                    </p>
                    <p>
                      {selectedContentDetail?.originalData?.postId?.shareCount}{" "}
                      <span>Shares</span>
                    </p>
                  </div>
                </div>
                {/* <div className={styles.postBtmOtherDiv}>
                    <div className={styles.postDiffOptionsDiv}>
                      <div className={styles.postDiffOptions}>
                        <img src="/icons/heart.svg" alt="empty heart" />
                        <p>Like</p>
                      </div>
                      <div className={styles.postDiffOptions}>
                        <img src="/icons/send.svg" alt="send" />
                        <p>Send</p>
                      </div>
                    </div>
                    <div className={styles.commentContainer}>
                      <div className={styles.commentInputSection}>
                        <div className={styles.avatar}>
                          <img src="/icons/janesmith.svg" alt="User avatar" />
                        </div>
                        <div className={styles.inputWrapper}>
                          <input type="text" placeholder="Add a Comment" />
                          <div className={styles.actionButtons}>
                            <button className={styles.iconButton}>
                              <img
                                src="/icons/emojilogo.svg"
                                alt=""
                                className={styles.emojiIcon}
                              />
                            </button>
                            <button className={styles.iconButton}>
                              <img
                                src="/icons/galleryexport.svg"
                                alt=""
                                className={styles.imageIcon}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={styles.commentDisplayMain}>
                        <div className={styles.commentDisplay}>
                          <div className={styles.avatar2}>
                            <img
                              src="/icons/janesmith.svg"
                              alt="Nathan avatar"
                            />
                          </div>
                          <div className={styles.commentContent}>
                            <div className={styles.commentHeader}>
                              <span className={styles.username}>Nathan B</span>
                              <div className={styles.moreRow}>
                                <span className={styles.timestamp}>
                                  3d ago{" "}
                                </span>
                                <img
                                  src="/icons/more.svg"
                                  alt="more"
                                  className={styles.moreMenuImg}
                                  style={{ transform: "rotate(90deg)" }}
                                />
                              </div>
                            </div>
                            <p className={styles.commentText}>
                              Networking is a crucial part of professional
                              growth. Here are five tips to help you expand your
                              network effectively
                            </p>
                            <div className={styles.showReplies}>
                              <p>Show 2 replies</p>
                            </div>
                          </div>
                        </div>
                        <div className={styles.commentActions}>
                          <div className={styles.commentActionsDiv}>
                            <button
                              className={`${styles.commentactionButton} ${
                                isUpvoted ? styles.upvoted : ""
                              }`}
                              onClick={() => {
                                setIsUpvoted(!isUpvoted);
                              }}
                            >
                              <span className={styles.thumbsUp}>
                                <img
                                  src={
                                    isUpvoted
                                      ? "/Ennews/upvotes.svg"
                                      : "/icons/heart.svg"
                                  }
                                  alt="Upvote"
                                />
                              </span>
                              <span className={styles.actionText}>2 Like</span>
                            </button>
                            <button className={styles.commentactionButton}>
                              <span className={styles.replyIcon}>
                                <img src="/icons/reply.svg" alt="" />
                              </span>
                              <span>Replay</span>
                            </button>
                          </div>
                          <div className={styles.viewMore}>
                            <button className={styles.viewMorebtn}>
                              view more
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
      {/* {showPopup &&
        createPortal(
          <SendMsgUser onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )} */}
      {showPopup &&
        createPortal(
          <RemoveFlagUserPopup
            onClose={() => setShowPopup(false)}
            // refreshData={getAllFlagUser}
            // refreshDashData={getFlagUserDashboard}
          />,
          document.getElementById("modals")!
        )}
      {showSuspendPopup &&
        createPortal(
          <SuspendFlagUserPopup
            onClose={() => setShowSuspendPopup(false)}
            // refreshData={getAllFlagUser}
            // refreshDashData={getFlagUserDashboard}
          />,
          document.getElementById("modals")!
        )}
      {showAlertPopup &&
        createPortal(
          <SendAlertPopup onClose={() => setShowAlertPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default UserContentPost;
