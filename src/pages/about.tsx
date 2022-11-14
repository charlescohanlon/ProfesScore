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
          Note: This is the alpha release of ProfesScore version 0.1.0. The site
          may be unstable.
        </h6>
        <ContainerText
          title={<Logo></Logo>}
          addtTitleClasses={"w-40 " + "md:w-48 " + "xl:w-56"}
        >
          ProfesScore gives students insight into professor metrics. With a
          simple search, you can see a professor&apos;s grade ratios, total
          number of grades given, quality rating, and overall score. There are
          three methods for searching: by professor, by course, or by rating.
          When looking at search results, click on the A&apos;s ratio to see the
          passing grade ratio instead. On mobile, tap the rating to switch to
          total grades. Disclaimer: the current grade data comes from before the
          pandemic, but it&apos;s all we have.
        </ContainerText>
        <ContainerText title={"By Professor"}>
          When you search by professor, the data shown is
          department-wide. The ratio and score are from grade data from every
          class taught by that professor. This is best for estimating how a
          professor will perform teaching a course they&apos;ve never taught
          before, or for getting a general feel for what kind of professor they
          are.
        </ContainerText>
        <ContainerText title={"By Course"}>
          When you search by course, the data shown for each professor are
          specific to that course. You can search by either course title (e.g.,
          CIS 22C) or department name (e.g., Computer Information Systems).
        </ContainerText>
        <ContainerText title={"By Rating"}>
          Searching by rating will bring up department-wide data for professors
          whose scores fall between the input range.
        </ContainerText>
        <ContainerText title={"The Score"}>
          The overall score is a comprehensive metric that considers the A&apos;s
          grade ratio, quality rating, total number of grades, the level of
          difficulty, &quot;the would take again&quot; percentage, and the
          number of ratings (from ratemyprofessors).
        </ContainerText>
        <ContainerText>
          {"The grade data is from "}
          <ContainerLink href={tcLink}>Transfer Camp</ContainerLink>
          {" and the Quality Rating data is from "}
          <ContainerLink href={rmpLink}>Rate My Professors</ContainerLink>.
          {". The web app was inspired by a project by Michael Lavory found "}
          <ContainerLink href={michaelGithubLink}>here</ContainerLink>.
        </ContainerText>
      </ResultScrollView>
    </main>
  );
};

export default About;
