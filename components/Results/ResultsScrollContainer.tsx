import React, { FC } from "react";
import ResultsProfessorCard from "./ResultsProfessorCard";
import ResultsCourseCard from "./ResultsCourseCard";

const ResultsScrollContainer: FC = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div
        className={
          "fixed w-11/12 h-full mt-32 p-4 rounded-t-lg border-t-2 border-x-2 flex flex-col overflow-y-scroll " +
          "sm:w-10/12 xs:mt-36 sm:mt-24 sm:p-5 " +
          "md:w-9/12 md:mt-28 md:p-6 " +
          "lg:w-7/12 lg:mt-32 lg:p-7 " +
          "xl:w-6/12 xl:mt-36 xl:p-8"
        }
      >
        <div
          className={
            "not-last:mb-3 " + "not-last:sm:mb-4 " + "not-last:md:mb-3 "
          }
        >
          <ResultsCourseCard courseName="MATH 1C"></ResultsCourseCard>
        </div>
        {Array(5)
          .fill(0)
          .map(() => {
            return (
              <>
                <div
                  className={
                    "ml-10 not-last:mb-3 " +
                    "not-last:sm:mb-4 " +
                    "not-last:md:mb-5 " +
                    "not-last:lg:mb-6 " +
                    "not-last:xl:mb-3"
                  }
                >
                  <ResultsProfessorCard
                    firstName="Zack"
                    lastName="Judson"
                    taughtCourses={["MATH 1B", "MATH 1C"]}
                    id={0}
                  ></ResultsProfessorCard>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ResultsScrollContainer;
