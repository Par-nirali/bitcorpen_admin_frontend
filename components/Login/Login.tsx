import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SocketIOClient from "socket.io-client";
import * as Yup from "yup";
import setAuthHeader from "../../utils/setAuth";
import styles from "./login.module.scss";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(6),
});

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

let activeSocket: any = null;

export const initializeSocket = (userId: string) => {
  if (activeSocket) {
    activeSocket.disconnect();
    console.log("Socket disconnected");
  }

  activeSocket = SocketIOClient(
    process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_SOCKET
  );

  activeSocket.on("connect", () => {
    console.log("Socket connected========");
    activeSocket.emit("setup", userId);
    console.log("socket connecteeeeeeeeeeeeee", userId);
  });

  activeSocket.on("connect_error", (error: any) => {
    console.error("Socket connection error:", error);
  });

  return activeSocket;
};

export const getSocket = () => {
  return activeSocket;
};

// Add this function in your Login.tsx file

// Map permission names to their corresponding routes
const permissionRouteMap: Record<string, string> = {
  dashboard: "/dashboard",
  user: "/users",
  creditlogs: "/creditlogs",
  subscribers: "/subscribers",
  helpAndSupport: "/helpandsupport",
  affiliation: "/affiliation",
  enassist: "/enassist",
  team: "/team",
  partners: "/partners",
  adcontrols: "/adcontrols",
  mobileadcontrols: "/mobileadcontrols",
  leaderboard: "/leaderboard",
  notifications: "/notification", // Note: for subadmin it's /notification not /notifications
  subadmins: "/subadmins",
  flaguser: "/flaguser",
  accountverification: "/accountverification",
  withdrawls: "/withdrawls",
  contentmoderation: "/contentmoderation",
  news: "/news",
  articles: "/articles",
};

// Function to determine the first permitted page from permissions array
const getFirstPermittedPage = (permissions: string[]): string => {
  // Define priority order for permissions if needed
  // This is optional - you could define certain pages to take precedence
  const priorityOrder = ["dashboard", "user", "helpAndSupport"];

  // Check if any priority permissions exist in the user's permissions
  for (const priority of priorityOrder) {
    if (permissions.includes(priority)) {
      return permissionRouteMap[priority];
    }
  }

  // If no priority permissions found, use the first available permission
  for (const permission of permissions) {
    if (permissionRouteMap[permission]) {
      return permissionRouteMap[permission];
    }
  }

  // Default fallback route if no matches found
  return "/subadminprofile";
};

const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [logg, setLogg] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const socketRef = useRef<ReturnType<typeof SocketIOClient>>();

  const loginMail = async (values: any) => {
    let payload = {
      email: values.email,
      password: values.password,
    };

    try {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin-auth/login`,
        data: payload,
      })
        .then(async (res) => {
          console.log("login admin responseeeeeeeeeeeeee", res.data);
          let userData: any = {
            userName: res.data.data.userName,
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
            _id: res.data.data._id,
            userType: res.data.data.userType,
            userRole: res.data.data.userRole,
            profileImage: res.data.data.profileImage,
            phone: res.data.data.phone,
          };

          localStorage.setItem("bitcorpenadminData", JSON.stringify(userData));
          localStorage.removeItem("visiter-token");
          localStorage.setItem(
            "auth-token",
            res.headers["X-Auth-Token"] || res.headers["x-auth-token"]
          );

          setAuthHeader(
            res.headers["X-Auth-Token"] || res.headers["x-auth-token"]
          );
          Cookies.set("isLoggedIn", true as any, { expires: 365 });

          initializeSocket(res.data.data._id);
          toast({
            title: "Login Successfull",
            description: "Admin login successfully.",
            status: "success",
            position: "top-right",
            isClosable: true,
          });

          setLogg(true);
          // setTimeout(() => {
          //   router.push("/dashboard");
          // }, 1000);

          if (res.data.data.userRole === "ADMIN") {
            // Admin goes to dashboard as usual
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
          } else if (res.data.data.userRole === "SUBADMIN") {
            // For subadmin, get permissions and redirect to first permitted page
            try {
              const token =
                res.headers["X-Auth-Token"] || res.headers["x-auth-token"];
              const permissionsResponse = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin/permission/get`,
                headers: { Authorization: `${token}` },
              });
              console.log("permissionsResponse", permissionsResponse.data.data);

              const permissions: any = permissionsResponse.data.data;
              localStorage.setItem(
                "subadminroles",
                JSON.stringify(permissions)
              );

              // Determine first accessible page from permissions
              const redirectPath = getFirstPermittedPage(permissions);

              setTimeout(() => {
                router.push(redirectPath);
              }, 1000);
            } catch (error) {
              console.error("Error fetching permissions:", error);
              // Fallback to dashboard if permissions fetch fails
              setTimeout(() => {
                router.push("/dashboard");
              }, 1000);
            }
          }
        })
        .catch((error) => {
          toast({
            title: "Admin Login Error",
            description:
              error.response?.data?.message || "Failed to login for admin.",
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred please try agains",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
    }
  };

  const handleForgotPassword = (values: any) => {
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/forgot-password`,
      data: {
        email: values.email,
      },
    })
      .then((res) => {
        toast({
          title: "Forgot Password Link",
          description: "Password reset link sent to your email!.",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Admin Login Error",
          description:
            error.response?.data?.message ||
            "Failed to send Password reset link.",
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      });
    //i wnat that after login if amdin login then it have to show dashboard and otherwise for subadmin login it hvae to hsow subadmin
  };

  return (
    <>
      <div className={styles.loginMainDiv}>
        <div className={styles.loginContainer}>
          <div className={styles.loginSubDiv}>
            <div className={styles.loginContent}>
              <div className={styles.loginHead}>
                <div className={styles.logoImg}>
                  <img src="/logo.svg" alt="logo" />
                </div>
                <h1 className={styles.loginTitle}>Sign in</h1>
                <p className={styles.loginSubtitle}>
                  Please enter your credentials to log in.
                </p>
              </div>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={loginMail}
              >
                {({ isSubmitting, touched, errors, values }) => (
                  <Form className={styles.loginForm}>
                    <div className={styles.loginFieldsMain}>
                      <div className={styles.coolinput}>
                        <label htmlFor="email" className={styles.text}>
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your Email"
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

                      <div className={styles.coolinput}>
                        <label htmlFor="password" className={styles.text}>
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
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
                    </div>

                    <p
                      className={styles.forgotPassword}
                      onClick={() => handleForgotPassword(values)}
                    >
                      Forgot Password?
                    </p>
                    <div className={styles.formFooter}>
                      <button type="submit" className={styles.signInButton}>
                        Sign in
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
