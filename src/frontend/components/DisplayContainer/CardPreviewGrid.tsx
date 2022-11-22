import clsx from "clsx";
import { useContext } from "react";
import { InfoPopupContext } from "../../../pages/_app";
import { ProfessorPreview } from "../../../types";
import InfoPopup from "../InfoPopup";

interface CardPreviewGridProps {
  preview: ProfessorPreview;
  isLast: boolean;
  ratioState: { displayARatio: boolean; toggleARatio(): void };
  numGradeState: {
    collapseNumGrades: boolean;
    displayRating: boolean;
    toggleDisplayRating(): void;
  };
}

const CardPreviewGrid = ({
  preview: { aRatio, passingRatio, numGrades, rating, score },
  ratioState: { displayARatio, toggleARatio },
  numGradeState: {
    collapseNumGrades,
    displayRating,
    toggleDisplayRating: toggleDisplayNumGrades,
  },
  isLast,
}: CardPreviewGridProps): JSX.Element => {
  const { isShowing } = useContext(InfoPopupContext);
  const showInfo = isShowing && isLast;

  function colorScore(value: number): string {
    if (value < 33.33) return " font-bold text-red-600 ";
    if (value < 66.66) return " font-bold text-yellow-400 ";
    return " font-bold text-green-500 ";
  }
  const hoverAndActiveClasses = "hover:bg-gray-50 ";

  const aRatioCol: [JSX.Element, JSX.Element] = [
    <h2
      key={"aRatioTitle"}
      className={
        "relative m-0 p-0 text-xs flex justify-center items-end " +
        "md:text-sm " +
        "xl:text-base " +
        "border-r-2 border-gray-300 "
      }
    >
      {displayARatio ? "A's" : "Passing"}
      <button
        className={
          "absolute z-10 left-0 top-0 h-10 bg-transparent w-full rounded-l-lg opacity-40 " +
          "md:h-12 lg:h-[3.25rem] xl:h-14 " +
          hoverAndActiveClasses
        }
        onClick={toggleARatio}
      ></button>
    </h2>,
    <h1
      key={"aRatioValue"}
      className={
        "relative m-0 p-0 flex justify-center items-center " +
        "text-sm md:text-base xl:text-lg " +
        "border-r-2 border-gray-300 "
      }
    >
      {displayARatio ? aRatio : passingRatio}%
      {showInfo && !collapseNumGrades && (
        <div
          className={clsx(
            "absolute",
            "top-8",
            "sm:top-8",
            "md:top-10",
            "lg:top-[2.625rem]",
            "xl:top-11"
          )}
        >
          <InfoPopup addtlClasses="w-28 sm:w-36 text-center " isUpsideDown>
            Click to see the ratio for passing grades
          </InfoPopup>{" "}
        </div>
      )}
    </h1>,
  ];

  const numGradesCol: [JSX.Element, JSX.Element] = [
    <h2
      key={"numGradesTitle"}
      className={
        "m-0 p-0 text-xs flex justify-center items-end relative " +
        "md:text-sm " +
        "xl:text-base " +
        "border-r-2 border-gray-300 "
      }
    >
      Total
    </h2>,
    <h1
      key={"numGradesValue"}
      className={
        "m-0 p-0 flex justify-center items-center " +
        "text-sm md:text-base xl:text-lg " +
        "border-r-2 border-gray-300 "
      }
    >
      {numGrades}
    </h1>,
  ];

  const isShowingRating = displayRating || !collapseNumGrades;
  let ratingColVal;
  if (isShowingRating) ratingColVal = rating ? `${rating}/5` : "N/A";
  else ratingColVal = numGrades;
  const ratingCol: [JSX.Element, JSX.Element] = [
    <h2
      key={"ratingTitle"}
      className={
        "relative m-0 p-0 text-xs flex justify-center items-end " +
        "md:text-sm " +
        "xl:text-base " +
        "border-r-2 border-gray-300 "
      }
    >
      {isShowingRating ? "Rating" : "Total"}
      {collapseNumGrades && (
        <>
          <button
            className={
              "absolute left-0 top-0 h-10 w-full bg-transparent opacity-40 " +
              "md:h-12 " +
              hoverAndActiveClasses
            }
            onClick={toggleDisplayNumGrades}
          ></button>
        </>
      )}
    </h2>,
    <h1
      key={"ratingValue"}
      className={clsx(
        "relative",
        "m-0",
        "p-0",
        "flex",
        "justify-center",
        "items-center",
        "text-sm",
        "md:text-base",
        "xl:text-lg",
        "border-r-2",
        "border-gray-300"
      )}
    >
      {ratingColVal}
      {showInfo && collapseNumGrades && (
        <div className={clsx("absolute", "top-8")}>
          <InfoPopup
            addtlClasses={clsx("w-28", "sm:w-36", "text-center")}
            isUpsideDown
          >
            Click to see the total number of grades given
          </InfoPopup>{" "}
        </div>
      )}
    </h1>,
  ];

  const scoreCol: [JSX.Element, JSX.Element] = [
    <h2
      key={"scoreTitle"}
      className={
        "m-0 p-0 text-xs flex justify-center items-end " +
        "md:text-sm xl:text-base " +
        colorScore(score)
      }
    >
      Score
    </h2>,
    <h1
      key={"scoreValue"}
      className={
        "m-0 p-0 flex justify-center items-center " +
        "text-base md:text-xl xl:text-2xl font-bold " +
        colorScore(score)
      }
    >
      {numGrades !== 0 ? score : "N/A"}
    </h1>,
  ];

  const columns = [aRatioCol, numGradesCol, ratingCol, scoreCol];
  if (collapseNumGrades) columns.splice(1, 1);
  return (
    <div
      className={clsx(
        "w-7/12",
        "grid",
        collapseNumGrades ? "grid-cols-3" : "grid-cols-4",
        "xs:w-6/12",
        "sm:w-5/12"
      )}
    >
      {columns.map((title) => title[0])}
      {columns.map((value) => value[1])}
    </div>
  );
};

export default CardPreviewGrid;
