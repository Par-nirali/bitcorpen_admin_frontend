import React, { useState, useEffect } from "react";
import Slidebar from "../Slidebar/Slidebar";
import styles from "../MainPage/mainpage.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    if (typeof window !== "undefined") {
      const userData = JSON.parse(
        localStorage.getItem("bitcorpenadminData") || "{}"
      );
      setUserDetail(userData);
    }
  }, []);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pMainDiv}>
      <div className={styles.pContainer}>
        <div className={styles.pSubDiv}>
          <Slidebar userDetail={userDetail} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
