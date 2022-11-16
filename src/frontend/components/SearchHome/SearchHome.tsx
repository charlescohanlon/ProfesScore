import { useState } from "react";
import SearchForm from "../SearchForm";
import Logo from "../Logo";
import { SearchType } from "../../../types";
import { capitalize1stLetter } from "../../utils";
import clsx from "clsx";

const SearchHome = (): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SearchType>("professor");

  function updateSelectedOption(newOption: SearchType): void {
    setSelectedOption(newOption);
  }

  return (
    <div className="w-full">
      <div className="m-5 h-fit">
        <div className="relative">
          <Logo></Logo>
          <img
            src="DAC_Logo_Black-Centered.png"
            alt="De Anza College Logo"
            className={
              "z-0 absolute w-16 right-0 -bottom-2 translate-x-2 " +
              "sm:w-20 sm:translate-x-3 " +
              "md:w-24 md:translate-x-4 " +
              "lg:-bottom-3 lg:w-28 lg:translate-x-5"
            }
          />
        </div>
      </div>
      <div className="flex">
        {(
          ["professor", "course", "score"] as [
            SearchType,
            SearchType,
            SearchType
          ]
        ).map((option: SearchType) => (
          <SearchTypeTab
            key={option}
            typeText={option}
            isSelected={option == selectedOption}
            updateSelectedOption={updateSelectedOption}
          ></SearchTypeTab>
        ))}
      </div>
      <div className="w-full h-fit rounded-b-xl bg-brandAmber p-4 sm:p-8 md:p-9 lg:p-10">
        <SearchForm searchType={selectedOption}></SearchForm>
      </div>
    </div>
  );
};

interface FormTypeTabsProps {
  typeText: SearchType;
  isSelected: boolean;
  updateSelectedOption(type: SearchType): void;
}

const SearchTypeTab = ({
  typeText,
  isSelected,
  updateSelectedOption,
}: FormTypeTabsProps): JSX.Element => {
  return (
    <button
      className={clsx(
        isSelected
          ? "bg-brandAmber text-white text "
          : "bg-white text-brandAmber opacity-75 ",
        "w-1/3",
        "px-2",
        "py-1",
        "rounded-t-lg",
        "border-4",
        "border-spacing-0",
        "border-brandAmber",
        "text-center",
        "select-none",
        "font-Barlow",
        "font-bold",
        "text-sm",
        "sm:text-base",
        "md:text-lg",
        "lg:text-xl",
        "xl:text-2xl",
        "cursor-pointer"
      )}
      onClick={() => updateSelectedOption(typeText)}
    >
      <p className={isSelected ? "" : "hover:scale-105"}>
        {capitalize1stLetter(typeText)}
      </p>
    </button>
  );
};

export default SearchHome;
