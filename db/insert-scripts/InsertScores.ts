import Mysql, { OkPacket } from "mysql";

interface RawData {
  a_ratio: number;
  num_grades: number;
  rating?: number;
  difficulty?: number;
  retake_rate?: number;
  num_ratings?: number;
  quality_rating_id?: number;
  pass_ratio: number;
}

interface ResultData {
  course_id?: number;
  professor_id: number;
  a_ratio: number;
  num_grades: number;
  passing_ratio: number;
  quality_rating_id?: number;
  score: number;
}
let verbose: boolean;
export default async function insertScores(
  con: Mysql.Connection,
  isVerbose: boolean
) {
  verbose = isVerbose;
  const deptRawData = await getDeptWideData(con);
  const courseRawData = await getCourseWideData(con);
  insertData([...deptRawData, ...courseRawData], con);
}

let dataQueryStr =
  `SELECT (SUM(a_grades) / (SUM(a_grades) + SUM(b_grades) + SUM(c_grades) + SUM(d_grades) + SUM(f_grades) + SUM(withdrawals))) AS a_ratio, ` +
  `((SUM(a_grades) + SUM(b_grades) + SUM(c_grades)) / (SUM(a_grades) + SUM(b_grades) + SUM(c_grades) + SUM(d_grades) + SUM(f_grades) + SUM(withdrawals))) AS pass_ratio, ` +
  `(SUM(a_grades) + SUM(b_grades) + SUM(c_grades) + SUM(d_grades) + SUM(f_grades) + SUM(withdrawals)) AS num_grades, ` +
  `rating, difficulty, retake_rate, num_ratings, quality_rating_id ` +
  `FROM grade_distributions ` +
  `LEFT JOIN quality_ratings ON grade_distributions.professor_id = quality_ratings.professor_id `;
let groupBy = `GROUP BY rating, difficulty, retake_rate, num_ratings, quality_rating_id;`;

async function getDeptWideData(con: Mysql.Connection): Promise<ResultData[]> {
  const getAllProfIDsQuery = "SELECT professor_id FROM professors;";
  const profIDArr = await queryDB<{ professor_id: number }>(
    getAllProfIDsQuery,
    con
  );
  console.log("calculating department-wide scores");
  // const profIDArr = [{ professor_id: 664 }, { professor_id: 164 }];

  return Promise.all(
    profIDArr.map(async ({ professor_id }) => {
      const queryWithCondition =
        dataQueryStr +
        `WHERE grade_distributions.professor_id = ${professor_id} ` +
        groupBy;
      const rawData = (await queryDB<RawData>(queryWithCondition, con))[0];
      return refineRawData(rawData, professor_id);
    })
  );
}

function refineRawData(
  data: RawData,
  professor_id: number,
  course_id?: number
): ResultData {
  return {
    course_id,
    professor_id,
    a_ratio: Math.round(data.a_ratio * 100),
    num_grades: data.num_grades,
    passing_ratio: Math.round(data.pass_ratio * 100),
    quality_rating_id: data.quality_rating_id,
    score: calcScore(data),
  };
}

async function getCourseWideData(
  con: Mysql.Connection
): Promise<Array<ResultData>> {
  const getAllCourseIDsQuery = "SELECT course_id FROM courses;";
  const courseIDArr = await queryDB<{ course_id: number }>(
    getAllCourseIDsQuery,
    con
  );

  console.log("calculating course-wide scores");
  const resultArr = await Promise.all(
    courseIDArr.map(async ({ course_id }) => {
      const getProfIDsForCourse = `SELECT professor_id FROM professor_courses WHERE course_id = ${course_id};`;
      const profForCourseIDArr = await queryDB<{ professor_id: number }>(
        getProfIDsForCourse,
        con
      );
      return await Promise.all(
        profForCourseIDArr.map(async ({ professor_id }) => {
          const queryWithCondition =
            dataQueryStr +
            `WHERE grade_distributions.course_id = ${course_id} AND grade_distributions.professor_id = ${professor_id} ` +
            groupBy;
          const rawData = (await queryDB<RawData>(queryWithCondition, con))[0];
          return refineRawData(rawData, professor_id, course_id);
        })
      );
    })
  );
  return resultArr.flat();
}

function calcScore(data: RawData): number {
  const {
    a_ratio: aRatio,
    num_grades,
    rating,
    num_ratings,
    difficulty,
    retake_rate,
  } = data;
  if (num_grades === 0) return 0;

  const numGradesRatio = Math.log10(num_grades) / 4,
    boundedRating = rating ? rating / 5 : 0,
    numRatingsRatio = num_ratings ? Math.log10(num_ratings) / 3 : 0,
    boundedDifficulty = difficulty ? 1 - difficulty / 5 : 0,
    boundedRetakeRate = retake_rate ? retake_rate / 100 : 0;

  const aRatioMultiplier = 0.7,
    numGradesMultiplier = 0.15,
    ratingMultiplier = 0.05,
    numRatingsMultiplier = 0.05,
    difficultyMultiplier = 0.025,
    retakeRateMultiplier = 0.025;

  const score =
    (aRatio * aRatioMultiplier +
      numGradesRatio * numGradesMultiplier +
      boundedRating * ratingMultiplier +
      numRatingsRatio * ratingMultiplier +
      boundedDifficulty * difficultyMultiplier +
      boundedRetakeRate * retakeRateMultiplier) /
    0.89;

  if (verbose) {
    console.log("\nmetrics");
    console.table({
      aRatio,
      numGradesRatio,
      boundedRating,
      numRatingsRatio,
      boundedDifficulty,
      boundedRetakeRate,
    });

    console.log("\nweighted metrics");
    console.table({
      aRatio: aRatio * aRatioMultiplier,
      numGradesRatio: numGradesRatio * numGradesMultiplier,
      boundedRating: boundedRating * ratingMultiplier,
      numRatingsRatio: numRatingsRatio * numRatingsMultiplier,
      boundedReverseDifficulty: boundedDifficulty * difficultyMultiplier,
      boundedRetakeRate: boundedRetakeRate * retakeRateMultiplier,
    });

    console.log(
      "multiplier sum check = ",
      aRatioMultiplier +
        numGradesMultiplier +
        ratingMultiplier +
        ratingMultiplier +
        difficultyMultiplier +
        retakeRateMultiplier
    );
  }
  return Math.round(score * 100);
}

async function insertData(
  resultData: ResultData[],
  con: Mysql.Connection
): Promise<void> {
  resultData.map(async (row) => {
    const insertQuery =
      `INSERT INTO preview_metrics (course_id, professor_id, a_ratio, total_grades, passing_ratio, quality_rating_id, score) ` +
      `VALUES (` +
      `${row.course_id ? row.course_id : "null"}, ` +
      `${row.professor_id}, ` +
      `${row.a_ratio}, ` +
      `${row.num_grades}, ` +
      `${row.passing_ratio}, ` +
      `${row.quality_rating_id ?? "null"}, ` +
      `${row.score});`;
    await queryDB(insertQuery, con);
  });
}

function queryDB<T>(sqlStr: string, con: Mysql.Connection): Promise<Array<T>> {
  return new Promise((resolve, reject) => {
    con.query(sqlStr, (err: Error, result: Array<OkPacket>) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(JSON.stringify(result)) as Array<T>);
    });
  });
}
