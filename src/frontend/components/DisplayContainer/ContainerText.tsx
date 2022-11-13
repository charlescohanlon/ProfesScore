interface GeneralInfoContainerProps {
  title?: string | JSX.Element;
  children?: string | JSX.Element | Array<JSX.Element | string>;
  addtTitleClasses?: string;
  addtChildClasses?: string;
}

export const ContainerText = ({
  title,
  children,
  addtTitleClasses,
  addtChildClasses,
}: GeneralInfoContainerProps): JSX.Element => {
  return (
    <>
      <h1
        className={
          "ml-2 my-1 text-lg text-brandGray font-bold antialiased " +
          "md:text-xl " +
          (addtTitleClasses ?? "")
        }
      >
        {title}
      </h1>
      <p
        className={
          "text-lg leading-relaxed mb-5 p-3 pb-4 text-black font-Barlow bg-orange-100 " +
          "rounded-lg shadow-xl antialiased whitespace-pre-wrap " +
          (addtChildClasses ?? "")
        }
      >
        {children}
      </p>
    </>
  );
};
