import { FC } from "react";
import { SearchSubmitProps } from "./SearchForm";
import SearchBar from "./SearchBar";

const ProfessorForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
  return (
    <div className="flex justify-center">
      <SearchBar
        submit={submitQuery}
        placeholderText="Professor Name"
      ></SearchBar>
    </div>
  );
};

export default ProfessorForm;
