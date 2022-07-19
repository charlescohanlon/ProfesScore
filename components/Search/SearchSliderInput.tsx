import React, { FC } from "react";

interface SearchGenericInputProps {
  value: string;
  updateVal: Function;
}

const SearchSliderInput: FC<SearchGenericInputProps> = ({
  value,
  updateVal,
}): JSX.Element => {
  return (
    <input
      type="text"
      value={parseInt(value) > 100 ? 100 : value}
      onChange={({ target: { value } }) =>
        value === "" || (/^[0-9\b]+$/.test(value) && value.length <= 3) // uses regex to enforce digit-only input
          ? updateVal(value)
          : null
      }
      className={
        "w-14 sm:w-14 lg:w-20 py-2 rounded-full font-Barlow text-brandGray bg-white text-center " +
        "hover:shadow-inputShadow focus:outline-none text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
      }
    />
  );
};

export default SearchSliderInput;
