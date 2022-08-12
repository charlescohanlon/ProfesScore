import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function ProfesScore({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>ProfesScore</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default ProfesScore;
