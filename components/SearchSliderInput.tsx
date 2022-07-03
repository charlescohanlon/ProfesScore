import React, { FC } from "react";

interface SearchGenericInputProps {
  defaultVal: number;
  inputRef: React.RefObject<HTMLInputElement>;
  outputRef: React.RefObject<HTMLInputElement>;
}

const SearchSliderInput: FC<SearchGenericInputProps> = ({
  defaultVal,
  inputRef,
  outputRef,
}): JSX.Element => {
  return (
    <input
      ref={inputRef}
      type="text"
      onKeyDown={({ key, currentTarget }) =>
        key === "Enter"
          ? (outputRef.current!.value = currentTarget.value)
          : null
      }
      defaultValue={defaultVal}
      className={
        "w-10 sm:w-14 lg:w-20 py-2 rounded-full font-Barlow text-brandGray bg-white text-center hover:shadow-inputShadow focus:outline-none text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl"
      }
    />
  );
};

export default SearchSliderInput;
