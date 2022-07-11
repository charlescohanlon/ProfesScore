import React, { FC } from "react";
import ResultsSearchDropdown from "./ResultsSearchDropdown";
import SearchForm from "../Search/SearchForm";
import Logo from "../Logo";

interface ResultNavbarProps {
  selectedOption: string;
  sliderVals: [number, number];
  searchMenuIsSelected: boolean;
  toggleMenu: Function;
  linkRef: React.LegacyRef<HTMLAnchorElement>;
}

const ResultsNavbar: FC<ResultNavbarProps> = ({
  selectedOption,
  sliderVals,
  searchMenuIsSelected,
  toggleMenu,
  linkRef,
}): JSX.Element => {
  return (
    <>
      {/* <div className="bg-white">
        <Logo></Logo>
      </div> */}
      <div
        className={
          "fixed w-screen h-fit bg-brandAmber flex justify-center items-start " +
          "p-3 sm:p-4 md:p-5 lg:p-7 xl:p-8"
        }
      >
        <div className="relative pr-2 sm:pr-3 md:pr-4 lg:pr-6 xl:pr-7">
          <ResultsSearchDropdown // need to make it so when u click anywhere else the menu goes away
            selectedOption="Professor"
            isSelected={searchMenuIsSelected}
            toggleMenu={toggleMenu}
            linkRef={linkRef}
          ></ResultsSearchDropdown>
        </div>
        <div
          className="w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12"
        >
          <SearchForm
            searchType={selectedOption}
            sliderVals={sliderVals}
            updateSliderVals={() => {}}
          ></SearchForm>
        </div>
      </div>
    </>
  );
};

export default ResultsNavbar;
