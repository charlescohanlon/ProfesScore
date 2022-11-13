import lineReader from "line-reader";
import Mysql from "mysql";

export default async function insertTCDataWithDepts(con: Mysql.Connection) {
  const tcFilePath = "./db/data/tc.csv";
  const deptFilePath = "./db/data/depts.csv";
  console.log(`parseing: ${tcFilePath} and ${deptFilePath}`);
  const tcEntries = await parseTCCSV(tcFilePath);
  const deptEntries = await parseDeptCSV(deptFilePath);
  writeTCDataWithDeptsToDB(con, tcEntries, deptEntries);
}

interface TCEntry {
  year: number;
  quarter: string;
  lastName: string;
  firstName: string;
  subjectAbbr: string;
  courseNumber: string;
  aGrades: number;
  bGrades: number;
  cGrades: number;
  dGrades: number;
  fGrades: number;
  withdrawals: number;
}

function parseTCCSV(tcFilePath: string): Promise<Array<TCEntry>> {
  const congregatedEntries = new Array<TCEntry>();
  return new Promise((resolve) => {
    lineReader.eachLine(tcFilePath, (line, last) => {
      const course = line.split(",");
      const courseObj: TCEntry = {
        year: parseInt(course[1].trim()),
        quarter: course[2].trim(),
        lastName: course[3].replace('"', "").trim(),
        firstName: course[4].replace('"', "").trim(),
        subjectAbbr: course[5].trim(),
        courseNumber: course[6].trim(),
        aGrades: parseInt(course[8].trim()),
        bGrades: parseInt(course[9].trim()),
        cGrades: parseInt(course[10].trim()),
        dGrades: parseInt(course[11].trim()),
        fGrades: parseInt(course[12].trim()),
        withdrawals: parseInt(course[13].trim()),
      };
      const sameEntryIndex = Array.from(congregatedEntries).findIndex((elm) => {
        return (
          elm.year === courseObj.year &&
          elm.quarter === courseObj.quarter &&
          elm.firstName === courseObj.firstName &&
          elm.lastName === courseObj.lastName &&
          elm.subjectAbbr === courseObj.subjectAbbr &&
          elm.courseNumber === courseObj.courseNumber
        );
      });
      if (sameEntryIndex > -1) {
        congregatedEntries[sameEntryIndex].aGrades += courseObj.aGrades;
        congregatedEntries[sameEntryIndex].bGrades += courseObj.bGrades;
        congregatedEntries[sameEntryIndex].cGrades += courseObj.cGrades;
        congregatedEntries[sameEntryIndex].dGrades += courseObj.dGrades;
        congregatedEntries[sameEntryIndex].fGrades += courseObj.fGrades;
        congregatedEntries[sameEntryIndex].withdrawals += courseObj.withdrawals;
      } else {
        congregatedEntries.push(courseObj);
      }
      if (last) resolve(congregatedEntries);
    });
  });
}

interface DEntry {
  name: string;
  abbreviations: Array<string>;
}

function parseDeptCSV(deptFilePath: string): Promise<Array<DEntry>> {
  let entries = new Array<DEntry>();
  return new Promise((resolve) => {
    lineReader.eachLine(deptFilePath, (line, last) => {
      const lineArr = line.split(",");
      const dept: DEntry = {
        name: lineArr[0],
        abbreviations: lineArr.slice(1), // can be multiple abbreviations for a depertment
      };
      if (
        entries.find((entry) => {
          return (
            entry.name === dept.name &&
            entry.abbreviations === dept.abbreviations
          );
        })
      ) {
        throw `Duplicate department entry: ${dept}`;
      }
      entries.push(dept);
      if (last) resolve(entries);
    });
  });
}

async function writeTCDataWithDeptsToDB(
  con: Mysql.Connection,
  tcEntries: Array<TCEntry>,
  deptEntries: Array<DEntry>
) {
  tcEntries.map(async (entry) => {
    insertIfNotInTable(
      con,
      "professors",
      ["first_name", "last_name"],
      [`"${entry.firstName}"`, `"${entry.lastName}"`]
    );

    const subjectDeptName: string = deptEntries.find((value) =>
      value.abbreviations.includes(entry.subjectAbbr)
    )!.name;

    insertIfNotInTable(
      con,
      "subjects",
      ["abbreviation", "department"],
      [`"${entry.subjectAbbr}"`, `"${subjectDeptName}"`]
    );

    const profIDSubQuery = `(SELECT professor_id FROM professors WHERE first_name = "${entry.firstName}" AND last_name = "${entry.lastName}")`;
    const subjectIDSubQuery = `(SELECT subject_id FROM subjects WHERE abbreviation = "${entry.subjectAbbr}")`;
    const courseIDSubQuery = `(SELECT course_id FROM courses WHERE class_number = "${entry.courseNumber}" AND subject_id = ${subjectIDSubQuery})`;

    insertIfNotInTable(
      con,
      "courses",
      ["class_number", "subject_id"],
      [`"${entry.courseNumber}"`, subjectIDSubQuery]
    );

    insertIfNotInTable(
      con,
      "professor_courses",
      ["professor_id", "course_id"],
      [profIDSubQuery, courseIDSubQuery]
    );

    insertIfNotInTable(
      con,
      "grade_distributions",
      [
        "year",
        "quarter",
        "a_grades",
        "b_grades",
        "c_grades",
        "d_grades",
        "f_grades",
        "withdrawals",
        "professor_id",
        "course_id",
      ],
      [
        entry.year,
        `"${entry.quarter}"`,
        entry.aGrades,
        entry.bGrades,
        entry.cGrades,
        entry.dGrades,
        entry.fGrades,
        entry.withdrawals,
        profIDSubQuery,
        courseIDSubQuery,
      ]
    );
  });
}

function insertIfNotInTable(
  con: Mysql.Connection,
  table: string,
  keys: Array<string>,
  values: Array<string | number>
): void {
  function separate(arr: Array<string>, seperator: string = ","): string {
    return arr.reduce((prev, curr) => (prev += `${seperator} ${curr}`));
  }
  const sepCols = separate(keys);
  let queryStr =
    `INSERT INTO ${table} (${sepCols}) ` +
    `SELECT * FROM (SELECT ${separate(
      values.map((val, i) => `${val} AS ${keys[i]}`)
    )}) AS t ` +
    `WHERE NOT EXISTS (SELECT ${sepCols} FROM ${table} WHERE ${separate(
      keys.map((key, i) => `${key} = ${values[i]}`),
      " AND"
    )}) LIMIT 1;`;
  con.query(queryStr);
}
