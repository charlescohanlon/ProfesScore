import lineReader from "line-reader";
import Mysql from "mysql";

export default async function insertRMPData(con: Mysql.Connection) {
  const rmpFilePath = "./db/data/rmp.csv";
  console.log(`parsing: ${rmpFilePath}`);
  const rmpEntries = await parseRMPCSV(rmpFilePath);
  writeRMPDataToDB(con, rmpEntries);
}

interface RMPEntry {
  firstName: string;
  lastName: string;
  rating: number;
  difficulty: number;
  retakeRate: number;
  numRatings: number;
}

function parseRMPCSV(rmpFilePath: string): Promise<Array<RMPEntry>> {
  let entries = new Array<RMPEntry>();
  return new Promise((resolve) => {
    lineReader.eachLine(rmpFilePath, (line, last) => {
      const lineArr = line.split(",");
      const numRatings = parseInt(lineArr[5].trim());
      const dupEntry = entries.find(
        (entry) =>
          entry.firstName === lineArr[0].trim() &&
          entry.lastName === lineArr[1].trim()
      );

      if (numRatings > 0 && !dupEntry) {
        entries.push({
          firstName: lineArr[0].trim(),
          lastName: lineArr[1].trim(),
          rating: parseFloat(lineArr[2].trim()),
          difficulty: parseFloat(lineArr[3].trim()),
          retakeRate: parseInt(lineArr[4].trim()),
          numRatings: numRatings,
        });
      }
      if (last) resolve(entries);
    });
  });
}

function writeRMPDataToDB(
  con: Mysql.Connection,
  rmpEntries: Array<RMPEntry>
): void {
  rmpEntries.forEach((elm) => {
    con.query(
      `INSERT INTO quality_ratings (rating, difficulty, retake_rate, num_ratings, professor_id) ` +
        `SELECT * FROM (SELECT ${elm.rating} AS rating, ${elm.difficulty} AS difficulty, ${elm.retakeRate} AS retake_rate, ${elm.numRatings} AS num_ratings, ` +
        `(SELECT professor_id FROM professors WHERE first_name = "${elm.firstName}" AND last_name = "${elm.lastName}") AS professor_id) as t ` +
        `WHERE EXISTS (SELECT first_name, last_name FROM professors WHERE first_name = "${elm.firstName}" AND last_name = "${elm.lastName}") LIMIT 1;`
    );
  });
}
