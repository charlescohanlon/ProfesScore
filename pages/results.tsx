import React, { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import ResultsNavbar from "../components/Results/ResultsNavbar";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Results: NextPage = (): JSX.Element => {
  const [dropdownIsSelected, setDropdownIsSelected] = useState(false); // ask Carlos if there is a better way to do this

  function toggleDropdown() {
    // debugger;
    setDropdownIsSelected(true);
  }

  function deselectDropdown() {
    setDropdownIsSelected(false);
  }

  return (
    <div
      onClick={({ target }) =>
        target instanceof HTMLAnchorElement && target.id === "SearchDropdown" // closes dropdown menu when click away
          ? null
          : deselectDropdown()
      }
    >
      <ResultsNavbar
        dropdownIsSelected={dropdownIsSelected}
        toggleDropdown={toggleDropdown}
      ></ResultsNavbar>
    </div>
  );
};

export default Results;
