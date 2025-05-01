import React, { useEffect, useState } from "react";
import styles from "./shownewsdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import DeleteNewsPopup from "./DeleteNewsPopup";
import { useRouter } from "next/router";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
// import UpdateUserPopup from "./UpdateUserPopup";
// import SendMsgUser from "./SendMsgUser";

const ShowNewsDetail = ({ setSelectedProject, warningpopup }: any) => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const selectedUserDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  const [newsDetailsdata, setNewsDetailsData] = useState<any>([]);
  console.log(selectedUserDetails, "selectedUserDetails");
  const modules = {
    toolbar: false,
  };
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  const getNewsDetails = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/getEnNews/${id}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data.data, "responsearticledetailsssssssssssss");
      setNewsDetailsData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleLike = async (post: any) => {
    let tkn = localStorage.getItem("auth-token");

    // setLikedPosts((prev) => ({
    //   ...prev,
    //   [post._id]: !prev[post._id],
    // }));

    const payload = {
      commentId: newsDetailsdata.latestCommets?.[0]._id,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/like/create`,
        payload,
        {
          headers: {
            Authorization: `${tkn}`,
          },
        }
      );
      // getAllPosts();
    } catch (error) {
      // setLikedPosts((prev) => ({
      //   ...prev,
      //   [post._id]: !prev[post._id],
      // }));

      toast({
        title: "Error",
        description: "Failed to like post",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };
  const getTimeDifference = (createdAt: any) => {
    const currentTime = moment();
    const imageCreatedTime = moment(createdAt);
    const diffInHours = currentTime.diff(imageCreatedTime, "hours");

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = currentTime.diff(imageCreatedTime, "days");
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
  };
  useEffect(() => {
    if (id) {
      getNewsDetails();
    }
  }, [id]);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.backUpMainDiv}>
          <button
            className={styles.backMainDiv}
            // onClick={() => setSelectedProject("sales projects")}
            onClick={() => {
              dispatch(selectedProjects("news"));
              router.push("/news");
            }}
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
              <h3 className={styles.newsTitle}>{newsDetailsdata?.title}</h3>
              <p className={styles.newsSubTitle}>{newsDetailsdata?.subTitle}</p>
              <span className={styles.newsPublishTime}>
                Published on {formatDate(newsDetailsdata?.createdAt)} • 5 min
                read
              </span>
            </div>
            <hr className={styles.hrLine} />
            <div className={styles.newsDetailDiv}>
              <div className={styles.newsPointImgDiv}>
                <img
                  src={
                    newsDetailsdata
                      ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${newsDetailsdata?.mediaUrl}`
                      : "/profile.svg"
                  }
                  alt="newspoint"
                />
              </div>
              <ReactQuill
                value={newsDetailsdata?.description}
                readOnly={true}
                modules={modules}
                // theme="snow"
              />
            </div>
            <hr className={styles.hrLine} />
            {newsDetailsdata?.latestCommets?.length > 0 && (
              <div className={styles.newsCommentDiv}>
                <div className={styles.commnetUserProfImg}>
                  <img
                    src={
                      newsDetailsdata?.latestCommets?.[0]?.commentsBy
                        ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${newsDetailsdata?.latestCommets?.[0]?.commentsBy?.profileImage}`
                        : "/profile.svg"
                    }
                    // src={
                    //   newsDetailsdata?.userId?.profileImage
                    //     ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${newsDetailsdata?.userId?.profileImage?.url}`
                    //     : "/profile.svg"
                    // }
                    alt="commentuserprofile"
                  />
                </div>
                <div className={styles.commentRightDiv}>
                  <div className={styles.commentRightUpDiv}>
                    <div className={styles.commentUserDiv}>
                      <p>
                        {" "}
                        {
                          newsDetailsdata?.latestCommets?.[0]?.commentsBy
                            ?.firstName
                        }{" "}
                        {
                          newsDetailsdata?.latestCommets?.[0]?.commentsBy
                            ?.lastName
                        }
                        {/* {" "}
                      {newsDetailsdata?.userId?.firstName}{" "}
                      {newsDetailsdata?.userId?.lastName} */}
                      </p>
                      <span>
                        {getTimeDifference(newsDetailsdata.createdAt)}
                      </span>
                    </div>
                    <div className={styles.commentTextDiv}>
                      <p>{newsDetailsdata?.latestCommets?.[0]?.comment}</p>
                      {newsDetailsdata?.latestCommets?.[0]?.replies?.length >
                        0 && (
                        <>
                          <span>Show 2 replies</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.commentActionsDiv}>
                    <div className={styles.commentLeftDiv}>
                      <div className={styles.ationTextDiv}>
                        <img
                          src={
                            newsDetailsdata?.isLiked
                              ? "/icons/like.svg"
                              : "/icons/heart.svg"
                          }
                          alt="like"
                          onClick={handleLike}
                        />
                        <p>
                          {newsDetailsdata?.latestCommets?.[0]?.likeCount || 0}{" "}
                          Likes
                        </p>
                      </div>
                      {/* <div className={styles.ationTextDiv}>
                      <img src="/icons/downvote.svg" alt="downvote" />
                      <p>1 Downvote</p>
                    </div>
                    <div className={styles.ationTextDiv}>
                      <img src="/icons/reply.svg" alt="reply" />
                      <p>Reply</p>
                    </div> */}
                    </div>
                    {/* <p className={styles.viewMoreText}>view more</p> */}
                  </div>
                </div>
              </div>
            )}

            {/* <hr className={styles.hrLine} /> */}
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <DeleteNewsPopup
            onClose={() => setShowPopup(false)}
            // refreshData={getAllNewsData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ShowNewsDetail;
