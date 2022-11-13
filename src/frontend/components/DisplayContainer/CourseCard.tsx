import { useRouter } from "next/router";
import { Course } from "../../../types";
import { parseCourseNum } from "../../utils";

interface ResultCourseCardProps {
  course: Course;
}

const ResultsCourseCard = ({ course }: ResultCourseCardProps): JSX.Element => {
  const router = useRouter();
  return (
    <div
      className={
        "w-full h-full py-1 bg-brandAmber border-2 border-brandAmber " +
        "rounded-lg rounded-bl-none flex justify-center text-white text-center " +
        "md:py-2 "
      }
    >
      <div>
        <h1 className={"m-0 text-2xl font-bold " + "md:text-3xl "}>{`${
          course.abbreviation
        } ${parseCourseNum(course.number)}`}</h1>
        <h2 className={"text-xs m-0 font-Barlow " + "md:text-sm "}>
          {course.department}
        </h2>
      </div>
    </div>
  );
};

export default ResultsCourseCard;
