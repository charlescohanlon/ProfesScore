import React, { FC } from "react";

interface SearchTypeTabProps {
  typeText: string;
  isSelected: boolean;
  updateSelection: Function;
}

const SearchTypeTab: FC<SearchTypeTabProps> = ({
  typeText,
  isSelected,
  updateSelection,
}): JSX.Element => {
  return (
    <a
      className={
        `${
          isSelected
            ? "bg-brandAmber text-white text"
            : "bg-white text-brandAmber"
        }` +
        "  w-1/3 px-2 py-1 rounded-t-lg border-4 border-spacing-0 border-brandAmber text-center font-Barlow font-bold text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl cursor-pointer"
      }
      onClick={() => updateSelection(typeText)}
    >
      {typeText}
    </a>
  );
};

export default SearchTypeTab;
