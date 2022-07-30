import React, { FC } from "react";

interface ResultProfessorCardProps {}

const ResultsProfessorCard: FC<ResultProfessorCardProps> = (): JSX.Element => {
  return (
    <div
      className={
        "relative z-0 w-full h-full py-0.5 hover:scale-105 rounded-lg border-2 border-gray-300 bg-gray50 flex justify-between " +
        "md:py-1 "
      }
    >
      <div className="ml-2 text-left text-brandGray">
        <h1 className={"text-2xl m-0 " + "md:text-3xl "}>Larkin, Grant</h1>
        <h2 className={"text-xs " + "md:text-sm "}>Professor</h2>
      </div>
      <div className="h-full flex items-center">
        <div
          className={"h-5/6 border-gray-300 border-l-2 " + "md:h-full "}
        ></div>
        <div>
          <h2 className={"text-xs text-center " + "md:text-sm "}>Score</h2>
          <h1
            className={
              "-my-1 mx-2 text-center text-2xl text-yellow-300 " + // green-500, yellow-300, red-500
              "md:my-0 md:text-3xl md:mx-4 "
            }
          >
            77
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResultsProfessorCard;
