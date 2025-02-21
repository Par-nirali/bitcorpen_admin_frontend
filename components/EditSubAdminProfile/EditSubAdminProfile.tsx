import { Input, Radio } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./editsubadminprofile.module.scss";

const addSubAdminValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Please enter valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  // roles: Yup.array()
  //   .min(1, "At least one role must be selected")
  //   .required("Role selection is required"),
  roles: Yup.string().required("Role selection is required"),
});

const EditSubAdminProfile = () => {
  const dispatch = useDispatch();
  const selectedSubAdminDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedSubAdminDetail, "selectedSubAdminDetail");

  const roles = [
    "Users",
    "Credit logs, Subscribers",
    "Help & Support",
    "Affiliation",
    "EN Assist",
    "Partners Collaboration",
    "Ad Controls",
    "Leader Board",
    "Flag User",
    "Content Moderation",
    "News",
    "Articles",
  ];
  const initialValue = useMemo(() => {
    if (selectedSubAdminDetail) {
      return {
        firstName: selectedSubAdminDetail?.firstName || "",
        lastName: selectedSubAdminDetail?.lastName || "",
        email: selectedSubAdminDetail?.email || "",
        phone: selectedSubAdminDetail?.phone || "",
        password: "",
        confirmPassword: "",
        roles: selectedSubAdminDetail?.roles || "",
        profileImage: null,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      roles: "",
      profileImage: null,
    };
  }, [selectedSubAdminDetail]);
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFieldValue("profileImage", file);
    }
  };

  const handleSubmit = (values: any) => {
    console.log("Form submitted with values:", values);
  };
  // if (!selectedSubAdminDetail) {
  //   return "";
  // }
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          // onClick={() => dispatch(selectedProjects("sub_admins"))}
        >
          {/* <img src="/icons/back.svg" alt="back" /> */}

          <p>Sub Admin Profile</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addSubAdminValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
                <Form className={styles.addMemForm}>
                  <div className={styles.addMemberDiv}>
                    <div
                      className={styles.addMemLeft}
                      onClick={() =>
                        document.getElementById("profile-upload")?.click()
                      }
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Company Logo"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "42px",
                          }}
                        />
                      ) : (
                        <img src="/icons/add.svg" alt="add" />
                      )}
                    </div>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                    <p>Sub Admin Profile Image</p>
                  </div>
                  <div className={styles.addMemFieldsMain}>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>
                        Sub Admin Details
                      </h4>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="firstName" className={styles.text}>
                            First Name
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Type first name"
                            className={`${styles.input} ${
                              touched.firstName && errors.firstName
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="lastName" className={styles.text}>
                            Last Name
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Type last name"
                            className={`${styles.input} ${
                              touched.lastName && errors.lastName
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="email" className={styles.text}>
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.email && errors.email
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="phone" className={styles.text}>
                            Phone
                          </label>
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.phone && errors.phone
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      {/* <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="password" className={styles.text}>
                            Password
                          </label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Type partner type"
                            className={`${styles.input} ${
                              touched.password && errors.password
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        {!selectedSubAdminDetail?.password ? (
                          <div className={styles.inputDiv}>
                            <label
                              htmlFor="confirmPassword"
                              className={styles.text}
                            >
                              Confirm Password
                            </label>
                            <Field
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              placeholder="Type partner type"
                              className={`${styles.input} ${
                                touched.confirmPassword &&
                                errors.confirmPassword
                                  ? styles.inputError
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className={styles.errMes}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div> */}
                      <div className={styles.roleSection}>
                        <h4 className={styles.detailHeading}>Sub Admin Role</h4>
                        {/* <div className={styles.rolesGrid}>
                            {roles.map((role) => (
                              <label key={role} className={styles.roleLabel}>
                                <Field
                                  type="checkbox"
                                  name="roles"
                                  value={role}
                                  className={styles.roleCheckbox}
                                />
                                {role}
                              </label>
                            ))}
                          </div> */}
                        <p className={styles.selectedRole}>
                          {selectedSubAdminDetail?.roles}
                        </p>
                        {/* <Radio.Group
                          name="roles"
                          value={values.roles}
                          onChange={(e) =>
                            setFieldValue("roles", e.target.value)
                          }
                          className={styles.rolesGrid}
                        >
                          {roles.map((role) => (
                            <Radio
                              key={role}
                              value={role}
                              className={styles.roleRadio}
                            >
                              <span>{role}</span>
                            </Radio>
                          ))}
                        </Radio.Group>
                        <ErrorMessage
                          name="roles"
                          component="div"
                          className={styles.errMes}
                        /> */}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Adding..."
                        : selectedSubAdminDetail
                        ? "Edit Sub Admin"
                        : "Add Sub Admin"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubAdminProfile;
