import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedDetails,
  selectedProjects,
  setSearchTerm,
} from "../redux/actions";
import style from "./header3.module.scss";
import SignOutPopup from "./SignOutPopup";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const selectedtab = useSelector((state: any) => state.selectedtab);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [userDetail, setUserDetail] = useState<any>("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("bitcorpenadminData") || "{}"
        );
        setUserDetail(userData);
      }
    };

    fetchUserData();
  }, []);

  // const isActive = (path: string) => {
  //   return router.pathname === path || router.pathname.startsWith(path + "/");
  // };
  // const pathname = router.pathname.replace("/", "");

  // useEffect(() => {
  //   const subManagerDepart = async () => {
  //     if (userDetail && userDetail._id) {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/getChildUser/${userDetail._id}`
  //         );
  //         // console.log(res.data, "Employees Data");
  //         setSubManager(res.data);
  //       } catch (error) {
  //         console.error("Error fetching submanager:", error);
  //       }
  //     }
  //   };
  //   subManagerDepart();
  // }, [userDetail]);

  // useEffect(() => {
  //   dispatch(setSearchTerm(""));
  // }, [selectedproject]);

  return (
    <>
      <div className={style.headerMainDiv}>
        <div className={style.headerSubDiv}>
          <nav className={style.nav}>
            <div className={style.headingDiv}>
              {userDetail && (
                <p className={style.tabTitle}>
                  {userDetail.userRole === "ADMIN"
                    ? "Global Admin"
                    : "Global Subadmin"}
                </p>
              )}
            </div>

            <div className={style.upgradeMainDiv}>
              <div className={style.profileDiv}>
                <div
                  className={style.headNotifImg}
                  onClick={() => {
                    dispatch(selectedProjects("header_notification"));
                    router.push("/headernotification");
                  }}
                >
                  <img
                    src={"/icons/notificationheader.svg"}
                    alt="notificationheader"
                  />
                </div>
                <div
                  className={`${style.menuSubItem} ${style.profileDropdown}`}
                >
                  <div className={style.headProDetailImg}>
                    <img
                      // src={"/userprofile.svg"}
                      src={
                        userDetail?.profileImage?.url
                          ? `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${userDetail?.profileImage?.url}`
                          : "/userprofile.svg"
                      }
                      alt="profile"
                    />
                  </div>
                  {userDetail.userRole === "ADMIN" ? (
                    <div className={style.dropdownPopup}>
                      <div
                        className={`${style.dropdownTabs} `}
                        onClick={() => {
                          router.push("/adminprofile");
                          dispatch(selectedDetails(userDetail));
                          // dispatch(selectedProjects("edit_profile"));
                        }}
                      >
                        <div className={style.tabsImg}>
                          <img src="/icons/profileicon.svg" alt="profile" />
                        </div>
                        <p>Profile</p>
                      </div>
                      <div
                        className={`${style.dropdownTabs} `}
                        onClick={() => setShowPopup(true)}
                      >
                        <div className={style.tabsImg}>
                          <img src="/icons/logout.svg" alt="profile" />
                        </div>
                        <p>Sign out</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <SignOutPopup onClose={() => setShowPopup(false)} />,
          document.getElementById("modals")!
        )}
    </>
  );
};

export default Header;
