import "../frontend/styles/global.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { createContext, useState } from "react";
export const InfoPopupContext = createContext({
  isShowing: true,
  hide: () => {},
});

function ProfesScore({ Component, pageProps }: AppProps) {
  const [isShowing, setIsShowing] = useState(true);
  const hide = () => setIsShowing(false);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>ProfesScore</title>
      </Head>
      <InfoPopupContext.Provider value={{ isShowing, hide }}>
        <Component {...pageProps} />
      </InfoPopupContext.Provider>
      <Analytics />
    </>
  );
}

export default ProfesScore;
