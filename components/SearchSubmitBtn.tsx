import React, { FC } from "react";

const SearchSubmitBtn: FC = (): JSX.Element => {
  return (
    <button
      className={
        "w-fit px-5 py-2 border border-white rounded-full bg-brandAmber text-white" +
        " hover:bg-white hover:text-brandAmber text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl"
      }
    >
      Search
    </button>
  );
};

export default SearchSubmitBtn;
