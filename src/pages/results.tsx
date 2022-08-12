import { NextPage, GetServerSideProps } from "next";
import Mysql from "mysql";
import ResultsNavbar from "../components/results/Navbar/Navbar";
import ResultsScrollContainer from "../components/results/Display/DisplayContainer";
import { ParsedUrlQuery } from "querystring";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const con = Mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  const queryResults = await new Promise((resolve, reject) => {
    con.connect((err: Error) => {
      if (err) {
        reject(err);
        return;
      }

      con.query("USE professcore;");
      let queryStr =
        "SELECT first_name, last_name, abbreviation, class_number, year, quarter, a_grades, b_grades, c_grades, d_grades, f_grades, withdrawals " +
        "FROM grade_distributions " +
        "JOIN professors ON grade_distributions.professor_id = professors.professor_id " +
        "JOIN courses ON grade_distributions.course_id = courses.course_id JOIN subjects ON courses.subject_id = subjects.subject_id " +
        searchCondition(context.query) +
        "LIMIT 1000;";
      con.query(queryStr, (err: Error, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        const resultAsJSON = JSON.stringify(result);
        resolve(JSON.parse(resultAsJSON));
        con.end((err) => {
          if (err) throw err;
        });
      });
    });
  });
  return {
    props: { queryResults },
  };
};

function searchCondition(queryParams: ParsedUrlQuery) {
  if (queryParams.type === "professor")
    return `WHERE CONCAT(last_name, ', ', first_name) REGEXP '${queryParams.pq}' `;
  if (queryParams.type === "course")
    return `WHERE CONCAT(abbreviation, ' ', class_number) REGEXP '${queryParams.cq}|${queryParams.sq}' `;
  return " ";
}

const Results: NextPage = ({ queryResults }: any): JSX.Element => {
  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col">
      <ResultsNavbar></ResultsNavbar>
      <ResultsScrollContainer
        searchResults={queryResults}
      ></ResultsScrollContainer>
    </main>
  );
};

export default Results;
