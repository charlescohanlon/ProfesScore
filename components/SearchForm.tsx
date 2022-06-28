import React, { FC } from "react";
import SearchBar from "./SearchBar";
import SearchInput from "./SearchInput";

interface QueryProps {
  searchType: string;
}

const SearchForm: FC<QueryProps> = ({ searchType }): JSX.Element => {
  let placeholderText = "Enter Professor's Name";
  

  return (
    <SearchBar placeholderText={placeholderText}></SearchBar>
  );
};

export default SearchForm;
