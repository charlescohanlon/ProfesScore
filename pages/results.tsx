import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps, NextPageContext } from "next";
import Mysql from "mysql";
import ResultsNavbar from "../components/Results/ResultsNavbar";
import ResultsScrollContainer from "../components/Results/ResultsScrollContainer";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const con = Mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//   });

//   const queryResults = await new Promise((resolve, reject) => {
//     con.connect((err: Error) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       con.query("USE professcore;");
//       con.query("SELECT * FROM professors;", (err: Error, result: any) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         const resultAsJSON = JSON.stringify(result); // to make serializable
//         resolve(resultAsJSON);
//         con.end((err) => {
//           if (err) throw err;
//         });
//       });
//     });
//   });
//   return {
//     props: { queryResults },
//   };
// };

const Results: NextPage = ({ queryResults }: any): JSX.Element => {
  // useEffect(() => console.log(JSON.parse(queryResults)), []);
  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col">
      <ResultsNavbar></ResultsNavbar>
      <ResultsScrollContainer></ResultsScrollContainer>
    </main>
  );
};

export default Results;
