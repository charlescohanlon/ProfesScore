import { useState } from "react";

interface InfoPopupProps {
  extraClasses?: string;
  children: string | JSX.Element | Array<JSX.Element | string>;
  isUpsideDown?: boolean;
}

const InfoPopup = ({
  extraClasses,
  children,
  isUpsideDown,
}: InfoPopupProps): JSX.Element => {
  const [isShowing, setIsShowing] = useState<boolean>(true);
  return (
    <div
      className={
        `${
          isShowing ? "" : "hidden"
        } static z-40 h-fit overflow-visible flex flex-col items-center ` +
        extraClasses
      }
    >
      <div
        className={
          "static z-20 w-full p-4 bg-white border-2 border-brandAmber text-brandAmber rounded-lg " +
          "font-bold text-sm sm:text-base antialiased md:p-5 "
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setIsShowing(false)}
          className="absolute cursor-pointer top-1 right-1 h-5 w-5 text-brandAmber hover:scale-125 "
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        {children}
      </div>
      <div
        className={`absolute ${
          isUpsideDown ? "-top-2" : "-bottom-2"
        } h-5 w-5 rotate-45 z-10 bg-brandAmber`}
      ></div>
    </div>
  );
};

export default InfoPopup;
