import { FC } from "react";
import ResultsProfessorCard from "./ProfessorCard";
import ResultsCourseGroup from "./CourseGroup";

interface ResultsScrollContainerProps {
  searchResults: Array<Object>;
}

const ResultsScrollContainer: FC<ResultsScrollContainerProps> = ({
  searchResults,
}): JSX.Element => {
  return (
    <div
      className={
        "h-full w-11/12 mt-3 pt-3 px-3 mx-auto rounded-t-lg border-t-2 border-x-2 flex flex-col overflow-y-scroll " +
        "sm:w-10/12 sm:pt-4 sm:px-4 " +
        "md:w-9/12 md:pt-5 md:px-5 " +
        "lg:w-7/12 lg:pt-6 lg:px-6 " +
        "xl:w-6/12 "
      }
    >
      {searchResults.map((elm, idx) => {
        return (
          <div
            key={idx}
            className={"mb-4 " + "sm:mb-5 " + "md:mb-6 " + "lg:mb-7"}
          >
            <ResultsProfessorCard professorObj={elm}></ResultsProfessorCard>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsScrollContainer;
