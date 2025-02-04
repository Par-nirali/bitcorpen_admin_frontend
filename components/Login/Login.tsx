import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import setAuthHeader from "../../utils/setAuth";
import styles from "./login.module.scss";
// import NotificationHandler from "../NotificationInbox/NotificationInbox";
import Link from "next/link";
import { io, Socket } from "socket.io-client";
import SocketIOClient from "socket.io-client";

// const socket = SocketIOClient("http://172.168.16.69:8455");

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
  // if (activeSocket) {
  //   activeSocket.disconnect();
  //   console.log("Socket disconnected");
  // }

  activeSocket = SocketIOClient(process.env.NEXT_PUBLIC_REACT_APP_BASE_URL);

  activeSocket.on("connect", () => {
    console.log("Socket connected");
    activeSocket.emit("auth", userId);
  });

  activeSocket.on("connect_error", (error: any) => {
    console.error("Socket connection error:", error);
  });

  return activeSocket;
};

export const getSocket = () => activeSocket;

export const sendNotificationMessage = (message: string) => {
  if (activeSocket) {
    activeSocket.emit("notification", message);
    return true;
  }
  return false;
};

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [logg, setLogg] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const socket = SocketIOClient(process.env.NEXT_PUBLIC_REACT_APP_BASE_URL);
  const socketRef = useRef<ReturnType<typeof SocketIOClient>>();
  // const socket = SocketIOClient("http://172.168.16.48:8455");
  // Function to create and manage SSE connection
  // const createEventSource = () => {
  //   // Close existing connection if any
  //   if (eventSource) {
  //     eventSource.close();
  //   }

  //   // Get the authentication token
  //   const token = localStorage.getItem("auth-token");
  //   if (!token) {
  //     console.error("No auth token found");
  //     return;
  //   }

  //   try {
  //     // Create EventSource with the correct endpoint
  //     const source = new EventSource(
  //       `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notification/events?token=${token}`
  //     );

  //     // source.onopen = () => {
  //     //   // console.log("SSE connection established");
  //     // };

  //     source.onmessage = (event) => {
  //       try {
  //         const newMessage = JSON.parse(event.data);
  //         setMessages((prevMessages) => [...prevMessages, newMessage]);
  //         // console.log("Received message:", newMessage);
  //       } catch (error) {
  //         console.error("Error parsing SSE message:", error);
  //       }
  //     };

  //     source.onerror = (error) => {
  //       console.error("EventSource failed:", error);
  //       source.close();
  //       setTimeout(() => {
  //         // console.log("Attempting to reconnect...");
  //         createEventSource();
  //       }, 1000);
  //     };

  //     setEventSource(source);
  //   } catch (error) {
  //     console.error("Error creating EventSource:", error);
  //     startPolling();
  //   }
  // };

  // const startPolling = async () => {
  //   const token = localStorage.getItem("auth-token");
  //   if (!token) return;

  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notification/eventsevents?token=${token}`,
  //       {
  //         // headers: {
  //         //   Authorization: token,
  //         // },
  //         responseType: "stream",
  //       }
  //     );

  //     // console.log("Notification response:", response.data);
  //     if (response.data) {
  //       setMessages((prevMessages) => [...prevMessages, response.data]);
  //     }
  //   } catch (error) {
  //     console.error("Notification error:", error);
  //   }
  // };

  // // Cleanup function
  // useEffect(() => {
  //   return () => {
  //     if (eventSource) {
  //       eventSource.close();
  //     }
  //   };
  // }, [eventSource]);

  // useEffect(() => {
  //   const connectSocket = (userId: string) => {
  //     // Direct connection without a token (no auth)
  //     // const socketInstance = io(process.env.NEXT_PUBLIC_REACT_APP_BASE_URL);
  //     socket.on("connect", () => {
  //       console.log("Socket connected");
  //     });
  //     socket.emit("auth", userId);

  //     socket.on("connect_error", (error) => {
  //       console.error("Socket connection error:", error);
  //     });

  //     socket.on("notification", (message) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     });

  //     // setSocket(socket);
  //   };
  //   connectSocket(); // Connect to Socket on mount

  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  // const initializeSocket = (userId: string) => {
  //   // Disconnect existing socket if any
  //   if (socketRef.current) {
  //     socketRef.current.disconnect();
  //     console.log("Socket disconnected");
  //   }

  //   socketRef.current = SocketIOClient(
  //     process.env.NEXT_PUBLIC_REACT_APP_BASE_URL
  //   );

  //   // Set up socket event handlers
  //   socketRef.current.on("connect", () => {
  //     console.log("Socket connected");
  //     // Emit auth event with user ID
  //     socketRef.current?.emit("auth", userId);
  //   });

  //   socketRef.current.on("connect_error", (error) => {
  //     console.error("Socket connection error:", error);
  //   });

  //   socketRef.current.on("notification", (message) => {
  //     console.log("Received message:", message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // };

  // useEffect(() => {
  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //       console.log("Socket disconnected");
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (logg) {
  //     initializeSocket();
  //   }
  // }, [logg]);

  const loginMail = (values: any) => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    setIsSubmitting(true);
    // socket?.emit("login", payload);
    // try {
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/login`,
      data: payload,
    })
      .then((res) => {
        // console.log("login", res.data);
        let userData: any = {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          performanceScore: res.data.performanceScore,
          contributionScore: res.data.contributionScore,
          _id: res.data._id,
          userType: res.data.userType,
          designation: res.data.designation,
          departmentId: res.data.departmentId,
          group: res.data.group,
        };
        const authToken =
          res.headers["X-Auth-Token"] || res.headers["x-auth-token"];

        localStorage.setItem("prsuserData", JSON.stringify(userData));
        localStorage.removeItem("visiter-token");
        // localStorage.setItem(
        //   "auth-token",
        //   res.headers["X-Auth-Token"] || res.headers["x-auth-token"]
        // );
        localStorage.setItem("auth-token", authToken);
        setAuthHeader(
          res.headers["X-Auth-Token"] || res.headers["x-auth-token"]
        );
        Cookies.set("isLoggedIn", true as any, { expires: 365 });
        // connectSocket(res.data._id);
        const socket = initializeSocket(res.data._id);
        socket.on("notification", (message: any) => {
          // Handle global notifications if needed
          console.log("Received message:", message);
        });
        toast.success("Login Successful!", {
          position: "top-right",
          hideProgressBar: true,
          theme: "colored",
          transition: Slide,
          draggable: true,
        });
        // notification();
        // createEventSource();
        setLogg(true);
        // setTimeout(() => {
        //   router.push("/");
        // }, 1000);
        // setIsSubmitting(false);
      })
      .catch((error) => {
        // console.log(error, "errrrrrorrr");
        toast.error(error.response?.data?.message, {
          position: "top-right",
          hideProgressBar: true,
          theme: "colored",
          transition: Slide,
          draggable: true,
        });
        setIsSubmitting(false);
      });
    // } catch (error) {
    //   toast.error("An error occurred please try again.", {
    //     position: "top-right",
    //     hideProgressBar: true,
    //     theme: "colored",
    //     transition: Slide,
    //     draggable: true,
    // });
    // } finally {
    //   setIsSubmitting(true);
    // }
  };
  const handleForgotPassword = (values: any) => {
    setIsSubmitting(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/sendFrogetPassLink`,
      data: {
        email: values.email,
      },
    })
      .then((res) => {
        toast.success("Password reset link sent to your email!", {
          position: "top-right",
          hideProgressBar: true,
          theme: "colored",
          transition: Slide,
          draggable: true,
        });
        setIsSubmitting(false);
        setIsForgotPassword(false);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to send reset link",
          {
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
            transition: Slide,
            draggable: true,
          }
        );
        setIsSubmitting(false);
        setIsForgotPassword(false);
      });
  };
  // useEffect(() => {
  //   // return () => {
  //   //   if (timerRef.current) {
  //   //     clearTimeout(timerRef.current);
  //   //   }
  //   notification();
  // }, []);

  // const notification = () => {
  //   let tkn = localStorage.getItem("auth-token");
  //   const res = axios.get(
  //     `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notification/events?token=${tkn}`
  //   );
  //   console.log("jinptificationmkcdsn ", res);
  // };

  return (
    <>
      <div className={styles.loginMainDiv}>
        <div className={styles.loginContainer}>
          <div
            className={styles.loginSubDiv}
            // ref={closeRef}
          >
            {/* <div
              className={styles.loginClose}
              // onClick={onClose}
            >
              <img src="/icons/close.svg" alt="close" />
            </div> */}

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
                // initialValues={initialValues}
                // validationSchema={LoginSchema}
                onSubmit={loginMail}
                // onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
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

                    <p className={styles.forgotPassword}>Forgot Password?</p>
                    <div className={styles.formFooter}>
                      <button
                        type="submit"
                        className={styles.signInButton}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing in..." : "Sign in"}
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
