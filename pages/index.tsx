import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SearchForm from "../components/SearchHome";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ProfesScore</title>
      </Head>

      <main className="h-screen w-screen flex justify-center items-center bg-white">
        <SearchForm></SearchForm>
      </main>
    </div>
  );
};

export default Home;
