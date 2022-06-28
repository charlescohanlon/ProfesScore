import React, { FC } from "react";

interface SearchTypeTabProps {
  typeText: string;
  isSelected: boolean;
}

const SearchTypeTab: FC<SearchTypeTabProps> = ({
  typeText,
  isSelected,
}): JSX.Element => {
  return (
    <a
      className={
        `${
          isSelected ? "bg-brand-amber text-white" : "bg-white text-brand-amber"
        }` +
        "  w-1/3 px-2 py-1 rounded-t-xl border-4 border-spacing-0 border-brand-amber text-center font-Barlow font-bold text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl"
      }
    >
      {typeText}
    </a>
  );
};

export default SearchTypeTab;
