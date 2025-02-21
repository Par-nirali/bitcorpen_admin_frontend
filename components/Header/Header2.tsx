import React, { useEffect, useState } from "react";
import style from "./header2.module.scss";
import Link from "next/link";

const Headerdash = () => {
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
  console.log("userDetail", userDetail);

  return (
    <div className={style.headerMainDiv}>
      <div className={style.headerSubDiv}>
        <nav className={style.nav}>
          <Link href="/">
            <div className={style.logo}>
              {/* <img src="/logo.png" alt=" logo" /> */}
              <p>Par Solutions</p>
            </div>
          </Link>
          <div className={style.links}>
            <p>Review Submission</p>
          </div>

          {/* <div className={style.upgradeMainDiv}>
            <div className={style.profileDiv}>
              <div className={style.headProDetailImg}>
                <img src={"/profile.png"} alt="profile" />
              </div>
            </div>
          </div> */}
          <div className={style.upgradeMainDiv}>
            <div className={style.profileDiv}>
              <div className={style.headProDetailImg}>
                <img src={"/usercirclepro.png"} alt="profile" />
              </div>
              <div>
                {userDetail && (
                  <p>
                    {userDetail?.firstName} {userDetail?.lastName}
                  </p>
                )}
                {userDetail && <p>{userDetail?.designation?.name}</p>}
              </div>
              {/* <div className={style.arrow}>
                <RiArrowDropDownLine />
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Headerdash;
