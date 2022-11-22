import clsx from "clsx";
import { useContext } from "react";
import { InfoPopupContext } from "../../pages/_app";

interface InfoPopupProps {
  addtlClasses?: string;
  children: string | JSX.Element | Array<JSX.Element | string>;
  isUpsideDown?: boolean;
}

const InfoPopup = ({
  addtlClasses,
  children,
  isUpsideDown,
}: InfoPopupProps): JSX.Element => {
  const { isShowing, hide } = useContext(InfoPopupContext);
  return (
    <div
      className={clsx(
        isShowing ? "" : "hidden",
        "static",
        "z-40",
        "h-fit",
        "overflow-visible",
        "flex",
        "flex-col",
        "items-center",
        addtlClasses
      )}
    >
      <div
        className={clsx(
          "static",
          "z-20",
          "w-full",
          "p-3.5",
          "md:p-3",
          "bg-white",
          "border-2",
          "border-brandAmber",
          "text-brandAmber",
          "rounded-lg",
          "font-bold",
          "text-sm",
          "sm:text-base",
          "antialiased"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={hide}
          className={clsx(
            "absolute",
            "cursor-pointer",
            "top-1",
            "right-1",
            "h-5",
            "w-5",
            "text-brandAmber",
            "hover:scale-125"
          )}
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
        className={clsx(
          "absolute",
          isUpsideDown ? "-top-2" : "-bottom-2",
          "h-5",
          "w-5",
          "rotate-45",
          "z-10",
          "bg-brandAmber"
        )}
      ></div>
    </div>
  );
};

export default InfoPopup;
