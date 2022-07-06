import React, { FC } from "react";

interface SearchGenericInputProps {
  placeholderText: string;
  submitFunc: Function;
}

const SearchGenericInput: FC<SearchGenericInputProps> = ({
  placeholderText,
  submitFunc,
}): JSX.Element => {
  return (
    <input
      type="text"
      placeholder={placeholderText}
      className={
        "w-full px-5 py-2 rounded-full font-Barlow text-brandGray bg-white hover:shadow-inputShadow" +
        " focus:outline-none text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl"
      }
      onKeyDown={({ key }) => {
        key === "Enter" ? submitFunc() : null;
      }}
    />
  );
};

export default SearchGenericInput;
