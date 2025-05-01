import React, { useMemo, useState } from "react";
import styles from "./addpartners.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectedDetails, selectedProjects } from "../redux/actions";
import { Button, Input, Table } from "antd";
import { createPortal } from "react-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const addMemValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Please enter a valid company name"),
  url: Yup.string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  partnerType: Yup.string().required("Please enter a valid partner type"),
  logo: Yup.string().required("Please upload a logo"),
});

const AddPartners = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedPartnerDetail = useSelector(
    (state: any) => state.selectedDetails
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedPartnerDetail, "selectedPartnerDetail");

  const initialValue = useMemo(() => {
    if (selectedPartnerDetail) {
      if (selectedPartnerDetail?.logo) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}/${selectedPartnerDetail?.originalData?.logo}`
        );
      }
      return {
        companyName: selectedPartnerDetail?.companyName,
        url: selectedPartnerDetail?.url,
        partnerType: selectedPartnerDetail?.type,
        logo: selectedPartnerDetail?.originalData?.logo || "",
      };
    }
    return {
      companyName: "",
      url: "",
      partnerType: "",
      logo: "",
    };
  }, [selectedPartnerDetail]);

  const handleImageUpload = async (file: File) => {
    const tkn = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/partner-collaboration/image`,
        formData,
        {
          headers: {
            Authorization: `${tkn}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response ACCEPT:", response.data);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (values: any, setSubmitting: any) => {
    let tkn = localStorage.getItem("auth-token");

    try {
      const payload: any = {
        companyName: values.companyName,
        partnerType: values.partnerType,
        website: values.url,
        logo: values.logo,
      };
      console.log(payload, "payload");
      // const response = await axios({
      //   method: "post",
      //   url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/partner-collaboration/createee`,
      //   data: payload,
      //   headers: {
      //     Authorization: `${tkn}`,
      //   },
      // });

      // console.log("API Response ACCEPT:", response.data);

      if (selectedPartnerDetail?._id) {
        payload.pc_id = selectedPartnerDetail._id;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/partner-collaboration/update`,
          payload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        console.log("API Response ACCEPT:", response.data);
        toast({
          title: "Success",
          description: "Partner updated successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        dispatch(selectedProjects("partners"));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/partner-collaboration/create`,
          payload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        console.log("API Response ACCEPT:", response.data);
        toast({
          title: "Success",
          description: "Partner added successfully",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        dispatch(selectedProjects("partners"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          onClick={() => dispatch(selectedProjects("partners"))}
        >
          <img src="/icons/back.svg" alt="back" />
          <p>
            {selectedPartnerDetail ? "Update" : "Add"} Partners Collaborated
          </p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              // validationSchema={addMemValidationSchema}
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
                      {/* {previewImage ? (
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
                      ) : ( */}
                      <img src="/icons/add.svg" alt="add" />
                      {/* )} */}
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
                            setFieldValue("logo", imageId);
                            setPreviewImage(URL.createObjectURL(file));
                          } catch (error) {
                            e.target.value = "";
                            setFieldValue("logo", "");
                          }
                        }
                      }}
                    />
                    <p>{previewImage ? "Change" : "Add"} Company Logo</p>
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
                  {/* {errors.logo && touched.logo && (
                    <div className={styles.errMes}>{String(errors.logo)}</div>
                  )} */}
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
                            placeholder="Enter Company Name here"
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
                            placeholder="Enter Website URL"
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
                            placeholder="Enter partner type"
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
                                selectedPartnerDetail?.status === "active"
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
                      {isSubmitting
                        ? "Submitting..."
                        : selectedPartnerDetail
                        ? "Update Partner"
                        : "Add Partner"}
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
