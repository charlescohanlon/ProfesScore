import React, { FC } from "react";
import internal from "stream";

interface SearchInputProps {
  placeholderText: string;
  width: number;
}

const SearchInput: FC<SearchInputProps> = ({
  placeholderText,
  width,
}): JSX.Element => {
  return (
    <input
      type="text"
      placeholder={placeholderText}
      className={
        "w-" +
        width +
        " px-5 py-2 rounded-full font-Barlow text-placholder-gray bg-white focus:outline-none text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl"
      }
    />
  );
};

export default SearchInput;
