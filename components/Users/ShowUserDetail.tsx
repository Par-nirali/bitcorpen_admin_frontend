import React, { useEffect, useState } from "react";
import styles from "./showuserdetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { Table } from "antd";
import { createPortal } from "react-dom";
import UpdateUserPopup from "./UpdateUserPopup";
import SendMsgUser from "./SendMsgUser";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ShowUserDetail = ({ setSelectedProject, warningpopup }: any) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const selectedUserDetails = useSelector(
    (state: any) => state.selectedDetails
  );
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>("");
  const [userTableData, setUserTableData] = useState<any>([]);
  const [invoiceTableData, setInvoiceTableData] = useState<any>([]);

  console.log(selectedUserDetails, "selectedUserDetails");

  const getUserByIdData = async () => {
    let token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/get-user/${selectedUserDetails._id}`,
        headers: { Authorization: `${token}` },
      });
      console.log(response.data, "response.data.data----by useriddddddddddd");

      setUserInfo(response.data.data);
      const selectAllUserData = [response.data.data];
      if (selectAllUserData && selectAllUserData) {
        const formattedData = selectAllUserData.map(
          (user: any, index: number) => ({
            _id: user._id || index.toString(),
            enid: user.ENID || "ENID{NUMBER}",
            profile: user?.profileImage
              ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${user?.profileImage?.url}`
              : "/profile.png",
            email: user.email || "-",
            userName: user.userName || "-",
            name: `${user.firstName || "Test"} ${
              user.lastName || "User"
            }`.trim(),
            phone: user.phoneNumber || "-",
            plan: user.userType || "-",
            status: user.status || "-",
            joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            subscription: user.userType || "-",
          })
        );
        setUserTableData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInvoiceDetails = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/subscription/subscriptionDetails?userId=${selectedUserDetails._id}`,
        {
          headers: {
            Authorization: `${tkn}`,
          },
        }
      );
      console.log("invoice data:", response.data.data);
      const selectInvoicesData = response.data.data;
      if (selectInvoicesData && selectInvoicesData) {
        const formattedData = selectInvoicesData.map(
          (invoice: any, index: number) => ({
            _id: invoice._id || index.toString(),
            plan: invoice.subscriptionType || "-",
            price: invoice.price || "-",
            billingdate: new Date(invoice.updatedAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            expiredate: new Date(invoice.expiredTime).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
            status: invoice.status || "-",
            invoicedownload: invoice.invoice || "-",
            originalData: invoice,
          })
        );
        setInvoiceTableData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

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
      render: (profile: any) => (
        <img
          src={profile}
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
            backgroundColor: status === "active" ? "#E8F7F7" : "#FFE9E9",
            color: status === "active" ? "#00A3B1" : "#FF4D4F",
          }}
        >
          {status === "active" ? "Active" : "Inactivated"}
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
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            onClick={() => {
              dispatch(selectedDetails(record));
              // setIsMultipleEdit(false);
              setShowPopupUpdate(true);
            }}
          >
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
            backgroundColor: status === "active" ? "#E8F7F7" : "#FFE9E9",
            color: status === "active" ? "#00A3B1" : "#FF4D4F",
          }}
        >
          {status === "active" ? "Active" : "Deactivated"}
        </span>
      ),
    },
    {
      title: "Invoice",
      dataIndex: "invoicedownload",
      key: "invoicedownload",
      render: (_: any, record: any) => (
        <div>
          <a
            style={{ display: "flex", gap: "8px", textDecoration: "none" }}
            href={record?.invoicedownload}
            download
          >
            <img src="/icons/edit.svg" alt="edit" />
            <p style={{ textDecoration: "none" }}>Download</p>
          </a>
        </div>
      ),
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

  useEffect(() => {
    getUserByIdData();
    getInvoiceDetails();
  }, []);

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
          <p>Users Details </p>
        </button>

        {/* <div className={styles.pHeadingDiv}>
            <h3>Add Project</h3>
          </div> */}

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            {/* <div className={styles.dropdownsSection}>
                <p className={styles.dollarsTitle}>Recent Subscribed</p>
                <button
                  className={styles.viewAllBtn}
                  onClick={() => dispatch(selectedProjects("recenetalljoin"))}
                >
                  View All
                </button>
              </div> */}

            <div className={styles.graphDivtable}>
              <Table
                bordered={true}
                // border={"1px solid #000"}
                columns={usercolumns}
                // dataSource={userdata}
                dataSource={userTableData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
            <div className={styles.userInfoMainDiv}>
              <h3>Users More info</h3>
              <div className={styles.userDetailsDiv}>
                <div className={styles.badgeDiv}>
                  <div className={styles.pointsDiv}>
                    <span>Badge</span>
                    <p>{userInfo?.memberProfile?.badgeLevel?.title || "-"}</p>
                  </div>
                  {/* <div className={styles.downloadDiv}>
                    <img src="/icons/download.svg" alt="download" />
                    <p>Download</p>
                  </div> */}
                </div>
                <div className={styles.pointsDiv}>
                  <span>Next Rank to Reach</span>
                  <p className={styles.numberPoints}>
                    {userInfo?.memberProfile?.points?.nextRankRequirement || 0}
                    <span> Points</span>
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Current ENR Points</span>
                  <p className={styles.numberPoints}>
                    {userInfo?.memberProfile?.points?.enrPoints || 0}
                    <span> Points</span>
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Paid Affiliates</span>
                  <p className={styles.numberPoints}>
                    {userInfo?.memberProfile?.affiliates?.paid || 0}
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Unpaid Affilates</span>
                  <p className={styles.numberPoints}>
                    {userInfo?.memberProfile?.affiliates?.unpaid || 0}
                  </p>
                </div>
              </div>
              <div className={styles.pointsDiv}>
                <span>Bio</span>
                <p>{userInfo?.bio || "-"}</p>
              </div>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Country</span>
                  <p>{userInfo?.country || "-"}</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>City</span>
                  <p>{userInfo?.city || "-"}</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Address Line 1</span>
                  <p>{userInfo?.address_1 || "-"}</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Address Line 2</span>
                  <p>{userInfo?.address_2 || "-"}</p>
                </div>
              </div>
            </div>
            <div className={styles.profInfoMainDiv}>
              <h3>Professional Information</h3>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Job Title</span>
                  <p>{userInfo?.experience?.[0]?.jobTitle || "-"}</p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Employed at</span>
                  <p>{userInfo?.experience?.[0]?.companyName || "-"}</p>
                </div>
              </div>
              <div className={styles.userDetailsDiv}>
                <div className={styles.pointsDiv}>
                  <span>Industry </span>
                  <p className={styles.skillPoint}>
                    {userInfo?.industryID?.industry || "No industry"}
                  </p>
                </div>
                <div className={styles.pointsDiv}>
                  <span>Skills</span>
                  <div className={styles.skillsDiv}>
                    {userInfo?.skillID?.map((skill: any, index: number) => (
                      <p key={index} className={styles.skillPoint}>
                        {skill?.skill}
                      </p>
                    ))}
                    {/* <p className={styles.skillPoint}>Aerodynamics</p>
                    <p className={styles.skillPoint}>Avionics</p>
                    <p className={styles.skillPoint}>CAD</p> */}
                  </div>
                </div>
              </div>
            </div>
            <button
              className={styles.messageBtn}
              onClick={() => {
                dispatch(selectedDetails(userInfo));
                setShowPopup(true);
              }}
              type="button"
            >
              Send a Message
            </button>
            <div className={styles.graphDivtable}>
              <h3>Invoice History</h3>
              <Table
                bordered={true}
                // border={"1px solid #000"}
                columns={invoicecolumns}
                dataSource={invoiceTableData}
                loading={loading}
                pagination={false}
                className={styles.recentJoinTable}
              />
            </div>
          </div>
        </div>
      </div>
      {showPopupUpdate &&
        createPortal(
          <UpdateUserPopup
            onClose={() => setShowPopupUpdate(false)}
            refreshData={getUserByIdData}
          />,
          document.getElementById("modals")!
        )}
      {showPopup &&
        createPortal(
          <SendMsgUser
            onClose={() => setShowPopup(false)}
            // refreshData={getUserByIdData}
          />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default ShowUserDetail;
