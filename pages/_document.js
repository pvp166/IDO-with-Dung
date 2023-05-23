import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/img/brand/favicon.png" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-R3Q4WFGT6Y" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', 'G-R3Q4WFGT6Y');
                    `,
                }}
            />
            {

            }
        </Head>
        <body className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
