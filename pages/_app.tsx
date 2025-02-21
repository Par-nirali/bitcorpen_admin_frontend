import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../components/redux/store";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bitcorpen-Admin</title>
        <link rel="shortcut icon" href="/wibesFav1.jpg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  borderColor: "#B5B5B5",
                  fontSizeHeading5: 16,
                  fontWeightStrong: 500,
                  headerBg: "#fff",
                  colorTextSecondary: "#0B0B0B",
                  // borderRadius: 90,
                },
                Checkbox: {
                  borderRadius: 100,
                  colorPrimary: "#00A991",
                },
              },
            }}
          >
            <Component {...pageProps} />
          </ConfigProvider>
        </Provider>
      </ChakraProvider>
      <div id="modals"></div>
    </>
  );
}

export default MyApp;
