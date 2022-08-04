import React, { FC } from "react";
import Link from "next/link";

interface ResultProfessorCardProps {
  firstName: string;
  lastName: string;
  taughtCourses: Array<string>;
  score: number;
  id: number;
}

const ResultsProfessorCard: FC<ResultProfessorCardProps> = ({
  firstName,
  lastName,
  taughtCourses,
  score,
  id,
}): JSX.Element => {
  const courseLinks: JSX.Element = (
    <h2 className={"text-xs text-brandGray font-PTSans " + "md:text-sm "}>
      {taughtCourses.map((course) => (
        <>
          <Link href="/">
            <a key={course} className="hover:text-brandAmber" id={course}>
              {course}
            </a>
          </Link>
          <span key={course} className="last:hidden">
            {", "}
          </span>
        </>
      ))}
    </h2>
  );

  return (
    <div
      className={
        "h-full py-1 group hover:border-brandAmber rounded-lg border-2 border-gray-300 bg-gray50 flex justify-between " +
        "md:py-2 "
      }
    >
      <div className="ml-2 md:ml-3 text-left ">
        <h1
          className={
            "text-2xl m-0 text-black font-PTSans font-bold " + "md:text-2xl "
          }
        >{`${lastName}, ${firstName}`}</h1>
        {courseLinks}
      </div>
      <div className="flex items-center">
        <div className="hidden xs:block">
          <h2 className="text-xs text-center text-brandGray">Ratio</h2>
          <h1
            className={
              "-my-1 mx-2 text-center text-lg text-brandGray " +
              "md:my-0 md:mx-4 md:text-xl"
            }
          >
            22%
          </h1>
        </div>
        <div
          className={
            "h-5/6 border-gray-300 group-hover:border-brandAmber border-l-2 hidden xs:block " +
            "md:h-full "
          }
        ></div>
        <div className="hidden xs:block">
          <h2 className="text-xs text-center text-brandGray">Quality</h2>
          <h1
            className={
              "-my-1 mx-2 text-center text-lg text-brandGray " +
              "md:my-0 md:mx-4 md:text-xl  "
            }
          >
            3.3/5
          </h1>
        </div>
        <div
          className={
            "h-5/6 border-gray-300 group-hover:border-brandAmber border-l-2 " +
            "md:h-full "
          }
        ></div>
        <div>
          <h2 className="text-xs text-center text-brandGray">Score</h2>
          <h1
            className={
              "-my-1 mx-2 text-center text-2xl text-green-500 " + // green-500, yellow-300, red-500
              "md:my-0 md:mx-4 md:text-3xl "
            }
          >
            {score}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResultsProfessorCard;
