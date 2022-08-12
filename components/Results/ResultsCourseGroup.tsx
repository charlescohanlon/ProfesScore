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
          .map((elm, idx) => {
            return (
              <>
                <p
                  className={
                    "h-1/2 w-full border-l-2 border-b-2 last-of-type:rounded-bl-xl border-brandAmber " +
                    "row-span-1 select-none "
                  }
                  key={idx}
                ></p>
                <div key={elm}>
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
