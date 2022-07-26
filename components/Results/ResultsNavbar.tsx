import React, { FC, useState } from "react";
import ResultsSearchDropdown from "./ResultsSearchDropdown";
import SearchForm from "../Search/SearchForm";
import Logo from "../Logo";
import NavbarLinks from "../NavbarLinks";
import { SearchType } from "../Search/SearchHome";

const ResultsNavbar: FC = (): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SearchType>("Professor");

  function updateSelectedOption(newOption: SearchType): void {
    setSelectedOption(newOption);
  }

  return (
    <>
      {/* <div className="absolute w-screen h-28 z-10 bg-red-400 opacity-30"></div> */}
      <div className="fixed flex flex-col bg-brandAmber sm:flex-row">
        <div
          className={
            "w-1/2 mt-2 ml-2 p-1.5 rounded-t-xl bg-white " +
            "sm:absolute sm:w-2/12 sm:h-full sm:pt-6 sm:rounded-xl " +
            "md:mt-3 md:ml-3 md:pt-7 " +
            "lg:pt-8 " +
            "2xl:pt-6 2xl:max-w-sm"
          }
        >
          <a href="">
            <Logo></Logo>
          </a>
        </div>
        <div
          className={
            "w-screen max-h-16 hover:max-h-96 pt-3 pb-2 bg-brandAmber transition-all ease-in-out flex justify-center " +
            "overflow-hidden overflow-clip " + // clip not supported by by all browsers
            "sm:pb-5 sm:pt-6 sm:max-h-20 " +
            "md:pb-7 md:pt-7 md:max-h-24 " +
            "lg:pb-8 lg:pt-9 lg:max-h-28 "
          }
        >
          <div className="w-full flex justify-center">
            <div className="ml-2 mr-1 sm:mx-0.5 md:mx-1 lg:mx-2">
              <ResultsSearchDropdown
                selectedOption={selectedOption}
                updateSelectedOption={updateSelectedOption}
              ></ResultsSearchDropdown>
            </div>
            <div className="w-full sm:w-6/12 md:w-5/12 2xl:w-4/12 ml-1 mr-2 sm:mx-0.5 md:mx-1 lg:mx-2">
              <SearchForm searchType={selectedOption}></SearchForm>
            </div>
          </div>
          <NavbarLinks extraClasses="text-white"></NavbarLinks>
        </div>
      </div>
    </>
  );
};

export default ResultsNavbar;
