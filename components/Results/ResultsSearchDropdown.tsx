import React, { FC, useState, useRef, useEffect } from "react";
import { SearchType } from "../Search/SearchHome";

interface ResultsSearchDropdownProps {
  selectedOption: SearchType;
  updateSelectedOption: Function;
}

const ResultsSearchDropdown: FC<ResultsSearchDropdownProps> = ({
  selectedOption,
  updateSelectedOption,
}): JSX.Element => {
  const [dropdownIsSelected, setDropdownIsSelected] = useState(false);
  const dropdownRef = useRef<any>(null);

  function toggleDropdown() {
    setDropdownIsSelected(!dropdownIsSelected);
  }

  function deselectDropdown() {
    setDropdownIsSelected(false);
  }

  useEffect(() => {
    function handleNotDropdownClicked({ target }: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        deselectDropdown();
      }
    }
    document.addEventListener("mousedown", handleNotDropdownClicked);
    return () => {
      document.removeEventListener("mousedown", handleNotDropdownClicked); // Unbind the event listener on clean up
    };
  }, [dropdownRef]);

  const dropdown: JSX.Element = (
    <div
      className={
        "absolute w-full left-0.5 border-2 border-brandGray bg-orange-300 flex flex-col " +
        "sm:left-auto sm:w-20 sm:rounded-b-xl " +
        "md:w-24 " +
        "lg:w-28 " +
        "xl:w-32 "
      }
      style={{ marginLeft: "-2px", marginRight: "-2px" }}
    >
      <a
        className="px-0.5 py-2 "
        onClick={() => {
          updateSelectedOption("Professor");
          deselectDropdown();
        }}
      >
        Professor
      </a>
      <a
        className="px-0.5 py-2 border-t-2 border-brandGray"
        onClick={() => {
          updateSelectedOption("Course");
          deselectDropdown();
        }}
      >
        Course
      </a>
      <a
        className="px-0.5 py-2 border-t-2 border-brandGray"
        onClick={() => {
          updateSelectedOption("Rating");
          deselectDropdown();
        }}
      >
        Rating
      </a>
    </div>
  );

  return (
    <div
      ref={dropdownRef}
      className="text-brandGray text-center text-xl sm:text-xs md:text-sm lg:text-lg xl:text-xl cursor-pointer select-none"
    >
      <a
        id="SearchDropdown"
        onClick={() => toggleDropdown()}
        className={
          "w-12 h-12 flex justify-center items-center bg-orange-300 border-2 border-brandGray " +
          "sm:w-20 sm:h-10 " +
          "md:w-24 md:h-11 " +
          "lg:w-28 lg:h-12 " +
          "xl:w-32 " +
          (dropdownIsSelected ? "rounded-t-xl" : "rounded-xl")
        }
        style={{ margin: "-2px" }} // to accomadate border
      >
        <p className="hidden sm:contents">{selectedOption}</p>
        <div className="">
          {dropdownIsSelected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </a>
      {dropdownIsSelected ? dropdown : null}
    </div>
  );
};

export default ResultsSearchDropdown;
