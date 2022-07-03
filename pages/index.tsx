import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SearchHome from "../components/SearchHome";

import { useState } from "react";

interface searchState {
  selectedOption: string;
  sliderValues: [number, number];
}

const Home: NextPage = () => {
  const [searchState, setSearchState] = useState<searchState>({
    selectedOption: "Professor",
    sliderValues: [0, 100], // tuple
  });

  function updateSelectedOption(newOption: string): void {
    const stateCopy = { ...searchState };
    stateCopy.selectedOption = newOption;
    setSearchState(stateCopy);
  }

  function updateSliderVal(index: number, newVal: number): void {
    const stateCopy = { ...searchState };
    stateCopy.sliderValues[index] = newVal;
    setSearchState(stateCopy);
  }

  const { selectedOption, sliderValues } = searchState;
  return (
    <div className={styles.container}>
      <Head>
        <title>ProfesScore</title>
      </Head>

      <main className="h-screen w-screen flex justify-center bg-white">
        <SearchHome
          selectedOption={selectedOption}
          updateSelectedOption={updateSelectedOption}
          sliderVals={sliderValues}
          updateSliderVals={updateSliderVal}
        ></SearchHome>
      </main>
    </div>
  );
};

export default Home;
