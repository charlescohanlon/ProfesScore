import { ProfessorPreview, Course, SearchQuery } from "../../../types";
import { parseCourseNum } from "../../utils";
import CardPreviewGrid from "./CardPreviewGrid";
import { useRouter } from "next/router";
import { useCallback } from "react";

export interface Metric {
  title: string;
  value: number | string;
}

interface ResultProfessorCardProps {
  profPreview: ProfessorPreview;
  ratioState: { displayARatio: boolean; toggleARatio(): void };
  numGradeState: {
    collapseNumGrades: boolean;
    displayRating: boolean;
    toggleDisplayRating(): void;
  };
  deptWide: boolean;
  showInfo: boolean;
  handleObserver?(ref: HTMLDivElement): void;
}

const ResultsProfessorCard = ({
  profPreview,
  ratioState,
  numGradeState,
  deptWide,
  showInfo,
  handleObserver,
}: ResultProfessorCardProps): JSX.Element => {
  const { professor, taughtCourses } = profPreview;
  const router = useRouter();
  function taughtCourseLink(c: Omit<Course, "department">) {
    const query: SearchQuery = {
      type: "course",
      cq: `${c.abbreviation} ${c.number}`,
    };
    router.push({ pathname: "/results", query: { ...query } });
  }

  const courseLinks: JSX.Element = (
    <h2
      className={
        "text-xs whitespace-nowrap text-brandGray font-PTSans flex " +
        "md:text-sm "
      }
    >
      {taughtCourses.map((course: Omit<Course, "department">, idx) => {
        return (
          <div key={idx} className="flex">
            <a
              onClick={() => taughtCourseLink(course)}
              className="hover:text-brandAmber cursor-pointer"
            >
              {`${course.abbreviation} ${parseCourseNum(course.number)}`}
            </a>
            {idx < taughtCourses.length - 1 ? (
              <span className="mr-[3px]">,</span>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </h2>
  );

  return (
    <div
      className={
        "w-full h-full z-0 pl-2 py-1 rounded-lg border-2 border-gray-300 bg-gray50 flex " +
        "md:py-2 "
      }
      ref={handleObserver}
    >
      <div
        className={"w-5/12 my-auto text-left " + "xs:w-6/12 " + "sm:w-7/12 "}
      >
        <h1
          className={
            "text-base m-0 text-black truncate font-PTSans font-bold " +
            "md:text-xl " +
            "lg:text-2xl"
          }
        >{`${professor.lastName}, ${professor.firstName}`}</h1>
        <div
          className={
            "w-24 overflow-x-auto scrollbar-hide " +
            "xs:w-36 sm:w-44 " +
            "md:w-56 " +
            "lg:w-64"
          }
        >
          {courseLinks}
        </div>
      </div>
      {deptWide && (
        <div
          className={
            "text-xs opacity-50 whitespace-nowrap items-center hidden " +
            "sm:flex "
          }
        >
          Department-Wide
        </div>
      )}
      <CardPreviewGrid
        ratioState={ratioState}
        isLast={showInfo}
        numGradeState={numGradeState}
        preview={profPreview}
      ></CardPreviewGrid>
    </div>
  );
};

export default ResultsProfessorCard;
