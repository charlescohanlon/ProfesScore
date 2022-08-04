import dotenv from "dotenv";
import Mysql from "mysql";
import lineReader from "line-reader";
dotenv.config({ path: ".env.local" });


// const connection = Mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASS.substring(1),
// });

// connection.connect((err) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
// 	connection.query(`DELETE FROM professcore.professors;`);
// 	connection.end((err) => { if (err) console.error(err); });
// });
function main() {
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
			const sameCourseEntryIndex = congregatedEntries.findIndex((elm) => {
				return (elm.year === courseObj.year && elm.semester === courseObj.semester
					&& elm.firstName === courseObj.firstName && elm.lastName === courseObj.lastName
					&& elm.subjectAbbr === courseObj.subjectAbbr && elm.courseNumber === courseObj.courseNumber);
			});
			if (sameCourseEntryIndex > -1) {
				congregatedEntries[sameCourseEntryIndex].a_grades += courseObj.a_grades;
				congregatedEntries[sameCourseEntryIndex].b_grades += courseObj.b_grades;
				congregatedEntries[sameCourseEntryIndex].c_grades += courseObj.c_grades;
				congregatedEntries[sameCourseEntryIndex].d_grades += courseObj.d_grades;
				congregatedEntries[sameCourseEntryIndex].f_grades += courseObj.f_grades;
				congregatedEntries[sameCourseEntryIndex].withdrawals += courseObj.withdrawals;
			} else {
				congregatedEntries.push(courseObj);
			}
			if (last) congregatedEntries.push("test");
		}
	);
	console.log(congregatedEntries);
}

main();

