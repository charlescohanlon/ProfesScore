import lineReader from "line-reader"

interface TransferCampObject {
  year: number;
  quarter: string;
  professor: string;
  subject: string;
  classNumber: string;
  grades: [number, number, number, number, number];
  withdrawals: number;
}

// lineReader.eachLine(
//   "./datad.csv",
//   (line: string) => {
//     const course = line.split(",");
//     console.log(course[3] + course[4]);
//   }
// );
