import { Input, Radio } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectedProjects } from "../redux/actions";
import styles from "./writenews.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Select from "react-select";
import { useToast } from "@chakra-ui/react";

interface SelectOption {
  value: string;
  label: string;
}
const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#fff",
    color: "black",
    padding: 0,
    // border: "none",
    // outline: "none",
    boxShadow: "none !important",
    "&:hover": {
      // border: "none",
      // outline: "none",
    },
    borderRadius: "5px",
    // width: "100%",
    cursor: "pointer",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#b5b5b5",
    width: "100%",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#1c4728",
    fontSize: "16px",
  }),
  input: (base: any) => ({
    ...base,
    color: "#000",
    border: "none",
    outline: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "black",
    background: "#F5F5F5",
    padding: 12,
    margin: 4,
    alignSelf: "flex-end",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#fff",
    border: "none",
    marginTop: "4px",
    fontSize: "16px",
    zIndex: 9999,
    width: "400px",
    color: "black",
    maxHeight: "240px",
    overflowY: "hidden",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f1f1f1" : "#fff",
    color: "black",
    cursor: "pointer",
  }),
};
const toolbarOptions = [
  // [{ size: ["small", "medium", "large", "huge"] }],
  // [{ align: [] }],
  ["bold", "italic", "underline"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  // ["link"],
  // [{ color: [] }, { background: [] }],
];

const addSubAdminValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  subTitle: Yup.string().required("Sub Title is required"),
  description: Yup.string().required("Description is required"),
  industryId: Yup.string().required("Industry is required"),
});

