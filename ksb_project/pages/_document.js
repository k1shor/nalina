import { Head, Html, Main, NextScript } from "next/document";
// import Head from "next/head";

export default function Document() {
  return (
    <Html lang="en">

      <Head>

        <link rel="icon" type="image/x-icon" href="/logo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}