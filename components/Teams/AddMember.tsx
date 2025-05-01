import React, { useMemo, useState } from "react";
import styles from "./addmembers.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjects } from "../redux/actions";
import { Input, Table } from "antd";
import { createPortal } from "react-dom";
import axios from "axios";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useToast } from "@chakra-ui/react";

const addMemValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First name should only contain letters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last name should only contain letters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    // .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  role: Yup.string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role cannot exceed 100 characters")
    .required("Role is required"),

  facebook: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  twitter: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  linkedin: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  instagram: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  // profileUrl: Yup.string().required("Please upload a profileUrl"),
});

const AddMember = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedMemberDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedMemberDetail, "selectedMemberDetail");

  const initialValue = useMemo(() => {
    if (selectedMemberDetail) {
      if (selectedMemberDetail?.profileUrl) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedMemberDetail?.profileUrl}`
        );
      }
      return {
        email: selectedMemberDetail?.email || "",
        phone: selectedMemberDetail?.phone || "",
        firstName: selectedMemberDetail?.firstName || "",
        lastName: selectedMemberDetail?.lastName || "",
        role: selectedMemberDetail?.role || "",
        facebook: selectedMemberDetail?.facebookUrl || "",
        twitter: selectedMemberDetail?.twitterUrl || "",
        linkedin: selectedMemberDetail?.linkedinUrl || "",
        instagram: selectedMemberDetail?.instagramUrl || "",
        profileUrl: selectedMemberDetail?.profileUrl || "",
      };
    }
    return {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      role: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      profileUrl: "",
    };
  }, [selectedMemberDetail]);

  const handleImageUpload = async (file: File) => {
    const tkn = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/team/upload`,
        formData,
        {
          headers: {
            Authorization: `${tkn}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (values: any, setSubmitting: any) => {
    let tkn = localStorage.getItem("auth-token");

    try {
      const payload: any = {
        profileUrl: values.profileUrl,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
      };

      if (values.facebook) payload.facebookUrl = values.facebook;
      if (values.twitter) payload.twitterUrl = values.twitter;
      if (values.instagram) payload.instagramUrl = values.instagram;
      if (values.linkedin) payload.linkedinUrl = values.linkedin;

      console.log(payload, "payload");

      if (selectedMemberDetail?._id) {
        const updatePayload = {
          ...payload,
          teamId: selectedMemberDetail._id,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/team/update`,
          updatePayload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        console.log("API Response ACCEPT:", response.data);
        dispatch(selectedProjects("team"));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/team/create`,
          payload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        toast({
          title: "Success",
          description: "Team member profile completed successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        console.log("API Response ACCEPT:", response.data);
        dispatch(selectedProjects("team"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to complete team member profile",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("team"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>{selectedMemberDetail?._id ? "Update" : "Add"} Member</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addMemValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                touched,
                errors,
                setFieldValue,
                setFieldTouched,
                values,
              }) => (
                <Form className={styles.addMemForm}>
                  <div className={styles.addMemberDiv}>
                    <div
                      className={styles.addMemLeft}
                      onClick={() =>
                        document.getElementById("banner-upload")?.click()
                      }
                    >
                      <img src="/icons/add.svg" alt="add" />
                    </div>
                    <Input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const imageId = await handleImageUpload(file);
                            setFieldValue("profileUrl", imageId);
                            setPreviewImage(URL.createObjectURL(file));
                          } catch (error) {
                            e.target.value = "";
                            setFieldValue("profileUrl", "");
                          }
                        }
                      }}
                    />
                    <p>
                      {previewImage || selectedMemberDetail?._id
                        ? "Change"
                        : "Add"}{" "}
                      Team member Image
                    </p>
                  </div>
                  {previewImage && (
                    <div>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.addMemFieldsMain}>
                    <div className={styles.addMemFirstDiv}>
                      <div className={styles.addMemPersonalDiv}>
                        <h4 className={styles.detailHeading}>
                          Personal Details
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
                              //   className={styles.input}
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
                              //   className={styles.input}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className={styles.errMes}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.addMemPersonalDiv}>
                        <h4 className={styles.detailHeading}>
                          Contact Details
                        </h4>
                        <div className={styles.addMem2GridDiv}>
                          <div className={styles.inputDiv}>
                            <label htmlFor="email" className={styles.text}>
                              Email
                            </label>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter Email"
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
                              phone
                            </label>
                            {/* <Field
                              type="number"
                              name="phone"
                              id="phone"
                              placeholder="Enter your phone"
                              className={`${styles.input} ${
                                touched.phone && errors.phone
                                  ? styles.inputError
                                  : ""
                              }`}
                            /> */}
                            <PhoneInput
                              defaultCountry="us"
                              value={values.phone || ""}
                              onChange={(value: string) => {
                                if (
                                  !value ||
                                  value.trim() === "" ||
                                  value === "+"
                                ) {
                                  setFieldValue("phone", "");
                                  setFieldTouched("phone", true);
                                } else {
                                  setFieldValue("phone", value);
                                  setFieldTouched("phone", false);
                                }
                              }}
                              className={styles.input}
                              inputClassName={styles.phoneInnerInput}
                            />
                            {/* <ErrorMessage
                              name="phone"
                              component="div"
                              className={styles.errMes}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.addMemProfDiv}>
                      <h4 className={styles.detailHeading}>
                        Professional Details
                      </h4>
                      <div className={styles.inputDiv}>
                        <label htmlFor="role" className={styles.text}>
                          Role
                        </label>
                        <Field
                          type="role"
                          name="role"
                          id="role"
                          placeholder="Type here role"
                          className={`${styles.input} ${
                            touched.role && errors.role ? styles.inputError : ""
                          }`}
                        />
                        <ErrorMessage
                          name="role"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                    </div>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>
                        Social Media Details
                      </h4>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="facebook" className={styles.text}>
                            Facebook
                          </label>
                          <Field
                            type="text"
                            name="facebook"
                            id="facebook"
                            placeholder="Past Facebook account link here"
                            className={`${styles.input} ${
                              touched.facebook && errors.facebook
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="facebook"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="twitter" className={styles.text}>
                            Twitter
                          </label>
                          <Field
                            type="twitter"
                            name="twitter"
                            id="twitter"
                            placeholder="Past Twitter account link here"
                            className={`${styles.input} ${
                              touched.twitter && errors.twitter
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="twitter"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="linkedin" className={styles.text}>
                            LinkedIn
                          </label>
                          <Field
                            type="text"
                            name="linkedin"
                            id="linkedin"
                            placeholder="Past LinkedIn account link here"
                            className={`${styles.input} ${
                              touched.linkedin && errors.linkedin
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="linkedin"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="instagram" className={styles.text}>
                            Instagram
                          </label>
                          <Field
                            type="instagram"
                            name="instagram"
                            id="instagram"
                            placeholder="Past Instagram account link here"
                            className={`${styles.input} ${
                              touched.instagram && errors.instagram
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="instagram"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : selectedMemberDetail
                        ? "Update Member"
                        : "Add Member"}
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
export default AddMember;
