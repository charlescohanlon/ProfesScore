import React, { FC, useState, useRef } from "react";
import { GetStaticProps } from "next";
import ResultsNavbar from "../components/Results/ResultsNavbar";
import { SearchState } from "./index";
import { link } from "fs";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

interface ResultsState extends SearchState {
  searchMenuIsSelected: boolean;
  linkRef: React.LegacyRef<HTMLAnchorElement>;
}

const ViewResults: FC = (): JSX.Element => {
  const [state, setState] = useState<ResultsState>({
    selectedOption: "Rating",
    sliderValues: [0, 100],
    searchMenuIsSelected: false,
    linkRef: useRef<HTMLAnchorElement>(null),
  });

  function toggleMenu() {
    const stateCopy = { ...state };
    stateCopy.searchMenuIsSelected = !stateCopy.searchMenuIsSelected;
    setState(stateCopy);
  }

  function deselectMenu(target: EventTarget) {
    if (target === null) {
      return;
    }
    const stateCopy = { ...state };
    stateCopy.searchMenuIsSelected = false;
    setState(stateCopy);
  }

  const { selectedOption, sliderValues, searchMenuIsSelected, linkRef } = state;
  return (
    <div
      onClick={(ev) => {
        // deselectMenu(ev.target);
        console.log("ref:", linkRef!); // need to compare something from ref and target, not going to be perfect
        // console.log(linkRef!.current.charset);
      }}
    >
      <ResultsNavbar
        selectedOption={selectedOption}
        sliderVals={sliderValues}
        searchMenuIsSelected={searchMenuIsSelected}
        toggleMenu={toggleMenu}
        linkRef={linkRef}
      ></ResultsNavbar>
    </div>
  );
};

export default ViewResults;
