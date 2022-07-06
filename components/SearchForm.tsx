import React, { FC } from "react";
import SearchBar from "./SearchBar";
import SearchGenericInput from "./SearchGenericInput";
import SearchSlider from "./SearchSlider";

interface SearchFormProps {
  searchType: string;
  sliderVals: [number, number];
  updateSliderVals: Function;
}

const SearchForm: FC<SearchFormProps> = ({
  searchType,
  sliderVals,
  updateSliderVals,
}): JSX.Element => {
  const ProfessorForm: JSX.Element = (
    <div className="flex justify-center">
      <SearchBar placeholderText="Professor Name"></SearchBar>
    </div>
  );

  const CourseForm: JSX.Element = (
    <div className="grid grid-rows-2 grid-cols-2 justify-items-center gap-3 sm:gap-4 md:gap-5 lg:gap-7 xl:gap-8">
      <div className="w-full col-span-full ">
        <SearchBar placeholderText="Course Title"></SearchBar>
      </div>
      <SearchGenericInput placeholderText="Subject (optional)"></SearchGenericInput>
      <SearchGenericInput placeholderText="Professor (optional)"></SearchGenericInput>
    </div>
  );

  const RatingForm: JSX.Element = (
    <SearchSlider
      sliderVals={sliderVals}
      updateSliderVals={updateSliderVals}
    ></SearchSlider>
  );

  return (
    <div className="p-4 sm:p-8 md:p-9 lg:p-10">
      {searchType == "Professor"
        ? ProfessorForm
        : searchType == "Course"
        ? CourseForm
        : RatingForm}
    </div>
  );
};

export default SearchForm;
