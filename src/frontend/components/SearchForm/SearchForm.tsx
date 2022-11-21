import { useEffect, useState } from "react";
import { SearchType } from "../../../types";
import { SearchQuery } from "../../../types";
import SearchBar from "./SearchBar";
import GenericInput from "./GenericInput";
import DoubleSlider from "./DoubleSlider";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/router";
import {
  CourseAndDepartmentSkeleton,
  ProfessorSkeleton,
  ScoreSkeleton,
} from "./SkeletonLoader";

interface SearchFormProps {
  searchType: SearchType;
  showOrOnHover?: boolean;
}

const SearchForm = ({
  searchType,
  showOrOnHover,
}: SearchFormProps): JSX.Element => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  function submitQuery(query: SearchQuery) {
    router.push({
      pathname: "/results",
      query: { ...query },
    });
  }

  // used to notify component of loading state for animations
  function handleAnimationTransition() {
    setIsTransitioning(true);
  }

  function handleAnimationTransitionEnd() {
    setIsTransitioning(false);
  }

  useEffect(() => {
    // attaching animation handlers for router transition events.
    router.events.on("routeChangeStart", handleAnimationTransition);
    router.events.on("routeChangeComplete", handleAnimationTransitionEnd);
    router.events.on("routeChangeError", handleAnimationTransitionEnd);

    // removing animation/loading handlers in cleanup function.
    return () => {
      router.events.off("routeChangeStart", handleAnimationTransition);
      router.events.off("routeChangeComplete", handleAnimationTransitionEnd);
      router.events.off("routeChangeError", handleAnimationTransitionEnd);
    };
  }, [router]);

  if (isTransitioning) {
    switch (searchType) {
      case "professor":
        return <ProfessorSkeleton />;
      case "course":
        return <CourseAndDepartmentSkeleton />;
      default:
        return <ScoreSkeleton />;
    }
  }

  switch (searchType) {
    case "professor":
      return <ProfessorForm submitQuery={submitQuery} />;
    case "course":
      return (
        <CourseForm submitQuery={submitQuery} showOrOnHover={showOrOnHover} />
      );
    default:
      return <ScoreForm submitQuery={submitQuery} />;
  }
};

interface SearchSubmitProps {
  submitQuery(query: SearchQuery): void;
}

const ProfessorForm = ({ submitQuery }: SearchSubmitProps): JSX.Element => {
  const [professorVal, setProfessorVal] = useState<string>("");
  function buildProfessorQuery() {
    if (professorVal.trim() != "")
      submitQuery({ type: "professor", pq: professorVal });
  }
  return (
    <div className="flex justify-center">
      <SearchBar
        submit={buildProfessorQuery}
        value={professorVal}
        setValue={setProfessorVal}
        placeholderText="Professor Name"
      ></SearchBar>
    </div>
  );
};

interface CourseSearchSubmitProps extends SearchSubmitProps {
  showOrOnHover?: boolean;
}

const CourseForm = ({
  submitQuery,
  showOrOnHover,
}: CourseSearchSubmitProps): JSX.Element => {
  const [courseVal, setCourseVal] = useState<string>("");
  const [departmentVal, setDepartmentVal] = useState<string>("");

  function clearOtherWhenWriting(searchBy: string) {
    if (searchBy === "Department" && courseVal !== "") setCourseVal("");
    else if (searchBy === "Course Title" && departmentVal !== "")
      setDepartmentVal("");
  }

  function buildCourseQuery() {
    let query: SearchQuery = {
      type: "course",
    };
    if (courseVal.trim() !== "") {
      query.cq = courseVal;
      submitQuery(query);
      return;
    }
    if (departmentVal.trim() !== "") {
      query.dq = departmentVal;
      submitQuery(query);
      return;
    }
  }

  return (
    <div
      className={
        "grid grid-rows-[minmax(0, 1fr), 0, minmax(0, 1fr)] grid-cols-3 justify-items-center items-center gap-1.5 " +
        "sm:gap-2.5 " +
        "md:gap-4 "
      }
    >
      <div className="z-0 w-full col-span-full ">
        <SearchBar
          submit={buildCourseQuery}
          value={courseVal}
          setValue={setCourseVal}
          placeholderText="Course Title"
          clearOther={clearOtherWhenWriting}
        ></SearchBar>
      </div>
      <div
        className={
          "h-0 z-0 col-span-full " +
          (showOrOnHover
            ? "opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300 delay-100 "
            : "opacity-100")
        }
      >
        <p
          className={
            "text-xs text-center font-Barlow text-white font-bold tracking-widest -translate-y-1/2 " +
            "sm:text-base " +
            "md:text-xl " +
            "lg:text-2xl"
          }
        >
          OR
        </p>
      </div>
      <div className="z-0 w-full col-span-full">
        <GenericInput
          submit={buildCourseQuery}
          value={departmentVal}
          setValue={setDepartmentVal}
          placeholderText="Department"
          clearOther={clearOtherWhenWriting}
        ></GenericInput>
      </div>
    </div>
  );
};

const ScoreForm = ({ submitQuery }: SearchSubmitProps): JSX.Element => {
  const [sliderVals, setSliderVals] = useState<[number, number]>([1, 100]);

  function setLeftSliderVal(newVal: number): void {
    setSliderVals([newVal, sliderVals[1]]);
  }

  function setRightSliderVal(newVal: number): void {
    setSliderVals([sliderVals[0], newVal]);
  }

  function buildScoreQuery() {
    submitQuery({
      type: "score",
      sq: sliderVals,
    });
  }

  return (
    <div className="grid grid-rows-2 justify-items-center gap-3 sm:gap-5 md:gap-7 lg:gap-8">
      <DoubleSlider
        sliderVals={sliderVals}
        updateSliderVals={[setLeftSliderVal, setRightSliderVal]}
      ></DoubleSlider>
      <SubmitButton submit={buildScoreQuery}></SubmitButton>
    </div>
  );
};

export default SearchForm;
