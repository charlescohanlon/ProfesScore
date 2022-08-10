import React, { FC, useState } from "react";
import SearchBar from "./SearchBar";
import SearchGenericInput from "./SearchGenericInput";
import SearchSlider from "./SearchSlider";
import SearchSubmitBtn from "./SearchSubmitBtn";
import { SearchType } from "./SearchHome";
import { useRouter } from "next/router";
interface SearchFormProps {
  searchType: SearchType;
}
interface SearchSubmitProps {
  submitQuery: Function;
}
const SearchForm: FC<SearchFormProps> = ({ searchType }): JSX.Element => {
  const router = useRouter();
  function submitQuery(query: string) {
    console.log(query);
    router.push({
      pathname: "/results",
      query: { type: searchType, q: query },
    });
  }

  return (
    <>
      {searchType == "professor" ? (
        <ProfessorForm submitQuery={submitQuery}></ProfessorForm>
      ) : searchType == "course" ? (
        <CourseForm submitQuery={submitQuery}></CourseForm>
      ) : (
        <RatingForm submitQuery={submitQuery}></RatingForm>
      )}
    </>
  );
};

const ProfessorForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
  return (
    <div className="flex justify-center">
      <SearchBar
        submit={submitQuery}
        placeholderText="Professor Name"
      ></SearchBar>
    </div>
  );
};

const CourseForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 justify-items-center gap-3 sm:gap-5 md:gap-7 lg:gap-8">
      <div className="w-full col-span-full ">
        <SearchBar
          submit={submitQuery}
          placeholderText="Course Title"
        ></SearchBar>
      </div>

      <SearchGenericInput
        submit={submitQuery}
        placeholderText="Subject (opt.)"
      ></SearchGenericInput>
    </div>
  );
};

const RatingForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
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
      <SearchSubmitBtn submit={submitQuery}></SearchSubmitBtn>
    </div>
  );
};

export default SearchForm;
