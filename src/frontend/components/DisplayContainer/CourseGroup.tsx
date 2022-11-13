import { CoursePreview } from "../../../types";
import CourseCard from "./CourseCard";
import ProfessorCard from "./ProfessorCard";

interface CourseGroupProps {
  courseRes: CoursePreview;
  ratioState: { displayARatio: boolean; toggleARatio(): void };
  numGradeState: {
    collapseNumGrades: boolean;
    displayRating: boolean;
    toggleDisplayRating(): void;
  };
  isFirstGroup: boolean;
  handleObserver?(ref: HTMLDivElement): void;
}

const CourseGroup = ({
  courseRes: { course, professors },
  ratioState,
  numGradeState,
  isFirstGroup,
  handleObserver,
}: CourseGroupProps): JSX.Element => {
  return (
    <div className="relative">
      {/* orange position line */}
      <div
        className={
          "h-[calc(100%-2.1rem)] w-0.5 mt-2 absolute bg-brandAmber " +
          "md:h-[calc(100%-2.6rem)] " +
          "lg:h-[calc(100%-2.7rem)] " +
          "xl:h-[calc(100%-2.8rem)]"
        }
      ></div>
      <CourseCard course={course}></CourseCard>
      {professors
        .sort((a, b) => b.score - a.score)
        .map((prof, idx) => {
          return (
            <div
              key={idx}
              className={
                "mt-2 flex items-center " + "sm:mt-3 " + "md:mt-4 " + "lg:mt-5"
              }
            >
              <div className="h-1/2 w-4 border-l-2 border-b-2 border-brandAmber select-none "></div>
              <div className="w-full">
                <ProfessorCard
                  profPreview={prof}
                  showInfo={isFirstGroup && idx === 0}
                  ratioState={ratioState}
                  numGradeState={numGradeState}
                  deptWide={false}
                  handleObserver={
                    handleObserver && idx === professors.length - 1
                      ? handleObserver
                      : undefined
                  }
                ></ProfessorCard>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CourseGroup;
