import { useState } from "react";

interface SliderProps {
  sliderVals: [number, number];
  updateSliderVals: [(value: number) => void, (value: number) => void]; // [left, right]
}

const SearchSlider = ({
  sliderVals,
  updateSliderVals,
}: SliderProps): JSX.Element => {
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
  const activeInputAttributes: string = `
    border-width: 5px;
  `;
  const sliderThumbSelectors: string = `
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${inputAttributes}
    }
    input[type=range]:active::-webkit-slider-thumb {
      ${activeInputAttributes}
    }
    input[type=range]::-moz-range-thumb {
      ${inputAttributes}
    }
    input[type=range]:active::-moz-range-thumb {
      ${activeInputAttributes}
    }
    input[type=range]::-ms-thumb {
      ${inputAttributes}
    }
    input[type=range]:active::-ms-thumb {
      ${activeInputAttributes}
    }
  `;
  const sliderClasses: string =
    "rounded-full bg-white row-start-1 col-start-1 appearance-none pointer-events-none";
  return (
    <div className="w-full flex justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
      <SliderInput
        value={sliderVals[0]}
        updateVal={updateSliderVals[0]}
      ></SliderInput>
      <div className="w-full grid grid-cols-1 grid-rows-1 items-center">
        <style>{sliderThumbSelectors}</style>
        <input
          type="range"
          className={"h-2 " + sliderClasses}
          min={1}
          max={100}
          value={sliderVals[0]}
          onChange={({ target }) => {
            if (target.valueAsNumber < sliderVals[1])
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
            if (target.valueAsNumber > sliderVals[0])
              updateSliderVals[1](target.valueAsNumber);
          }}
        />
      </div>
      <SliderInput
        value={sliderVals[1]}
        updateVal={updateSliderVals[1]}
      ></SliderInput>
    </div>
  );
};

interface SliderInputProps {
  value: number;
  updateVal(value: number): void;
}

const SliderInput = ({ value, updateVal }: SliderInputProps): JSX.Element => {
  return (
    <input
      type="text"
      value={value > 100 ? 100 : value}
      onChange={({ target: { value } }) =>
        value === "" || (/^[0-9\b]+$/.test(value) && value.length <= 3) // uses regex to enforce digit-only input
          ? updateVal(parseInt(value))
          : null
      }
      className={
        "w-14 sm:w-14 lg:w-20 py-2 rounded-full font-Barlow text-brandGray bg-white text-center " +
        "hover:shadow-inputShadow focus:outline-none text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
      }
    />
  );
};

export default SearchSlider;
