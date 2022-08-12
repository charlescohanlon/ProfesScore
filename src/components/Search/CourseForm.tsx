import { FC, useState } from "react";
import { SearchSubmitProps, SearchQueryObject } from "./SearchForm";
import SearchBar from "./SearchBar";
import SearchGenericInput from "./SearchGenericInput";

const CourseForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
  const [courseVal, setCourseVal] = useState<string>("");
  const [subjectVal, setSubjectVal] = useState<string>("");

  function buildQuery() {
    const query: SearchQueryObject = {};
    courseVal.trim() !== "" ? (query.cq = courseVal) : null;
    subjectVal.trim() !== "" ? (query.sq = subjectVal) : null;

    submitQuery(query);
  }

  return (
    <div className="grid grid-rows-2 grid-cols-2 justify-items-center gap-3 sm:gap-5 md:gap-7 lg:gap-8">
      <div className="w-full col-span-full ">
        <SearchBar
          submit={buildQuery}
          getValue={setCourseVal}
          placeholderText="Course Title"
        ></SearchBar>
      </div>

      <SearchGenericInput
        submit={buildQuery}
        getValue={setSubjectVal}
        placeholderText="Subject (opt.)"
      ></SearchGenericInput>
    </div>
  );
};
export default CourseForm;
