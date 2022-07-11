import React, { FC } from "react";

interface SearchSubmitBtnProps {
  submitFunc: Function;
}

const SearchSubmitBtn: FC<SearchSubmitBtnProps> = ({
  submitFunc,
}): JSX.Element => {
  return (
    <input
      type="button"
      value="Search"
      onClick={() => submitFunc()}
      className={
        "px-10 py-1 rounded-full bg-brandAmber text-white font-bold " +
        "hover:bg-white hover:text-brandAmber text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
      }
    />
  );
};
export default SearchSubmitBtn;
