import { NextPage } from "next";
import Navbar from "../frontend/components/Navbar/Navbar";
import ResultScrollView from "../frontend/components/ResultScrollView";
import {
  ContainerLink,
  ContainerText,
} from "../frontend/components/DisplayContainer";

const Contact: NextPage = (): JSX.Element => {
  return (
    <main className="h-screen w-screen overflow-hidden bg-white">
      <Navbar></Navbar>
      <ResultScrollView>
        <ContainerText title={"Contact"}>
          {"ProfesScore, the web app, was written by "}
          <strong>Charles O&apos;Hanlon</strong>
          {", a student at De Anza College. "}
          <strong>Sulphine Susie</strong>
          {" designed the logo and inspired the user interface. "}
          <strong>Michael Lavery</strong>
          {" supplied the web-scraped grade and rating data."}
        </ContainerText>
        <ContainerText title={"Charles O'Hanlon"}>
          {"Github: "}
          <ContainerLink href="https://github.com/charlescohanlon"></ContainerLink>
          {"\nLinkedin: "}
          <ContainerLink href="www.linkedin.com/in/charlescohanlon"></ContainerLink>
        </ContainerText>
      </ResultScrollView>
    </main>
  );
};

export default Contact;
