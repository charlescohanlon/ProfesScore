import React, { FC, useState } from "react";
import { GetStaticProps } from "next";
import ResultsNavbar from "../components/Results/ResultsNavbar";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const ViewResults: FC = (): JSX.Element => {
  // change to: NextPage
  const [dropdownIsSelected, setDropdownIsSelected] = useState(false); // ask Carlos if there is a better way to do this

  function toggleDropdown() {
    setDropdownIsSelected(!dropdownIsSelected);
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

export default ViewResults;
