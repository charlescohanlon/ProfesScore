import React, { FC } from "react";
import ResultsCourseCard from "./ResultsCourseCard";
import ResultsProfessorCard from "./ResultsProfessorCard";

interface ResultsCourseGroupProps {}

const ResultsCourseGroup: FC<ResultsCourseGroupProps> = (): JSX.Element => {
  return (
    <div className="relative">
      <div className="absolute h-[89%] w-0.5 mt-2 bg-brandAmber"></div>
      <div
        className={
          "w-full grid grid-cols-[1rem_1fr] items-start gap-y-2 " +
          "sm:gap-y-3 " +
          "md:gap-y-4 " +
          "lg:gap-y-5"
        }
      >
        <div className="col-span-2">
          <ResultsCourseCard courseName="MATH 1C"></ResultsCourseCard>
        </div>
        {Array(5)
          .fill(0)
          .map(() => {
            return (
              <>
                <p
                  className={
                    "h-1/2 w-full border-l-2 border-b-2 last-of-type:rounded-bl-xl border-brandAmber " +
                    "row-span-1 select-none "
                  }
                ></p>
                <div
                // className={
                //   "ml-5 mb-3 " +
                //   "sm:ml-6 sm:mb-4 " +
                //   "md:ml-7 md:mb-5 " +
                //   "lg:ml-8 lg:mb-6 " +
                //   "xl:mb-3"
                // }
                >
                  <ResultsProfessorCard
                    firstName="Zack"
                    lastName="Judson"
                    taughtCourses={["MATH 1B", "MATH 1C"]}
                    score={96}
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

export default ResultsCourseGroup;
