import React, { useState } from "react";
import styles from "./usercontentposts.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import { useToast } from "@chakra-ui/react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
// import UpdateUserPopup from "./UpdateUserPopup";
// import SendMsgUser from "./SendMsgUser";

const posts = [
  {
    profileImage: "/icons/janesmith.svg",
    postProfileImage: "/icons/janesmith.svg",
    name: "Nathan B",
    daysAgo: "4 ",
    postContent:
      "Networking is a crucial part of professional growth. Here are five tips to help you expand your network effectively.",
    postImage: "/postimg.png",
    likes: 250,
    comments: 50,
    share: 20,
  },
  {
    profileImage: "/icons/janesmith.svg",
    postProfileImage: "/icons/janesmith.svg",
    name: "John Doe",
    daysAgo: "2 ",
    postContent:
      "Learning new skills is key to staying competitive in the job market. Always be curious!",
    postImage: "/postimg.png",
    likes: 175,
    comments: 15,
    share: 75,
  },
];

const UserContentPost = ({ setSelectedProject, warningpopup }: any) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  const handleRemove = async (requestId: string) => {
    try {
      console.log("Connection removed:", requestId);
      setSelectedUserId(requestId);
      setShowRejectPopup(true);
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  const handleBlock = async (requestId: string) => {
    try {
      console.log("User blocked:", requestId);
      setSelectedUserId(requestId);
      setShowBlockPopup(true);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  const getDropdownItems = (userId: string): MenuProps["items"] => [
    {
      key: "notinterested",
      label: "Not Interested",
      onClick: () => {
        handleRemove(userId);
      },
    },
    {
      key: "report",
      label: "Report",
      onClick: () => {
        handleBlock(userId);
      },
    },
  ];
  const selectedUserPostDetails = useSelector(
    (state: any) => state.selectedDetails
  );

  const usercolumns = [
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: () => (
        <img
          src="/profile.png"
          alt="Profile"
          style={{ width: "84px", height: "84px" }}
        />
      ),
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
      title: "Joined date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: () => (
        <div style={{ display: "flex", gap: "8px" }}>
          <a onClick={() => setShowPopup(true)}>
            <img src="/icons/edit.svg" alt="edit" />
          </a>
          {/* <a onClick={() => dispatch(selectedProjects("userdetails"))}>
            <img src="/icons/eye.svg" alt="eye" />
          </a> */}
        </div>
      ),
    },
  ];
  const invoicecolumns = [
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      //   render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Billing date",
      dataIndex: "billingdate",
      key: "billingdate",
    },
    {
      title: "Expire date",
      dataIndex: "expiredate",
      key: "expiredate",
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
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      render: () => (
        <div style={{ display: "flex", gap: "8px" }}>
          <a style={{ display: "flex", gap: "8px" }}>
            <img src="/icons/edit.svg" alt="edit" />
            <p>Download</p>
          </a>
          {/* <a onClick={() => dispatch(selectedProjects("userdetails"))}>
            <img src="/icons/eye.svg" alt="eye" />
          </a> */}
        </div>
      ),
    },
  ];
  const userdata = [
    {
      key: "1",
      enid: "ENID5666959",
      userName: "John#_Doe",
      name: "John Doe",
      email: "dummyemail@email.com",
      phone: "+1 3656 5566 55",
      status: "Active",
      joinedDate: "Jan, 07, 2025",
      subscription: "Influencer",
    },
  ];
  const invoicedata = [
    {
      key: "1",
      plan: "Influencer",
      price: "$78.90",
      billingdate: "Jan, 07, 2025",
      expiredate: "Jan, 07, 2025",
      status: "Active",
    },
  ];

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
              {selectedUserPostDetails?.firstName}{" "}
              {selectedUserPostDetails?.lastName}Reported List{" "}
            </p>
          </button>
          <p
            className={`${styles.statusTag} ${
              selectedUserPostDetails?.status === "Resolved"
                ? ""
                : selectedUserPostDetails?.status === "Under Review"
                ? styles.yellow
                : styles.red
            }`}
          >
            {selectedUserPostDetails?.status}
          </p>
        </div>
        {/* <div className={styles.pHeadingDiv}>
            <h3>Add Project</h3>
          </div> */}

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            {posts.map((post: any, index: number) => (
              <div className={styles.postMainDiv} key={index}>
                <div className={styles.postUpDiv}>
                  <div className={styles.postCommentDiv}>
                    <img src={post.profileImage} alt="profile" />
                    <input
                      type="text"
                      placeholder="Commented on this Post"
                    ></input>
                  </div>
                  <div className={styles.postProfDiv}>
                    <div className={styles.postProfImgDiv}>
                      <img src={post.postProfileImage} alt="profile" />
                    </div>
                    <div className={styles.postProfDetailDiv}>
                      <div className={styles.postProfDetailUp}>
                        <div className={styles.postProfDetailUpLeft}>
                          <p>{post.name}</p>
                          <div className={styles.postProfDays}>
                            <span>{post.daysAgo} D</span>
                            {/* <img src="/icons/sun.svg" alt="sun" /> */}
                          </div>
                        </div>
                        <div className={styles.followDropdown}>
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
                        </div>
                      </div>
                      <div className={styles.postProfDetailBtmText}>
                        <p>{post.postContent}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {post.postImage && (
                  <div className={styles.postPhotoDiv}>
                    <img src={post.postImage} alt="post" />
                  </div>
                )}
                <div className={styles.postBtmDiv}>
                  <div className={styles.postBtmLikesMainDiv}>
                    <p>
                      {post.likes} <span>Likes</span>
                    </p>
                    <div className={styles.postCmntShareDiv}>
                      <p>
                        {post.comments} <span>Comments</span>
                      </p>
                      <p>
                        {post.share} <span>Shares</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.postBtmOtherDiv}>
                    <div className={styles.postDiffOptionsDiv}>
                      <div className={styles.postDiffOptions}>
                        <img src="/icons/heart.svg" alt="empty heart" />
                        <p>Like</p>
                      </div>
                      {/* <div className={styles.postDiffOptions}>
                        <img src="/icons/comment.svg" alt="comment" />
                        <p>Comment</p>
                      </div>
                      <div className={styles.postDiffOptions}>
                        <img src="/icons/share.svg" alt="share" />
                        <p>Share</p>
                      </div> */}
                      <div className={styles.postDiffOptions}>
                        <img src="/icons/send.svg" alt="send" />
                        <p>Send</p>
                      </div>
                    </div>
                    {/* <div className={styles.postBtmCommentMain}>
                      <div className={styles.postCommentProImg}>
                        <img src={post.profileImage} alt="profile" />
                      </div>
                      <div className={styles.postCommentInputDiv}>
                        <input
                          type="text"
                          placeholder="Add a Comment"
                          //
                        ></input>
                        <button className={styles.postCommentSendBtn}>
                          Post
                        </button>
                      </div>
                    </div> */}
                    <div className={styles.commentContainer}>
                      <div className={styles.commentInputSection}>
                        <div className={styles.avatar}>
                          <img src="/icons/janesmith.svg" alt="User avatar" />
                        </div>
                        <div className={styles.inputWrapper}>
                          <input type="text" placeholder="Add a Comment" />
                          <div className={styles.actionButtons}>
                            <button className={styles.iconButton}>
                              {/* <span > */}
                              <img
                                src="/icons/emojilogo.svg"
                                alt=""
                                className={styles.emojiIcon}
                              />
                              {/* </span> */}
                            </button>
                            <button className={styles.iconButton}>
                              {/* <span > */}
                              <img
                                src="/icons/galleryexport.svg"
                                alt=""
                                className={styles.imageIcon}
                              />
                              {/* </span> */}
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className={styles.doneButtonMain}>
                        <button className={styles.doneButton}>Done</button>
                      </div> */}
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
                                // if (isDownvoted) setIsDownvoted(false); // Ensure only one is active
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
                            {/* <button
                              className={`${styles.commentactionButton} ${
                                isDownvoted ? styles.downvoted : ""
                              }`}
                              onClick={() => {
                                setIsDownvoted(!isDownvoted);
                                // if (isUpvoted) setIsUpvoted(false); // Ensure only one is active
                              }}
                            >
                              <span className={styles.thumbsDown}>
                                <img
                                  src={
                                    isDownvoted
                                      ? "/Ennews/heart.svg"
                                      : "/Ennews/downvotes.svg"
                                  }
                                  alt="Downvote"
                                />
                              </span>
                              <span className={styles.actionText}>
                                1 Downvote
                              </span>
                            </button> */}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {showPopup &&
        createPortal(
          <SendMsgUser onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )} */}
    </>
  );
};

export default UserContentPost;
