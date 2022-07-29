import React, { FC } from "react";

const ResultsScrollContainer: FC = (): JSX.Element => {
  return (
    <>
      <div
        className={
          "w-11/12 h-full mx-auto mt-32 rounded-lg border-t-2 border-x-2 " +
          "sm:w-10/12 xs:mt-36 sm:mt-24 " +
          "md:w-8/12 md:mt-28 " +
          "lg:w-6/12 lg:mt-32 "
        }
        // style={{ height: "Calc(100% + 5rem)" }}
      ></div>
    </>
  );
};

export default ResultsScrollContainer;
