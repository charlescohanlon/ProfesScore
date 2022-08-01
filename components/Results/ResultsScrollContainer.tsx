import React, { FC } from "react";
import ResultsProfessorCard from "./ResultsProfessorCard";
import ResultsCourseGroup from "./ResultsCourseGroup";

const ResultsScrollContainer: FC = (): JSX.Element => {
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
      {Array(10)
        .fill(0)
        .map(() => {
          return (
            <div className={"mb-4 " + "sm:mb-5 " + "md:mb-6 " + "lg:mb-7"}>
              <ResultsCourseGroup></ResultsCourseGroup>
            </div>
          );
        })}
    </div>
  );
};

export default ResultsScrollContainer;
