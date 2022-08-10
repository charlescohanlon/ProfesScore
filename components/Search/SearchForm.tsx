import React, { FC } from "react";
import { SearchType } from "./SearchHome";
import { useRouter } from "next/router";
import ProfessorForm from "./SearchProfessorForm";
import CourseForm from "./SearchCourseForm";
import RatingForm from "./SearchRatingForm";

export interface SearchSubmitProps {
  submitQuery: Function;
}

interface SearchFormProps {
  searchType: SearchType;
}

const SearchForm: FC<SearchFormProps> = ({ searchType }): JSX.Element => {
  const router = useRouter();
  function submitQuery(query: string) {
    router.push({
      pathname: "/results",
      query: { type: searchType },
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
