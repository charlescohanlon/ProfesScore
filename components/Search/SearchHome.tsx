import React, { FC } from "react";
import SearchForm from "./SearchForm";
import SearchTypeTab from "./SearchTypeTab";
import Logo from "../Logo";

interface SearchHomeProps {
  selectedOption: string;
  updateSelectedOption: Function;
  sliderVals: [string, string];
  updateSliderVals: [Function, Function];
}

const SearchHome: FC<SearchHomeProps> = ({
  selectedOption,
  updateSelectedOption,
  sliderVals,
  updateSliderVals,
}): JSX.Element => {
  return (
    <div className="relative top-1/4 h-fit w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12">
      <div className="m-5">
        <Logo></Logo>
      </div>
      <div className="flex">
        {["Professor", "Course", "Rating"].map((option) => (
          <SearchTypeTab
            key={option}
            typeText={option}
            isSelected={option == selectedOption}
            updateSelection={updateSelectedOption}
          ></SearchTypeTab>
        ))}
      </div>
      <div
        className={
          "w-full h-fit rounded-b-xl bg-brandAmber p-4 sm:p-8 md:p-9 lg:p-10"
        }
      >
        <SearchForm
          searchType={selectedOption}
          sliderVals={sliderVals}
          updateSliderVals={updateSliderVals}
        ></SearchForm>
      </div>
    </div>
  );
};

export default SearchHome;
