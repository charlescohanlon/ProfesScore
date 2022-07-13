import type { NextPage } from "next";
import Head from "next/head";
import SearchHome from "../components/Search/SearchHome";
import ViewResults from "./search"; // for dev purposes

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ProfesScore</title>
      </Head>

      <main className="h-screen w-screen bg-white">
        {/* <div className="flex flex-col items-center">
          <SearchHome></SearchHome>
        </div> */}

        <ViewResults></ViewResults>
      </main>
    </div>
  );
};

export default Home;
