import React, { FC } from "react";
import Link from "next/link";

interface NavbarLinksProps {
  textColorClass: string;
}

const NavbarLinks: FC<NavbarLinksProps> = ({ textColorClass }): JSX.Element => {
  const commonClasses = "px-1 xs:px-4 sm:px-2 xl:mx-6 hover:scale-105";
  return (
    <div
      className={
        "absolute h-10 xs:h-14 mt-2 flex items-center top-0 right-0 text-center text-lg font-Barlow " +
        "sm:h-20 sm:mt-0 sm:text-sm " +
        "md:h-24 md:text-base " +
        "lg:h-28 lg:text-lg lg:right-2 " +
        "xl:text-xl xl:right-4 " +
        textColorClass
      }
    >
      <Link href="/about">
        <a href="" className={commonClasses}>
          About
        </a>
      </Link>
      <Link href="/contact">
        <a href="" className={"mr-1 xs:mr-2 sm:mr-0.5 " + commonClasses}>
          Contact
        </a>
      </Link>
    </div>
  );
};

export default NavbarLinks;
