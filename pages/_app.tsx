import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../components/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bitcorpen-Admin</title>
        <link rel="shortcut icon" href="/wibesFav1.jpg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
