import React, { useMemo, useState } from "react";
import styles from "./addpartners.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { Button, Input, Table } from "antd";
import { createPortal } from "react-dom";

const addMemValidationSchema = Yup.object().shape({
  companyName: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  url: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  partnerType: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

const AddPartners = () => {
  const dispatch = useDispatch();
  const selectedPartnerDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedPartnerDetail, "selectedPartnerDetail");

  const initialValue = useMemo(() => {
    if (selectedPartnerDetail) {
      return {
        companyName: selectedPartnerDetail?.companyName,
        url: selectedPartnerDetail?.url,
        partnerType: selectedPartnerDetail?.type,
      };
    }
    return {
      companyName: "",
      url: "",
      partnerType: "",
      companyLogo: null,
    };
  }, [selectedPartnerDetail]);
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      // You can also store the file itself in Formik's values if needed
      setFieldValue("companyLogo", file);

      // If you need to upload to server immediately:
      // const formData = new FormData();
      // formData.append('image', file);
      // await uploadToServer(formData);
    }
  };
  const handleSubmit = () => {
    console.log("clicked");
  };
  // if (!selectedPartnerDetail) {
  //   return "";
  // }
  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("partners"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>Partners Collaborated Edit</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addMemValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue }) => (
                <Form className={styles.addMemForm}>
                  <div className={styles.addMemberDiv}>
                    <div
                      className={styles.addMemLeft}
                      onClick={() =>
                        document.getElementById("banner-upload")?.click()
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
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                    <p>Add Company Logo</p>
                  </div>
                  <div className={styles.addMemFieldsMain}>
                    <div className={styles.addMemLastDiv}>
                      <h4 className={styles.detailHeading}>Company Details</h4>
                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="companyName" className={styles.text}>
                            Company Name
                          </label>
                          <Field
                            type="text"
                            name="companyName"
                            id="companyName"
                            placeholder="Past companyName account link here"
                            className={`${styles.input} ${
                              touched.companyName && errors.companyName
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="companyName"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        <div className={styles.inputDiv}>
                          <label htmlFor="url" className={styles.text}>
                            URL
                          </label>
                          <Field
                            type="url"
                            name="url"
                            id="url"
                            placeholder="Past Twitter account link here"
                            className={`${styles.input} ${
                              touched.url && errors.url ? styles.inputError : ""
                            }`}
                          />
                          <ErrorMessage
                            name="url"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                      </div>

                      <div className={styles.addMem2GridDiv}>
                        <div className={styles.inputDiv}>
                          <label htmlFor="partnerType" className={styles.text}>
                            Partner Type
                          </label>
                          <Field
                            type="text"
                            name="partnerType"
                            id="partnerType"
                            placeholder="Past partnerType account link here"
                            className={`${styles.input} ${
                              touched.partnerType && errors.partnerType
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="partnerType"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>
                        {selectedPartnerDetail?.status ? (
                          <div
                            className={styles.inputDiv}
                            style={{ border: "none" }}
                          >
                            <label
                              htmlFor="partnerType"
                              className={styles.text}
                            >
                              Status
                            </label>
                            <p
                              className={`${
                                selectedPartnerDetail?.status === "Active"
                                  ? styles.activateDiv
                                  : styles.deactivateDiv
                              }`}
                            >
                              {selectedPartnerDetail?.status}
                            </p>
                            {/* <Field
                            type="text"
                            name="partnerType"
                            id="partnerType"
                            placeholder="Past partnerType account link here"
                            className={styles.input}
                          /> */}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addMemBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Add Partner"}
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

export default AddPartners;
