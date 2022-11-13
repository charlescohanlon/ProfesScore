import ProfessorCard from "./ProfessorCard";
import CourseGroup from "./CourseGroup";
import Message from "./Message";
import { isProfessorPreview, queryToParamStr } from "../../utils";
import ResultScrollView from "../ResultScrollView";
import { Previews, SearchQuery } from "../../../types";
import { useEffect, useRef, useState } from "react";

interface DisplayContainerProps {
  query: SearchQuery;
  searchResults: Previews;
}

const DisplayContainer = ({
  query,
  searchResults,
}: DisplayContainerProps): JSX.Element => {
  const [displayARatio, setDisplayARatio] = useState<boolean>(true);
  const [displayRating, setDisplayRating] = useState<boolean>(true);

  const lastResults = useRef<Previews>();
  const [currentResults, setCurrentResults] = useState<Previews>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  useEffect(() => {
    const isMounting = searchResults !== lastResults.current;
    if (isMounting) {
      console.log("mounting...");
      lastResults.current = searchResults;
      setCurrentResults(searchResults);
      setPageNum(1);
      setNoMore(false);
    }
  });
  console.log("# results", currentResults.length);

  const observer = useRef<IntersectionObserver>();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noMore, setNoMore] = useState<boolean>(false);
  function handleObserver(ref: HTMLDivElement) {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (!entries[0].isIntersecting || isLoading || noMore) return;
      setIsLoading(true);
      console.log("loading...");
      const url = `/api/load-more?page=${pageNum}&` + queryToParamStr(query);
      const res = await fetch(url);
      const resJSON = await res.json();
      const results = resJSON.results;
      if (results.length === 0) setNoMore(true);
      else {
        setCurrentResults([...currentResults, ...results]);
        setPageNum(pageNum + 1);
      }
      setIsLoading(false);
    });
    if (ref) observer.current.observe(ref);
  }

  const collapseAtWidth = 640;
  const [collapseNumGrades, setCollapseNumGrades] = useState<boolean>(false);
  useEffect(() => {
    setCollapseNumGrades(window.innerWidth < collapseAtWidth);
    window.addEventListener("resize", () =>
      setCollapseNumGrades(window.innerWidth < collapseAtWidth)
    );
  }, []);

  function toggleARatio() {
    setDisplayARatio(!displayARatio);
  }

  function toggleDisplayRating() {
    setDisplayRating(!displayRating);
  }

  if (!searchResults) setError(true);

  let displayChildren: JSX.Element;
  if (error) {
    displayChildren = (
      <Message>There was an error processing your request.</Message>
    );
  } else if (searchResults.length === 0) {
    displayChildren = (
      <Message>
        Looks like your query did not produce any results. Try something else.
      </Message>
    );
  } else {
    displayChildren = (
      <>
        {currentResults.map((elm, idx) => {
          return (
            <div
              key={idx}
              className={"mb-4 " + "sm:mb-5 " + "md:mb-6 " + "lg:mb-7"}
            >
              {isProfessorPreview(elm) ? (
                <ProfessorCard
                  ratioState={{ displayARatio, toggleARatio }}
                  numGradeState={{
                    collapseNumGrades,
                    displayRating,
                    toggleDisplayRating,
                  }}
                  profPreview={elm}
                  deptWide={true}
                  showInfo={idx === 0}
                  handleObserver={
                    idx === currentResults.length - 1
                      ? handleObserver
                      : undefined
                  }
                ></ProfessorCard>
              ) : (
                <CourseGroup
                  ratioState={{ displayARatio, toggleARatio }}
                  numGradeState={{
                    collapseNumGrades,
                    displayRating,
                    toggleDisplayRating,
                  }}
                  courseRes={elm}
                  isFirstGroup={idx === 0}
                  handleObserver={
                    idx === currentResults.length - 1
                      ? handleObserver
                      : undefined
                  }
                ></CourseGroup>
              )}
            </div>
          );
        })}
        {isLoading ? <Message>Loading...</Message> : <></>}
      </>
    );
  }
  return <ResultScrollView>{displayChildren}</ResultScrollView>;
};

export default DisplayContainer;
