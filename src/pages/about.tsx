import React from "react";
import { NextPage } from "next";
import Navbar from "../frontend/components/Navbar/Navbar";
import Logo from "../frontend/components/Logo";
import ResultScrollView from "../frontend/components/ResultScrollView";
import {
  ContainerLink,
  ContainerText,
} from "../frontend/components/DisplayContainer";

const About: NextPage = (): JSX.Element => {
  const tcLink = "https://transfercamp.com/";
  const rmpLink = "https://www.ratemyprofessors.com/";
  const michaelGithubLink = "https://github.com/thavens/EzTransfer";

  return (
    <main className="w-screen h-screen flex flex-col">
      <Navbar></Navbar>
      <ResultScrollView>
        <h6 className="mb-3 text-sm text-center text-gray-500">
          Note: This is the alpha release of Professcore version 0.1.0. The site
          may be unstable as new features are implemented.
        </h6>
        <ContainerText
          title={<Logo></Logo>}
          addtTitleClasses={"w-40 " + "md:w-48 " + "xl:w-56"}
        >
          ProfesScore is a web app that gives students insight into professor
          metrics. With a simple search, you can see a professor&apos;s grade
          ratio, quality rating, and overall score. There are three main methods
          for searching professor data: by professor, by course, or by rating.
        </ContainerText>
        <ContainerText title={"By Professor"}>
          When you search by professor (or rating), the data shown is
          department-wide. The ratio and score are from grade data from every
          class taught by that professor. This information is best for
          estimating how a professor will perform teaching a course they&apos;ve
          never taught before, or for getting a general feel for what kind of
          professor they are.
        </ContainerText>
        <ContainerText title={"By Course"}>
          When you search by course, the ratio and scores shown for each
          professor are specific to that course. The course search form allows
          you to search by either course title (e.g., CIS 22C) or
          subject/department name (e.g., Computer Information Systems).
        </ContainerText>
        <ContainerText title={"By Rating"}>
          Searching by rating will bring up all the professor metrics for
          professors whose scores fall in the entered range.
        </ContainerText>
        <ContainerText title={"The Score"}>
          The overall score is a comprehensive metric that accounts for the
          grade ratio and quality rating. The score also considers the number of
          grades in the ratio, the level of difficulty, &quot;the would take
          again&quot; percentage, and the number of ratings.
        </ContainerText>
        <ContainerText>
          {"The grade data is from "}
          <ContainerLink href={tcLink}>Transfer Camp</ContainerLink>
          {" and the Quality Rating data is from "}
          <ContainerLink href={rmpLink}>Rate My Professor</ContainerLink>.
          {". The website was inspired by a project by Michael Lavory found "}
          <ContainerLink href={michaelGithubLink}>here</ContainerLink>.
        </ContainerText>
      </ResultScrollView>
    </main>
  );
};

export default About;
