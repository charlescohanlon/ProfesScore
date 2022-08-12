import React, { FC } from "react";
import { SearchType } from "./SearchHome";

interface SearchTypeTabProps {
  typeText: SearchType;
  isSelected: boolean;
  updateSelectedOption: Function;
}

const SearchTypeTab: FC<SearchTypeTabProps> = ({
  typeText,
  isSelected,
  updateSelectedOption,
}): JSX.Element => {
  return (
    <a
      className={
        `${
          isSelected
            ? "bg-brandAmber text-white text "
            : "bg-white text-brandAmber "
        }` +
        "w-1/3 px-2 py-1 rounded-t-lg border-4 border-spacing-0 border-brandAmber text-center select-none " +
        "font-Barlow font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer"
      }
      onClick={() => updateSelectedOption(typeText)}
    >
      {typeText}
    </a>
  );
};

export default SearchTypeTab;
