interface GenericInputProps {
  placeholderText: string;
  value: string;
  setValue(value: string): void;
  submit(): void;
  clearOther?(text: string): void;
}

const GenericInput = ({
  placeholderText,
  value,
  setValue,
  submit,
  clearOther,
}: GenericInputProps): JSX.Element => {
  return (
    <input
      type="text"
      placeholder={placeholderText}
      onKeyDown={({ key }) => {
        if (key === "Enter") {
          submit();
          setValue("");
        }
        if (clearOther) clearOther(placeholderText);
      }}
      value={value}
      onChange={({ target }) => setValue((target as HTMLInputElement).value)}
      className={
        "w-full px-5 py-2 rounded-full font-Barlow text-brandGray bg-white hover:shadow-inputShadow " +
        "focus:outline-none text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
      }
    />
  );
};

export default GenericInput;
