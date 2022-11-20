import { useState } from "react";
import Link from "next/link";
import { SearchQuery, SearchType } from "../../../types";
import DropDownMenu from "./DropDownMenu";
import SearchForm from "../SearchForm";
import Logo from "../Logo";
import NavbarLinks from "../AccessoryLinks";
import clsx from "clsx";

interface NavbarProps {
  initialStateQuery?: SearchQuery;
}

const Navbar = ({ initialStateQuery }: NavbarProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SearchType>(
    initialStateQuery?.type ? initialStateQuery.type : "professor"
  );

  function updateSelectedOption(newOption: SearchType): void {
    setSelectedOption(newOption);
  }

  return (
    <>
      <div
        className={clsx(
          "relative",
          "z-10",
          "top-0",
          "flex",
          "flex-col",
          "bg-brandAmber",
          "sm:flex-row"
        )}
      >
        <div
          className={clsx(
            "w-1/2",
            "mt-2",
            "ml-2",
            "pt-1.5",
            "px-1.5",
            "rounded-t-xl",
            "bg-white",
            "sm:absolute",
            "sm:w-2/12",
            "sm:h-full",
            "sm:pt-6",
            "sm:rounded-xl",
            "md:mt-3",
            "md:ml-3",
            "md:pt-7",
            "lg:pt-8",
            "2xl:pt-6",
            "2xl:max-w-sm"
          )}
        >
          <Link href="/">
            <a>
              <Logo></Logo>
            </a>
          </Link>
        </div>
        <div
          className={
            // group for <p>OR</p> hover
            clsx(
              "group",
              "w-screen",
              "max-h-16",
              "hover:max-h-96",
              "pt-3",
              "pb-2",
              "bg-brandAmber",
              "transition-all",
              "ease-in-out",
              "duration-300",
              "delay-100",
              "flex",
              "justify-center",
              "overflow-clip",
              "sm:pb-5",
              "sm:pt-6",
              "sm:max-h-20",
              "md:pb-7",
              "md:pt-7",
              "md:max-h-24",
              "lg:pb-8",
              "lg:pt-9",
              "lg:max-h-28"
            )
          }
        >
          <div className={clsx("w-full", "flex", "justify-center")}>
            <div
              className={clsx(
                "ml-2",
                "mr-1",
                "sm:mx-0.5",
                "md:mx-1",
                "lg:mx-2"
              )}
            >
              <DropDownMenu
                selectedOption={selectedOption}
                updateSelectedOption={updateSelectedOption}
              ></DropDownMenu>
            </div>
            <div
              className={clsx(
                "w-full",
                "sm:w-6/12",
                "md:w-5/12",
                "2xl:w-4/12",
                "ml-1",
                "mr-2",
                "sm:mx-0.5",
                "md:mx-1",
                "lg:mx-2"
              )}
            >
              <SearchForm
                searchType={selectedOption}
                showOrOnHover={true}
              ></SearchForm>
            </div>
          </div>
          <NavbarLinks extraClasses="text-white"></NavbarLinks>
        </div>
      </div>
    </>
  );
};

export default Navbar;
