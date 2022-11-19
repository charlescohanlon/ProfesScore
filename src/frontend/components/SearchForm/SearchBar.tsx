import { useRouter } from "next/router";
import { useEffect } from "react";

interface SearchBarProps {
  placeholderText: string;
  value: string;
  setValue(value: string): void;
  submit(): void;
  clearOther?(text: string): void;
}

const SearchBar = ({
  placeholderText,
  value,
  setValue,
  submit,
  clearOther,
}: SearchBarProps) => {
  const router = useRouter();
  const { pq, cq, dq } = router.query;

  useEffect(() => {
    if (pq) {
      // Professor Query
      setValue(pq as string);
    } else if (cq) {
      // Course Query
      setValue(cq as string);
    } else if (dq) {
      // Department Query
      setValue(dq as string);
    }
  }, [cq, dq, pq, setValue]);

  return (
    <div className="relative w-full rounded-full hover:shadow-inputShadow">
      <div className="absolute h-full w-fit flex justify-center items-center ml-4 lg:ml-3 lg:w-fit">
        <button onClick={() => submit()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-brandGray h-4 lg:h-6 lg:w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <input
        type="text"
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            submit();
          }
          if (clearOther) clearOther(placeholderText);
        }}
        value={value}
        onChange={({ target }) => setValue((target as HTMLInputElement).value)}
        placeholder={placeholderText}
        className={
          "w-full pl-10 pr-5 py-2 rounded-full font-Barlow text-brandGray bg-white " +
          "focus:outline-none text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl"
        }
      />
    </div>
  );
};

export default SearchBar;
