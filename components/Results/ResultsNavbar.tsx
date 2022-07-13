import React, { FC, useState } from "react";
import ResultsSearchDropdown from "./ResultsSearchDropdown";
import SearchForm from "../Search/SearchForm";
import Logo from "../Logo";
import { SearchType } from "../Search/SearchHome";

interface ResultsNavbarProps {
  dropdownIsSelected: boolean;
  toggleDropdown: Function;
}

const ResultsNavbar: FC<ResultsNavbarProps> = ({
  dropdownIsSelected,
  toggleDropdown,
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SearchType>("Professor");

  function updateSelectedOption(newOption: SearchType): void {
    setSelectedOption(newOption);
  }

  return (
    <>
      {/* <div className="absolute w-screen h-24 h z-10 bg-red-400 opacity-30"></div> */}
      <div className="fixed flex">
        <div className="absolute w-2/12 h-full mt-3 ml-3 pt-4 px-3 rounded-xl bg-white">
          <Logo></Logo>
        </div>
        <div className="w-screen h-24 hover:h-fit overflow-clip pt-7 pb-6 flex justify-center bg-brandAmber">
          <div className=" h-fit w-1/12">
            <ResultsSearchDropdown
              selectedOption={selectedOption}
              updateSelectedOption={updateSelectedOption}
              dropdownIsSelected={dropdownIsSelected}
              toggleDropdown={toggleDropdown}
            ></ResultsSearchDropdown>
          </div>
          <div className="h-fit w-5/12">
            <SearchForm searchType={selectedOption}></SearchForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsNavbar;
