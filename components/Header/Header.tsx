import React from "react";
import style from "./header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={style.headerMainDiv}>
      <div className={style.headerSubDiv}>
        <nav className={style.nav}>
          <Link href="/">
            <div className={style.logo}>
              <img src="/logo.png" alt=" logo" />
              <p>Par Solutions</p>
            </div>
          </Link>
          <div className={style.links}>
            <p>Performance Review</p>
          </div>

          <div className={style.upgradeMainDiv}>
            <div className={style.profileDiv}>
              <div className={style.headProDetailImg}>
                <img src={"/profile.png"} alt="profile" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
