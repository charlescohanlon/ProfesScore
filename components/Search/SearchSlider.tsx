import { stringify } from "querystring";
import React, { FC, useRef } from "react";
import SearchSliderInput from "./SearchSliderInput";

interface SliderProps {
  sliderVals: [number, number];
  updateSliderVals: Function;
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
  const sliderThumbSelectors: string = `
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${inputAttributes}
    }
    input[type=range]::-moz-range-thumb {
      ${inputAttributes}
    }
    input[type=range]::-ms-thumb {
      ${inputAttributes}
    }
  `;
  const sliderClasses: string =
    "rounded-full bg-white row-start-1 col-start-1 appearance-none pointer-events-none";

  // references that connect input values to slider values
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);
  const bottomSliderRef = useRef<HTMLInputElement>(null);
  const topSliderRef = useRef<HTMLInputElement>(null); // top slider has height 0

  return (
    <div className="flex justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
      <SearchSliderInput
        defaultVal={1}
        inputRef={leftInputRef}
        outputRef={bottomSliderRef}
      ></SearchSliderInput>
      <div className="w-full grid grid-cols-1 grid-rows-1 items-center">
        <style>{sliderThumbSelectors}</style>
        <input
          ref={bottomSliderRef}
          type="range"
          min={1}
          max={100}
          defaultValue={1}
          className={"h-2 " + sliderClasses}
          onChange={({ target }) => {
            updateSliderVals(0, target.valueAsNumber);
            leftInputRef.current!.value = `${sliderVals[0]}`; // set val of input to slider val from state
          }}
        />
        <input
          ref={topSliderRef}
          type="range"
          min={1}
          max={100}
          defaultValue={100}
          className={"h-0 z-10 " + sliderClasses}
          onChange={({ target }) => {
            updateSliderVals(1, target.valueAsNumber);
            rightInputRef.current!.value = `${sliderVals[1]}`;
          }}
        />
      </div>
      <SearchSliderInput
        defaultVal={100}
        inputRef={rightInputRef}
        outputRef={topSliderRef}
      ></SearchSliderInput>
    </div>
  );
};

export default SearchSlider;
