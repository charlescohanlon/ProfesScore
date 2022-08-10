import { FC, useState } from "react";
import { SearchSubmitProps, SearchQueryObject } from "./SearchForm";
import SearchSlider from "./SearchSlider";
import SearchSubmitBtn from "./SearchSubmitBtn";

const RatingForm: FC<SearchSubmitProps> = ({ submitQuery }): JSX.Element => {
  const [sliderVals, setSliderVals] = useState<[string, string]>(["1", "100"]);

  function setLeftSliderVal(newVal: string): void {
    setSliderVals([newVal, sliderVals[1]]);
  }

  function setRightSliderVal(newVal: string): void {
    setSliderVals([sliderVals[0], newVal]);
  }

  function buildQuery() {
    const query: SearchQueryObject = {
      range: `${sliderVals[0]}-${sliderVals[1]}`,
    };
    submitQuery(query);
  }

  return (
    <div className="grid grid-rows-2 justify-items-center gap-3 sm:gap-5 md:gap-7 lg:gap-8">
      <SearchSlider
        sliderVals={sliderVals}
        updateSliderVals={[setLeftSliderVal, setRightSliderVal]}
      ></SearchSlider>
      <SearchSubmitBtn submit={buildQuery}></SearchSubmitBtn>
    </div>
  );
};

export default RatingForm;
