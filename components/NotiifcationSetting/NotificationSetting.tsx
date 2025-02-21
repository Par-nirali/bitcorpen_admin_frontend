import React, { useState } from "react";
import styles from "./notificationsettings.module.scss";

const Toggle = ({ checked, onChange }: any) => (
  <button
    className={`${styles.toggle} ${checked ? styles.toggleActive : ""}`}
    onClick={() => onChange(!checked)}
    type="button"
    role="switch"
    aria-checked={checked}
  >
    <span className={styles.toggleHandle} />
  </button>
);

const NotificationSetting = () => {
  const [emailandpush, setEmailAndPush] = useState(true);
  const [promotional, setpromotional] = useState(true);
  const [requestalerts, setRequestalerts] = useState(true);
  const [enrandbadge, setEnrAndBadge] = useState(true);
  const [highpriority, setHighPriority] = useState(true);
  const [lowpriority, setLowPriority] = useState(true);
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <div className={styles.pHeadingDiv}>
          <p className={styles.tabTitle}>Notifications Settings</p>
        </div>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphUserTableDiv}>
            <div className={styles.graphDivtable}>
              <div className={styles.notificationBoxMain}>
                <div className={styles.notificationBoxContainer}>
                  {/* <p className={styles.subTitle}>General Notifications</p> */}
                  <div className={styles.Content}>
                    <div className={styles.notificationSetting}>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationBox}>
                          <h3 className={styles.notificationTitle}>
                            Sub Admins Notifications
                          </h3>
                          <Toggle
                            checked={emailandpush}
                            onChange={setEmailAndPush}
                          />
                        </div>
                        <p className={styles.notificationDesc}>
                          Notify me when I receive a new review on my EN Assist
                          response.
                        </p>
                      </div>
                    </div>
                    <div className={styles.notificationSetting}>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationBox}>
                          <h3 className={styles.notificationTitle}>
                            Users Notifications
                          </h3>
                          <Toggle
                            checked={promotional}
                            onChange={setpromotional}
                          />
                        </div>
                        <p className={styles.notificationDesc}>
                          Notify me when I receive a new review on my EN Assist
                          response.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationBoxContainer}>
                  {/* <p className={styles.subTitle}>EN Assist Notifications</p> */}
                  <div className={styles.Content}>
                    <div className={styles.notificationSetting}>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationBox}>
                          <h3 className={styles.notificationTitle}>
                            Help & Support Notifications
                          </h3>
                          <Toggle
                            checked={requestalerts}
                            onChange={setRequestalerts}
                          />
                        </div>
                        <p className={styles.notificationDesc}>
                          Notify me when I receive a new review on my EN Assist
                          response.
                        </p>
                      </div>
                    </div>
                    <div className={styles.notificationSetting}>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationBox}>
                          <h3 className={styles.notificationTitle}>
                            Affiliation Notifications
                          </h3>
                          <Toggle
                            checked={enrandbadge}
                            onChange={setEnrAndBadge}
                          />
                        </div>
                        <p className={styles.notificationDesc}>
                          Notify me when I receive a new review on my EN Assist
                          response.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationBoxContainer}>
                  {/* <p className={styles.subTitle}>Priority Alerts</p> */}
                  <div className={styles.Content}>
                    <div className={styles.notificationSetting}>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationBox}>
                          <h3 className={styles.notificationTitle}>
                            Flag Users Notifications
                          </h3>
                          <Toggle
                            checked={highpriority}
                            onChange={setHighPriority}
                          />
                        </div>
                        <p className={styles.notificationDesc}>
                          Notify me when I receive a new review on my EN Assist
                          response.
                        </p>
                      </div>
                    </div>
                    <div className={styles.notificationSetting}>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationBox}>
                          <h3 className={styles.notificationTitle}>
                            Content Moderation Notifications
                          </h3>
                          <Toggle
                            checked={lowpriority}
                            onChange={setLowPriority}
                          />
                        </div>
                        <p className={styles.notificationDesc}>
                          Notify me when I receive a new review on my EN Assist
                          response.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSetting;