const WriteNews = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showEmbed, setShowEmbed] = useState(false);
  const [industries, setIndustries] = useState<SelectOption[]>([]);
  const selectedNewsDetail = useSelector((state: any) => state.selectedDetails);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(selectedNewsDetail, "selectedNewsDetail");
  const handleCloseEmbed = () => {
    setShowEmbed(false);
  };

  const getIndustries = async () => {
    let tkn = localStorage.getItem("auth-token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/industry/get`,
        {
          headers: {
            Authorization: `${tkn}`,
          },
        }
      );

      const formattedIndustries = response.data.data.map((industry: any) => ({
        value: industry._id,
        label: industry.industry,
      }));
      setIndustries(formattedIndustries);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch industries",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const initialValue = useMemo(() => {
    if (selectedNewsDetail) {
      return {
        title: selectedNewsDetail?.title || "",
        subTitle: selectedNewsDetail?.subTitle || "",
        description: selectedNewsDetail?.description || "",
        profileImage: null,
        industryId: selectedNewsDetail?.industryId || "",
      };
    }
    return {
      title: "",
      subTitle: "",
      description: "",
      profileImage: null,
      industryId: "",
    };
  }, [selectedNewsDetail]);

  const selectedIndustry = useMemo(() => {
    if (selectedNewsDetail?.industryId) {
      return {
        value: selectedNewsDetail.industryId._id,
        label: selectedNewsDetail.industryId.industry,
      };
    }
    return null;
  }, [selectedNewsDetail]);

  const handleImageUpload = async (file: File) => {
    const tkn = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/image`,
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
        mediaUrl: values.mediaUrl,
        title: values.title,
        subTitle: values.subTitle,
        description: values.description,
        industryId: values.industryId,
      };

      console.log(payload, "payload");

      if (selectedNewsDetail?._id) {
        const updatePayload = {
          ...payload,
          newsId: selectedNewsDetail._id,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/update`,
          updatePayload,
          {
            headers: {
              Authorization: `${tkn}`,
            },
          }
        );
        console.log("API Response ACCEPT:", response.data);
        dispatch(selectedProjects("news"));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/news/create`,
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
        dispatch(selectedProjects("news"));
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

  useEffect(() => {
    getIndustries();
  }, []);

  return (
    <>
      <div className={styles.pSubRightDiv}>
        <button
          className={styles.backMainDiv}
          onClick={() => dispatch(selectedProjects("news"))}
        >
          <img src="/icons/back.svg" alt="back" />

          <p>Write News</p>
        </button>

        <div className={styles.dashboardScroll}>
          <div className={styles.graphTableDivMain}>
            <Formik
              initialValues={initialValue}
              validationSchema={addSubAdminValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
                <Form className={styles.addNewsForm}>
                  <div className={styles.addNewsUpDiv}>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Company Logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <div className={styles.addNewsImgUp}>
                        <img
                          src="/icons/galleryupload.png"
                          alt="galleryupload"
                        />
                      </div>
                    )}
                    <p>
                      We Recommend Uploading or Dragging in a Video or Image
                    </p>
                    <div
                      className={styles.addNewsLeft}
                      onClick={() =>
                        document.getElementById("profile-upload")?.click()
                      }
                    >
                      <img src="/icons/docupload.svg" alt="docupload" /> Upload
                      from Computer
                    </div>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const imageId = await handleImageUpload(file);
                            setFieldValue("mediaUrl", imageId);
                            setPreviewImage(URL.createObjectURL(file));
                          } catch (error) {
                            e.target.value = "";
                            setFieldValue("mediaUrl", "");
                          }
                        }
                      }}
                    />
                    {/* {previewImage && (
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
                    )} */}
                  </div>
                  <div className={styles.addNewsFieldsMain}>
                    <div className={styles.addNewsLastDiv}>
                      <div className={styles.inputDiv} style={{ width: "40%" }}>
                        <div
                          className={styles.dropdownSelectDiv}
                          // className={`${styles.dropdownSelectDiv} ${styles.singleDeopdownDiv}`}
                        >
                          <Select
                            name="industryId"
                            options={industries}
                            value={
                              industries.find(
                                (ind) => ind.value === values.industryId
                              ) || selectedIndustry
                            }
                            // defaultValue={selectedIndustry}
                            // onChange={(option: SelectOption | null) => {
                            //   if (option) {
                            //     setFieldValue("industryId", option.value);
                            //   }
                            // }}
                            onChange={(option: SelectOption | null) => {
                              if (option) {
                                setFieldValue("industryId", option.value);
                              }
                            }}
                            // onClick={() => {
                            //   handleIndustryPopup(companyData);
                            // }}
                            // className={styles2.selectInput}
                            placeholder="Select an industry"
                            styles={customStyles}
                          />
                        </div>

                        <ErrorMessage
                          name="industryId"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>
                      <div className={styles.addNews2GridDiv}>
                        <div
                          className={styles.inputDiv}
                          style={{ width: "60%" }}
                        >
                          {/* <label htmlFor="title" className={styles.text}>
                            Subject name
                          </label> */}
                          <Field
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Subject Name"
                            className={`${styles.inputTitle} ${
                              touched.title && errors.title
                                ? styles.inputError
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className={styles.errMes}
                          />
                        </div>

                        {/* <div className={styles.descEditingIcons}>
                         
                          <span>B</span>
                          <img
                            src="/icons/pharagraphspacing.svg"
                            alt="pharagraphspacing"
                          />
                          <img src="/icons/link.svg" alt="link" />
                          <img
                            src="/icons/code.svg"
                            alt="code"
                            onClick={() => setShowEmbed(true)}
                          />
                          <img src="/icons/image.svg" alt="image" />
                        </div> */}
                      </div>
                      <div
                        className={styles.inputDiv}
                        // style={{ width: "60%" }}
                        // style={{ paddingBottom: "20px" }}
                      >
                        {/* <label htmlFor="title" className={styles.text}>
                            Subject name
                          </label> */}
                        <Field
                          type="text"
                          name="subTitle"
                          id="subTitle"
                          placeholder="Add Sub Title"
                          className={`${styles.inputSubTitle} ${
                            touched.subTitle && errors.subTitle
                              ? styles.inputError
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="subTitle"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                      <div className={styles.inputDiv}>
                        {/* <label htmlFor="description" className={styles.text}>
                           Description
                          </label> */}
                        <ReactQuill
                          className={styles.quillEditor}
                          // name="description"
                          id="description"
                          placeholder="Description"
                          value={values.description}
                          onChange={(value) =>
                            setFieldValue("description", value)
                          }
                          modules={{ toolbar: toolbarOptions }}
                          // formats={formats}
                        />
                        {/* <Field
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Write here"
                          className={`${styles.inputDesc} ${
                            touched.description && errors.description
                              ? styles.inputError
                              : ""
                          }`}
                        /> */}
                        <ErrorMessage
                          name="description"
                          component="div"
                          className={styles.errMes}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.addNewsBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create News"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {showEmbed && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <p>Add Embed</p>
            </div>
            <div className={styles.modalBody}>
              <label>Embed Link</label>
            </div>
            <input
              type="text"
              placeholder="Paste embed link here"
              className={styles.embedInput}
              value={""}
            />
          </div>
          <button className={styles.closeButton} onClick={handleCloseEmbed}>
            <img src="/icons/close.svg" alt="Close" />
          </button>
        </div>
      )}
    </>
  );
};
export default WriteNews;
