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
          {"ProfesScore was designed and developed by "}
          <strong>Charles O&apos;Hanlon</strong>
          {". "}
          <strong>Michael Lavery</strong>
          {" supplied the web-scraped grade and rating data. "}
          <strong>Sulphine Susie</strong>
          {" designed the logo and inspired the user interface. "}
        </ContainerText>
        <ContainerText title={"Charles O'Hanlon"}>
          {"Github: "}
          <ContainerLink href="https://github.com/charlescohanlon"></ContainerLink>
          {"\nLinkedin: "}
          <ContainerLink href="https://www.linkedin.com/in/charlescohanlon"></ContainerLink>
        </ContainerText>
        <ContainerText title={"Michael Lavery"}>
          {"Github: "}
          <ContainerLink href="https://github.com/thavens"></ContainerLink>
          {"\nLinkedin: "}
          <ContainerLink href="https://www.linkedin.com/in/michael-lavery-446510209/"></ContainerLink>
        </ContainerText>
        <ContainerText title={"Sulphine Susie Odio"}>
          {"Linkedin: "}
          <ContainerLink href="www.linkedin.com/in/michael-lavery-446510209"></ContainerLink>
          {"\nPersonal Site: "}
          <ContainerLink href="https://ssodio.github.io/"></ContainerLink>
        </ContainerText>
      </ResultScrollView>
    </main>
  );
};

export default Contact;
