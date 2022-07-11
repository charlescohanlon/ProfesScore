import React, { FC } from "react";

interface ResultsSearchDropdownProps {
  selectedOption: string;
  isSelected: boolean;
  toggleMenu: Function;
  linkRef: React.LegacyRef<HTMLAnchorElement>;
}

const ResultsSearchDropdown: FC<ResultsSearchDropdownProps> = ({
  selectedOption,
  isSelected,
  toggleMenu,
  linkRef,
}): JSX.Element => {
  return (
    <div className="absolute right-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
      <a
        ref={linkRef}
        className={
          "h-fit rounded-xl border-solid border-2 border-brandGray bg-brandAmber text-brandGray " +
          "flex items-center p-1.5 sm:p-2"
        }
        style={{ marginTop: "-2px" }} // to accomadate border
        onClick={() => {
          toggleMenu();
        }}
      >
        {selectedOption}
        {isSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </a>
      {isSelected ? <Dropdown></Dropdown> : null}
    </div>
  );
};

const Dropdown: FC = (): JSX.Element => {
  return (
    <div>
      <ul
        className={
          "pt-12 w-full list-none border-solid border-2 border-brandGray bg-brandAmber rounded-xl " +
          "-mt-9 sm:-mt-10 md:-mt-11 lg:-mt-12"
        }
      >
        {["Professor", "Course", "Rating"].map((option) => (
          <div key={option}>
            <hr className="m-auto rounded-full border-brandGray" />
            <li className="my-2 text-brandGray">{option}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ResultsSearchDropdown;
