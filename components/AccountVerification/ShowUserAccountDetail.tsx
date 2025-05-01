import React, { useState } from "react";
import styles from "./showuserdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { Dropdown, Table } from "antd";
import type { MenuProps } from "antd";
import { createPortal } from "react-dom";
import AccountVerificationPopup from "./AccountVerificationPopup";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ShowUserAccountDetail = ({ setSelectedProject, warningpopup }: any) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const selectedAccountDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  console.log(selectedAccountDetails, "selectedAccountDetails");
  //
  const getVerificationItem = (record: any): MenuProps["items"] => [
    {
      key: "giveverification",
      label: "Give a Verification",
      onClick: () => {
        console.log(record, "record");
        dispatch(selectedDetails(record));
        setShowPopup(true);
      },
    },
  ];

  const usercolumns = [
    // {
    //   title: "Nos.",
    //   dataIndex: "index",
    //   width: 80,
    //   render: (_: any, __: any, index: number) => `#${index + 1}`,
    // },
    {
      title: "ENID",
      dataIndex: "enid",
      key: "enid",
      render: (text: any) => <span style={{ color: "#00A3B1" }}>{text}</span>,
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
      title: "Id Proof's",
      dataIndex: "idproofs",
      key: "idproofs",
      render: (_: any, record: any) => {
        const imageBaseUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL;
        return (
          <PhotoProvider>
            <div className={styles.idProofContainer}>
              {selectedAccountDetails?.originalData?.photoID && (
                <PhotoView
                  src={`${imageBaseUrl}/${selectedAccountDetails.originalData.photoID}`}
                >
                  <span className={styles.imageUrlText}>
                    {selectedAccountDetails.originalData.photoID}
                  </span>
                </PhotoView>
              )}
              <br />
              {selectedAccountDetails?.originalData?.photoUrl && (
                <PhotoView
                  src={`${imageBaseUrl}/${selectedAccountDetails.originalData.photoUrl}`}
                >
                  <span className={styles.imageUrlText}>
                    {selectedAccountDetails.originalData.photoUrl}
                  </span>
                </PhotoView>
              )}
              <br />
              {selectedAccountDetails?.originalData?.affilationProof && (
                <PhotoView
                  src={`${imageBaseUrl}/${selectedAccountDetails.originalData.affilationProof}`}
                >
                  <span className={styles.imageUrlText}>
                    {selectedAccountDetails.originalData.affilationProof}
                  </span>
                </PhotoView>
              )}
            </div>
          </PhotoProvider>
        );
      },
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
            backgroundColor:
              status === "VERIFIED"
                ? "#E6F6F4"
                : status === "PENDING"
                ? "#ff4b4e33"
                : "#ffe10033",
            color:
              status === "VERIFIED"
                ? "#009883"
                : status === "PENDING"
                ? "#FF4B4E"
                : "#968612",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Operate",
      dataIndex: "operate",
      key: "operate",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* <a
            onClick={() => {
              dispatch(selectedDetails(record));
              dispatch(selectedProjects("showaccountdetails"));
            }}
            className={styles.eyeIcon}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </a> */}
          <Dropdown
            menu={{ items: getVerificationItem(record) }}
            trigger={["hover"]}
            placement="bottomRight"
            // style={{ width: "100%" }}
          >
            <a style={{ width: "24px", height: "24px" }}>
              <img src="/icons/more.svg" alt="edit" />
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  const userdata = selectedAccountDetails
    ? [
        {
          key: "1",
          _id: selectedAccountDetails._id || "-",
          enid: selectedAccountDetails.enid || "-",
          userName: selectedAccountDetails.userName || "-",
          name: selectedAccountDetails.name || "-",
          status: selectedAccountDetails.status || "-",
          originalData: selectedAccountDetails.originalData || {},
        },
      ]
    : [];

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          // onClick={() => setSelectedProject("sales projects")}
          onClick={() => dispatch(selectedProjects("users"))}
        >
          {/* <div className={styles.backArrow}> */}
          <img src="/icons/back.svg" alt="back" />
          {/* </div> */}
          <p>{selectedAccountDetails?.name}&apos;s Verification </p>
        </button>
        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                // border={"1px solid #000"}
                columns={usercolumns}
                dataSource={userdata}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
            <div className={styles.userInfoMainDiv}>
              <h3>Conditions for Proof</h3>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <div className={styles.pointUpDiv}>
                    <h4>Photo ID</h4>
                    <div className={styles.pointsRules}>
                      <p>
                        A government-issued photo ID (passport, driver’s
                        license, or national ID).
                      </p>
                      <span>Ensure the document is clear and legible.</span>
                      <span>
                        Use a high-quality image format (JPEG, PNG, or PDF).
                      </span>
                      <span>Recent photo must match the photo on the ID.</span>
                    </div>
                  </div>
                  <div className={styles.numberPoints}>
                    Uploaded{" "}
                    <PhotoProvider>
                      <PhotoView
                        src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedAccountDetails?.originalData?.photoID}`}
                      >
                        <span className={styles.imageLink}>
                          {selectedAccountDetails?.originalData?.photoID}
                        </span>
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </div>
                <div className={styles.pointsDiv}>
                  <div className={styles.pointUpDiv}>
                    <h4>Proof of Affiliation</h4>
                    <div className={styles.pointsRules}>
                      <p>
                        Proof of affiliation (e.g., company email, business
                        license, or similar documentation).
                      </p>
                      <span>Ensure the document is clear and legible.</span>
                      <span>
                        Use a high-quality image format (JPEG, PNG, or PDF).
                      </span>
                      <span>Recent photo must match the photo on the ID.</span>
                    </div>
                  </div>
                  <div className={styles.numberPoints}>
                    Uploaded{" "}
                    <PhotoProvider>
                      <PhotoView
                        src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedAccountDetails?.originalData?.affilationProof}`}
                      >
                        <span className={styles.imageLink}>
                          {
                            selectedAccountDetails?.originalData
                              ?.affilationProof
                          }
                        </span>
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </div>
                <div className={styles.pointsDiv}>
                  <div className={styles.pointUpDiv}>
                    <h4>Live photo</h4>
                    <div className={styles.pointsRules}>
                      <p>A recent photo for live verification.</p>
                      <span>
                        Ensure that photo should be as provided Sample
                      </span>
                      {/* <span>
                        Use a high-quality image format (JPEG, PNG, or PDF).
                      </span> */}
                      <a>View Sample</a>
                    </div>
                  </div>

                  <div className={styles.numberPoints}>
                    Uploaded{" "}
                    <PhotoProvider>
                      <PhotoView
                        src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedAccountDetails?.originalData?.photoUrl}`}
                      >
                        <span className={styles.imageLink}>
                          {selectedAccountDetails?.originalData?.photoUrl}
                        </span>
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <AccountVerificationPopup
            onClose={() => setShowPopup(false)}
            // refreshData={getAccountVerifTableData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ShowUserAccountDetail;
