import React, { FC } from "react";
import { useRouter } from "next/router";

interface SearchBarProps {
  placeholderText: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholderText }) => {
  const router = useRouter();

  function submitQuery() {
    router.push("/results");
  }

  return (
    <div className="relative w-full rounded-full hover:shadow-inputShadow">
      <div className="absolute h-full flex justify-center items-center w-11 lg:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-brandGray h-4 lg:h-6 lg:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        onKeyDown={({ key }) => (key === "Enter" ? submitQuery() : null)}
        placeholder={placeholderText}
        className={
          "w-full pl-10 pr-5 py-2 rounded-full font-Barlow text-brandGray bg-white " +
          "focus:outline-none text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
        }
      />
    </div>
  );
};

export default SearchBar;
