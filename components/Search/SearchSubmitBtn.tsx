import React, { FC } from "react";
const SearchSubmitBtn: FC = (): JSX.Element => {
  return (
    <input
      type="button"
      value="Search"
      className={
        "px-10 py-1 border-2 border-white rounded-full bg-brandAmber text-white font-bold" +
        " hover:bg-white hover:text-brandAmber text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl"
      }
    />
  );
};
export default SearchSubmitBtn;
