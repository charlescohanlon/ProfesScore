import React, { FC, useState } from "react";
import SearchBar from "./SearchBar";
import SearchGenericInput from "./SearchGenericInput";
import SearchSlider from "./SearchSlider";
import SearchSubmitBtn from "./SearchSubmitBtn";
import { SearchType } from "./SearchHome";

interface SearchFormProps {
  searchType: SearchType;
}

const SearchForm: FC<SearchFormProps> = ({ searchType }): JSX.Element => {
  return (
    <>
      {searchType == "Professor" ? (
        <ProfessorForm></ProfessorForm>
      ) : searchType == "Course" ? (
        <CourseForm></CourseForm>
      ) : (
        <RatingForm></RatingForm>
      )}
    </>
  );
};

const ProfessorForm: FC = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <SearchBar placeholderText="Professor Name"></SearchBar>
    </div>
  );
};

const CourseForm: FC = (): JSX.Element => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 justify-items-center gap-3 sm:gap-5 md:gap-7 lg:gap-8">
      <div className="w-full col-span-full ">
        <SearchBar placeholderText="Course Title"></SearchBar>
      </div>
      <SearchGenericInput placeholderText="Subject (opt.)"></SearchGenericInput>
      <SearchGenericInput placeholderText="Professor (opt.)"></SearchGenericInput>
    </div>
  );
};

const RatingForm: FC = (): JSX.Element => {
  const [sliderVals, setSliderVals] = useState<[string, string]>(["1", "100"]);

  function setLeftSliderVal(newVal: string): void {
    setSliderVals([newVal, sliderVals[1]]);
  }

  function setRightSliderVal(newVal: string): void {
    setSliderVals([sliderVals[0], newVal]);
  }

  return (
    <div className="grid grid-rows-2 justify-items-center gap-3 sm:gap-5 md:gap-7 lg:gap-8">
      <SearchSlider
        sliderVals={sliderVals}
        updateSliderVals={[setLeftSliderVal, setRightSliderVal]}
      ></SearchSlider>
      <SearchSubmitBtn></SearchSubmitBtn>
    </div>
  );
};

export default SearchForm;
