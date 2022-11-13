import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Navbar from "../frontend/components/Navbar";
import DisplayContainer from "../frontend/components/DisplayContainer";
import { Previews, SearchQuery } from "../types";
import { getResultsForQuery } from "../backend/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const query: SearchQuery = context.query as unknown as SearchQuery;
    const results: Previews = await getResultsForQuery(query);

    // const util = require("util");
    // console.log("final results:", util.inspect(results!, false, null, true));

    return {
      props: { query, results },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

const Results: NextPage = ({
  query,
  results,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  if (error) {
    return <>{error}</>;
  }
  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col">
      <Navbar></Navbar>
      <DisplayContainer
        query={query}
        searchResults={results}
      ></DisplayContainer>
    </main>
  );
};

export default Results;
