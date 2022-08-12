import React, { FC } from "react";
import { SearchType } from "../index/SearchHome";
import { useRouter } from "next/router";
import ProfessorForm from "./ProfessorForm";
import CourseForm from "./CourseForm";
import RatingForm from "./RatingForm";

export interface SearchSubmitProps {
  submitQuery: Function;
}

export interface SearchQueryObject {
  pq?: string;
  cq?: string;
  sq?: string;
  rq?: string;
}

interface SearchFormProps {
  searchType: SearchType;
}

const SearchForm: FC<SearchFormProps> = ({ searchType }): JSX.Element => {
  const router = useRouter();
  function submitQuery(query: SearchQueryObject) {
    router.push({
      pathname: "/results",
      query: { type: searchType, ...query },
    });
  }

  return (
    <>
      {searchType == "professor" ? (
        <ProfessorForm submitQuery={submitQuery}></ProfessorForm>
      ) : searchType == "course" ? (
        <CourseForm submitQuery={submitQuery}></CourseForm>
      ) : (
        <RatingForm submitQuery={submitQuery}></RatingForm>
      )}
    </>
  );
};

export default SearchForm;
