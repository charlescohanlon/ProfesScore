import type { NextPage } from "next";
import Head from "next/head";
import SearchHome from "../components/Search/SearchHome";

import ViewResults from "./search"; // for dev purposes

import { useState } from "react";

export interface SearchState {
  selectedOption: string;
  sliderValues: [string, string];
}

const Home: NextPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    selectedOption: "Professor",
    sliderValues: ["1", "100"],
  });

  function updateSelectedOption(newOption: string): void {
    const stateCopy = { ...searchState };
    stateCopy.selectedOption = newOption;
    setSearchState(stateCopy);
  }

  function updateLeftSliderVal(newVal: string): void {
    const stateCopy = { ...searchState };
    stateCopy.sliderValues[0] = newVal;
    setSearchState(stateCopy);
  }

  function updateRightSliderVal(newVal: string): void {
    const stateCopy = { ...searchState };
    stateCopy.sliderValues[1] = newVal;
    setSearchState(stateCopy);
  }

  return (
    <div>
      <Head>
        <title>ProfesScore</title>
      </Head>

      <main className="h-screen w-screen bg-white">
        <div className="flex flex-col items-center">
          <SearchHome
            selectedOption={searchState.selectedOption}
            updateSelectedOption={updateSelectedOption}
            sliderVals={searchState.sliderValues}
            updateSliderVals={[updateLeftSliderVal, updateRightSliderVal]}
          ></SearchHome>
        </div>

        {/* <ViewResults></ViewResults> */}
      </main>
    </div>
  );
};

export default Home;
