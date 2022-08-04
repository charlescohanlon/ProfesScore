import dotenv from "dotenv";
import lineReader from "line-reader";
import Mysql from "mysql";
import { CONNECTING } from "ws";
dotenv.config({ path: ".env.local" });

function parseCSV() {
	let congregatedEntries = [];
	lineReader.eachLine(
		"./db/datadTest.csv",
		(line, last) => {
			const course = line.split(",");
			const courseObj = {
				year: course[1].trim(),
				semester: course[2].trim(),
				lastName: course[3].replace("\"", "").trim(),
				firstName: course[4].replace("\"", "").trim(),
				subjectAbbr: course[5].trim(),
				courseNumber: course[6].trim(),
				a_grades: parseInt(course[8].trim()),
				b_grades: parseInt(course[9].trim()),
				c_grades: parseInt(course[10].trim()),
				d_grades: parseInt(course[11].trim()),
				f_grades: parseInt(course[12].trim()),
				withdrawals: parseInt(course[13].trim()),
			}
			const sameEntryIndex = congregatedEntries.findIndex((elm) => {
				return (elm.year === courseObj.year && elm.semester === courseObj.semester
					&& elm.firstName === courseObj.firstName && elm.lastName === courseObj.lastName
					&& elm.subjectAbbr === courseObj.subjectAbbr && elm.courseNumber === courseObj.courseNumber);
			});
			if (sameEntryIndex > -1) {
				congregatedEntries[sameEntryIndex].a_grades += courseObj.a_grades;
				congregatedEntries[sameEntryIndex].b_grades += courseObj.b_grades;
				congregatedEntries[sameEntryIndex].c_grades += courseObj.c_grades;
				congregatedEntries[sameEntryIndex].d_grades += courseObj.d_grades;
				congregatedEntries[sameEntryIndex].f_grades += courseObj.f_grades;
				congregatedEntries[sameEntryIndex].withdrawals += courseObj.withdrawals;
			} else {
				congregatedEntries.push(courseObj);
			}
			if (last) writeDB(congregatedEntries);
		}
	);
}

function writeDB(entries) {
	const con = Mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS.substring(1),
	});

	con.connect((err) => {
		if (err) {
			console.error(err);
			return;
		}
		entries.forEach((elm) => {
			con.query("USE professcore;");
			con.query(`INSERT INTO professors ('first_name', 'last_name') VALUES (${elm.firstName}, ${elm.lastName});`);
			con.query(`INSERT INTO subject ('abbreviation') VALUES (${elm.subjectAbbr});`);
			





		});
		con.end((err) => { if (err) console.error(err); });
	});

}

parseCSV();




