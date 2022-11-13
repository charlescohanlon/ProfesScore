import SearchHome from "../frontend/components/SearchHome";
import NavbarLinks from "../frontend/components/AccessoryLinks";
import InfoPopup from "../frontend/components/InfoPopup";
import { useState } from "react";
import { ContainerLink } from "../frontend/components/DisplayContainer";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="h-screen w-screen bg-white">
        <NavbarLinks extraClasses="text-brandGray"></NavbarLinks>
        <div className={"w-full flex justify-center relative top-1/4 "}>
          <div
            className={
              "w-10/12 min-h-[26.5rem] " +
              "sm:w-9/12 " +
              "md:w-8/12 " +
              "lg:w-7/12 " +
              "xl:w-6/12 " +
              "2xl:w-5/12"
            }
          >
            <SearchHome></SearchHome>
          </div>
        </div>
        <div
          className={
            "absolute right-1/2 translate-x-1/2 bottom-0 md:bottom-10 " +
            "lg:right-48 lg:bottom-24 "
          }
        >
          <InfoPopup extraClasses="w-64 sm:w-72">
            See the number of &quot;A&quot; grades to all grades (the A&apos;s
            ratio) or passing grade ratio, quality rating, and overall score for
            a professor. Either department-wide when searching by professor or
            for a specific class when searching by course. See{" "}
            <ContainerLink href="/about">about</ContainerLink> for more.
          </InfoPopup>
        </div>
      </main>
      <footer className="w-screen h-20 bg-gray-50 flex justify-center">
        <p className="mt-5">© Charles O&apos;Hanlon</p>
      </footer>
    </>
  );
};

export default Home;
