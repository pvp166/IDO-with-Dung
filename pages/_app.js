import React from "react";
import App from "next/app";
// import Router from "next/router";
import Head from "next/head";
import { wrapper } from '../store/store';
// global css
import "../styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import IndexNavbar from "../components/Navbar/IndexNavbar";
import Footer from "../components/Footer/Footer";

// Import css files

// global components and contexts
// import PageChange from "components/PageChange/PageChange.js";

const MyApp = ({Component, pageProps}) => {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>BAoE - Business Age of Empires</title>
      </Head>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </React.Fragment>
}

export default wrapper.withRedux(MyApp)
