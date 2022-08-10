import { FC } from "react";
import { SearchSubmitProps } from "./SearchForm";
import SearchBar from "./SearchBar";
import SearchGenericInput from "./SearchGenericInput";

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
export default CourseForm;
