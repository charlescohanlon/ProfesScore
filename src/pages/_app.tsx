import "../frontend/styles/global.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

function ProfesScore({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>ProfesScore</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default ProfesScore;
