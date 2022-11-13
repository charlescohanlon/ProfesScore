interface SubmitButtonProps {
  submit(): void;
}

const SubmitButton = ({ submit }: SubmitButtonProps): JSX.Element => {
  return (
    <input
      type="button"
      value="Search"
      onClick={() => submit()}
      className={
        "px-10 py-1 rounded-full bg-white text-brandAmber font-bold " +
        "hover:scale-105 text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
      }
    />
  );
};
export default SubmitButton;
