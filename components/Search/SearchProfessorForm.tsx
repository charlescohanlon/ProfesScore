import { FC, useState } from "react";
import { SearchQueryObject, SearchSubmitProps } from "./SearchForm";
import SearchBar from "./SearchBar";

const ProfessorForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
  const [professorVal, setProfessorVal] = useState<string>("");

  function buildQuery() {
    const query: SearchQueryObject = {};
    professorVal.trim() !== "" ? (query.pq = professorVal) : null;
    submitQuery(query);
  }

  return (
    <div className="flex justify-center">
      <SearchBar
        submit={buildQuery}
        getValue={setProfessorVal}
        placeholderText="Professor Name"
      ></SearchBar>
    </div>
  );
};

export default ProfessorForm;
