import React, { FC, useState } from "react";
import SearchForm from "./SearchForm";
import SearchTypeTab from "./SearchTypeTab";
import Logo from "../Logo";

export type SearchType = "Professor" | "Course" | "Rating";

const SearchHome: FC = (): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SearchType>("Professor");

  function updateSelectedOption(newOption: SearchType): void {
    setSelectedOption(newOption);
  }

  return (
    <div className="relative top-1/4 h-fit w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12">
      <div className="m-5">
        <Logo></Logo>
      </div>
      <div className="flex">
        {[
          "Professor" as SearchType,
          "Course" as SearchType,
          "Rating" as SearchType,
        ].map((option: SearchType) => (
          <SearchTypeTab
            key={option}
            typeText={option}
            isSelected={option == selectedOption}
            updateSelectedOption={updateSelectedOption}
          ></SearchTypeTab>
        ))}
      </div>
      <div className="w-full h-fit rounded-b-xl bg-brandAmber p-4 sm:p-8 md:p-9 lg:p-10">
        <SearchForm searchType={selectedOption}></SearchForm>
      </div>
    </div>
  );
};

export default SearchHome;
