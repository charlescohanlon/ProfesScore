import React, { FC } from "react";

interface SearchGenericInputProps {
  placeholderText: string;
  getValue: Function;
  submit: Function;
}

const SearchGenericInput: FC<SearchGenericInputProps> = ({
  placeholderText,
  getValue,
  submit,
}): JSX.Element => {
  return (
    <input
      type="text"
      placeholder={placeholderText}
      onKeyDown={({ key }) => {
        key === "Enter" ? submit() : null;
      }}
      onChange={({ target }) => getValue((target as HTMLInputElement).value)}
      className={
        "w-full px-5 py-2 rounded-full font-Barlow text-brandGray bg-white hover:shadow-inputShadow " +
        "focus:outline-none text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
      }
    />
  );
};

export default SearchGenericInput;
