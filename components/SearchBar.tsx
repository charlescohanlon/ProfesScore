import React, { FC } from "react";

interface SearchBarProps {
  placeholderText: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholderText }) => {
  return (
    <div className="relative w-3/4 m-auto">
      <div className="absolute h-full flex justify-center items-center w-11 lg:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-black h-4 lg:h-6 lg:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        placeholder={placeholderText}
        className="w-full pl-10 pr-5 py-2 rounded-full font-Barlow text-placholder-gray bg-white focus:outline-none text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl"
      />
    </div>
  );
};

export default SearchBar;
