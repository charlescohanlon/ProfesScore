import React, { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import ResultsNavbar from "../components/Results/ResultsNavbar";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Results: NextPage = (): JSX.Element => {
  return (
    <>
      <ResultsNavbar></ResultsNavbar>
    </>
  );
};

export default Results;
