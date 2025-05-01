import React, { useEffect, useState } from "react";
import styles from "./showarticledetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import DeleteArticlePopup from "./DeleteArticlePopup";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const ShowArticleDetail = ({ setSelectedProject, warningpopup }: any) => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const selectedArticleDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedArticleDetails, "selectedArticleDetails");
  const [articleDetailData, setArticleDetailData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const modules = {
    toolbar: false,
  };
  const { id } = router.query;

  console.log(id, "iddddddddddddartooooiclesss");

  const getArticlesDetails = async () => {
    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/article/get/${id}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response, "responsearticledetailsssssssssssss");
      setArticleDetailData(response.data.data);
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
      postId: articleDetailData.latestCommets?.[0]._id,
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

  useEffect(() => {
    if (id) {
      getArticlesDetails();
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
              dispatch(selectedProjects("articles"));
              router.push("/articles");
            }}
          >
            {/* <div className={styles.backArrow}> */}
            <img src="/icons/back.svg" alt="back" />
            {/* </div> */}
            <p>Articles</p>
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
              <h3 className={styles.newsTitle}>{articleDetailData?.title}</h3>
              <p className={styles.newsSubTitle}>
                {articleDetailData?.subTitle}
              </p>
              <span className={styles.newsPublishTime}>
                Published on {formatDate(articleDetailData?.createdAt)} • 5 min
                read
              </span>
            </div>
            <hr className={styles.hrLine} />
            <div className={styles.newsDetailDiv}>
              <div className={styles.newsPointImgDiv}>
                <img
                  src={
                    articleDetailData?.mediaUrl
                      ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${articleDetailData?.mediaUrl}`
                      : "/profile.svg"
                  }
                  alt="newspoint"
                />
              </div>
              <ReactQuill
                value={articleDetailData?.description}
                readOnly={true}
                modules={modules}
                // theme="snow"
              />
            </div>
            <hr className={styles.hrLine} />
            {articleDetailData?.latestCommets?.length > 0 && (
              <div className={styles.newsCommentDiv}>
                <div className={styles.commnetUserProfImg}>
                  <img
                    src={
                      articleDetailData?.userId?.profileImage
                        ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${articleDetailData?.userId?.profileImage?.url}`
                        : "/profile.svg"
                    }
                    alt="commentuserprofile"
                  />
                </div>
                <div className={styles.commentRightDiv}>
                  <div className={styles.commentRightUpDiv}>
                    <div className={styles.commentUserDiv}>
                      <p>
                        {/* {articleDetailData?.userId?.firstName}{" "}
                      {articleDetailData?.userId?.lastName} */}
                        {
                          articleDetailData?.latestCommets?.[0]?.commentsBy
                            ?.firstName
                        }{" "}
                        {
                          articleDetailData?.latestCommets?.[0]?.commentsBy
                            ?.lastName
                        }
                      </p>
                      <span>3d ago</span>
                    </div>
                    <div className={styles.commentTextDiv}>
                      <p>{articleDetailData?.latestCommets?.[0]?.comment}</p>
                      {articleDetailData?.latestCommets?.[0]?.replies?.length >
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
                            articleDetailData?.isLiked
                              ? "/icons/like.svg"
                              : "/icons/heart.svg"
                          }
                          alt="like"
                          onClick={handleLike}
                        />
                        <p>
                          {articleDetailData?.latestCommets?.[0]?.likeCount ||
                            0}{" "}
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
          <DeleteArticlePopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ShowArticleDetail;
