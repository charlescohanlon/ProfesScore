import React, { FC } from "react";

interface ResultCouseCardProps {
  courseName: string;
}

const ResultsCourseCard: FC<ResultCouseCardProps> = ({
  courseName,
}): JSX.Element => {
  return (
    <div
      className={
        "h-full py-1 bg-brandAmber rounded-lg border-2 border-white bg-gray50 flex justify-center " +
        "text-white text-center " +
        "md:py-2 "
      }
    >
      <div>
        <h2 className={"text-xs m-0 " + "md:text-sm "}>Course</h2>
        <h1 className={"text-2xl m-0 " + "md:text-3xl "}>{courseName}</h1>
      </div>
    </div>
  );
};

export default ResultsCourseCard;
