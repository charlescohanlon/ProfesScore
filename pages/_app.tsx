import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function ProfesScore({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/public/images/ProfesScore.ico" />
        <title>ProfesScore</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default ProfesScore;
