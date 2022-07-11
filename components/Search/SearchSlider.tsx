import React, { FC, useRef } from "react";
import SearchSliderInput from "./SearchSliderInput";

interface SliderProps {
  sliderVals: [string, string];
  updateSliderVals: [Function, Function]; // [left, right]
}

const SearchSlider: FC<SliderProps> = ({
  sliderVals,
  updateSliderVals,
}): JSX.Element => {
  const inputAttributes: string = `
    box-sizing: border-box; 
    border: 7px solid white;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 100%;
    background-color: #FBB03B;                  /* brandAmber */
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);  /* inputShadow */
    pointer-events: auto;
  `;
  const hoverInputAttributes: string = `
    border-width: 5px;
  `;
  const sliderThumbSelectors: string = `
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${inputAttributes}
    }
    input[type=range]:hover::-webkit-slider-thumb {
      ${hoverInputAttributes}
    }
    input[type=range]::-moz-range-thumb {
      ${inputAttributes}
    }
    input[type=range]:hover::-moz-range-thumb {
      ${hoverInputAttributes}
    }
    input[type=range]::-ms-thumb {
      ${inputAttributes}
    }
    input[type=range]:hover::-ms-thumb {
      ${hoverInputAttributes}
    }
  `;
  const sliderClasses: string =
    "rounded-full bg-white row-start-1 col-start-1 appearance-none pointer-events-none";
  return (
    <div className="w-full flex justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
      <SearchSliderInput
        value={sliderVals[0]}
        updateVal={updateSliderVals[0]}
      ></SearchSliderInput>
      <div className="w-full grid grid-cols-1 grid-rows-1 items-center">
        <style>{sliderThumbSelectors}</style>
        <input
          type="range"
          className={"h-2 " + sliderClasses}
          min={1}
          max={100}
          value={sliderVals[0]}
          onChange={({ target }) => {
            updateSliderVals[0](target.valueAsNumber);
          }}
        />
        <input
          type="range"
          className={"h-0 z-10 " + sliderClasses}
          min={1}
          max={100}
          value={sliderVals[1]}
          onChange={({ target }) => {
            updateSliderVals[1](target.valueAsNumber);
          }}
        />
      </div>
      <SearchSliderInput
        value={sliderVals[1]}
        updateVal={updateSliderVals[1]}
      ></SearchSliderInput>
    </div>
  );
};

export default SearchSlider;
