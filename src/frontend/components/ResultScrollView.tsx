import clsx from "clsx";
interface ResultScrollContainerProps {
  children: JSX.Element | JSX.Element[];
}

const ResultScrollView = ({
  children,
}: ResultScrollContainerProps): JSX.Element => {
  return (
    <div
      className={clsx(
        "h-full",
        "w-11/12",
        "mt-3",
        "pt-3",
        "px-3",
        "mx-auto",
        "rounded-t-lg",
        "border-t-2",
        "border-x-2",
        "flex",
        "flex-col",
        "overflow-y-scroll",
        "sm:w-10/12",
        "sm:pt-4",
        "sm:px-4",
        "md:w-9/12",
        "md:pt-5",
        "md:px-5",
        "lg:w-7/12",
        "lg:pt-6",
        "lg:px-6",
        "xl:w-6/12"
      )}
    >
      {children}
    </div>
  );
};

export default ResultScrollView;
