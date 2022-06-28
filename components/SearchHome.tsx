import React, { FC } from "react";
import SearchForm from "./SearchForm";
import SearchTypeTab from "./SearchTypeTab";

const SearchHome: FC = (): JSX.Element => {
  return (
    <>
    
      <div className="w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12">
        <div className="flex">
          <SearchTypeTab
            typeText="Professor"
            isSelected={false}
          ></SearchTypeTab>
          <SearchTypeTab typeText="Course" isSelected={true}></SearchTypeTab>
          <SearchTypeTab typeText="Rating" isSelected={false}></SearchTypeTab>
        </div>
        <div className="w-full rounded-b-xl bg-brand-amber flex items-center h-20 sm:h-24 md:h-28 lg:h-32 ">
          <SearchForm searchType="Professor"></SearchForm>
        </div>
      </div>
    </>
  );
};

export default SearchHome;
