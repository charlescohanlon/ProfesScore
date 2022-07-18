import type { NextPage } from "next";
import SearchHome from "../components/Search/SearchHome";
import NavbarLinks from "../components/NavbarLinks";

const Home: NextPage = () => {
  return (
    <>
      <main className="h-screen w-screen bg-white">
        <NavbarLinks textColorClass="text-brandGray"></NavbarLinks>
        <div className="mx-auto mt-60">
          <SearchHome></SearchHome>
        </div>
      </main>
      <footer className="w-screen h-20 bg-gray-100 flex justify-center">
        <p className="my-auto">© Charles O'Hanlon</p>
      </footer>
    </>
  );
};

export default Home;
