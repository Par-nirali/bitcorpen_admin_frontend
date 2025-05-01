import React, { useEffect, useState } from "react";
import styles from "./notificationsettings.module.scss";
import axios from "axios";
import { get } from "http";

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
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("");

  const getDisplayName = (key: string) => {
    const displayNames: { [key: string]: string } = {
      subAdmin: "Sub Admins",
      user: "Users",
      helpAndSupport: "Help & Support",
      flagUsers: "Flag Users",
      affiliation: "Affiliation",
      contentModeration: "Content Moderation",
      enassist: "En Assist",
      partnerscollaboration: "Partner Collabration",
      adcontrols: "Ad Controls",
      leaderboard: "Leader Board",
      news: "News",
      all: "All Notifications",
      users: "Users",
      admin: "Admin",
    };
    return displayNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const getDescription = (key: string) => {
    return `Receive notifications about ${getDisplayName(
      key
    ).toLowerCase()} activities.`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userData = JSON.parse(
          localStorage.getItem("bitcorpenadminData") || "{}"
        );
        setUserDetail(userData);
        setUserRole(userData?.userRole || "");
      }
    };

    fetchUserData();
  }, []);

  const getNotificationSettings = async () => {
    if (!userDetail) return;

    let token = localStorage.getItem("auth-token");

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/settings/details`,
        headers: { Authorization: `${token}` },
      });

      console.log(
        response.data.data,
        "response of settings for admin or subadmin"
      );

      let settingsData = {};
      if (userRole === "ADMIN" && response.data.data.admin_setting) {
        settingsData = response.data.data.admin_setting;
      } else if (
        userRole === "SUBADMIN" &&
        response.data.data.subAdmin_setting
      ) {
        settingsData = response.data.data.subAdmin_setting;
      }

      setSettings(settingsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: boolean) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    handleToggle(updatedSettings);
  };

  const handleToggle = async (updatedSettings: any = settings) => {
    if (!userDetail) return;

    let token = localStorage.getItem("auth-token");
    let payload = {};
    let URL = "";

    if (userRole === "ADMIN") {
      payload = {
        admin_setting: updatedSettings,
      };
      URL = `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/settings/admin-setting`;
    } else if (userRole === "SUBADMIN") {
      payload = {
        subAdmin_setting: updatedSettings,
      };
      URL = `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/settings/subadmin-setting`;
    }

    try {
      console.log("Sending payload:", payload);
      const response = await axios({
        method: "post",
        url: URL,
        data: payload,
        headers: { Authorization: `${token}` },
      });

      console.log("Settings updated successfully:", response.data);
      getNotificationSettings();
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  useEffect(() => {
    if (userDetail) {
      getNotificationSettings();
    }
  }, [userDetail]);

  const renderNotificationOptions = () => {
    if (loading) {
      return <div className={styles.loading}>Loading settings...</div>;
    }

    if (Object.keys(settings).length === 0) {
      return (
        <div className={styles.noSettings}>
          No notification settings available.
        </div>
      );
    }

    const settingKeys = Object.keys(settings);
    const settingGroups = [];

    for (let i = 0; i < settingKeys.length; i += 2) {
      const group = settingKeys.slice(i, i + 2);
      settingGroups.push(group);
    }

    return settingGroups.map((group, groupIndex) => (
      <div
        key={`group-${groupIndex}`}
        className={styles.notificationBoxContainer}
      >
        <div className={styles.Content}>
          {group.map((key) => (
            <div key={key} className={styles.notificationSetting}>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>
                  <h3 className={styles.notificationTitle}>
                    {getDisplayName(key)} Notifications
                  </h3>
                  <Toggle
                    checked={settings[key] || false}
                    onChange={(value: boolean) => updateSetting(key, value)}
                  />
                </div>
                <p className={styles.notificationDesc}>{getDescription(key)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

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
                {renderNotificationOptions()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSetting;
