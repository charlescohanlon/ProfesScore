import ProfessorCard from "./ProfessorCard";
import CourseGroup from "./CourseGroup";
import Message from "./Message";
import { isProfessorPreview, queryToParamStr } from "../../utils";
import ResultScrollView from "../ResultScrollView";
import { Previews, SearchQuery } from "../../../types";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

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

  const [currentResults, setCurrentResults] = useState<Previews>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const lastResults = useRef<Previews>();
  useEffect(() => {
    const isMounting = searchResults !== lastResults.current;
    if (isMounting) {
      lastResults.current = searchResults;
      setCurrentResults(searchResults);
      setPageNum(1);
      setNoMore(false);
    }
  }, [setCurrentResults, searchResults]);

  const observer = useRef<IntersectionObserver>();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noMore, setNoMore] = useState<boolean>(false);

  function handleObserver(ref: HTMLDivElement) {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || isLoading || noMore) return;
        setIsLoading(true);
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
      },
      { rootMargin: "100px 0px 0px 0px" }
    );
    if (ref) observer.current.observe(ref);
  }

  const collapseAtWidth = 640;
  const [collapseNumGrades, setCollapseNumGrades] = useState<boolean>(false);
  useEffect(() => {
    if (!searchResults) setError(true);
    setCollapseNumGrades(window.innerWidth < collapseAtWidth);
    window.addEventListener("resize", () =>
      setCollapseNumGrades(window.innerWidth < collapseAtWidth)
    );
  }, [searchResults]);

  function toggleARatio() {
    setDisplayARatio(!displayARatio);
  }

  function toggleDisplayRating() {
    setDisplayRating(!displayRating);
  }

  if (error)
    return (
      <ResultScrollView>
        <Message>There was an error processing your request.</Message>
      </ResultScrollView>
    );

  if (searchResults?.length === 0) {
    return (
      <ResultScrollView>
        <Message>
          Looks like your query did not produce any results. Try something else.
        </Message>
      </ResultScrollView>
    );
  }

  return (
    <ResultScrollView>
      {currentResults.map((elm, idx) => (
        <div
          key={idx}
          className={clsx("mb-4", "sm:mb-5", "md:mb-6", "lg:mb-7")}
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
                idx === currentResults.length - 1 ? handleObserver : undefined
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
                idx === currentResults.length - 1 ? handleObserver : undefined
              }
            ></CourseGroup>
          )}
          {isLoading && (
            <div className="pb-3">
              <Message>Loading...</Message>
            </div>
          )}
        </div>
      ))}
    </ResultScrollView>
  );
};

export default DisplayContainer;
