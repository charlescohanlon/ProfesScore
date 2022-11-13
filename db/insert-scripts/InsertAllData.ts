import insertTCDataWithDepts from "./InsertTCDataWithDepts";
import insertRMPData from "./InsertRMPData";
import { createDBCon } from "./utils";
import insertScores from "./InsertScores";

async function insertAllData() {
  const isVerbose = process.argv.includes("--verbose");
  const con = createDBCon();
  await insertTCDataWithDepts(con);
  console.log("Done inserting tc data.");
  await insertRMPData(con);
  console.log("Done inserting rmp data.");
  await insertScores(con, isVerbose);
  console.log("Done inserting scores.");
  con.end();
  console.log("Connection ended.");
}

insertAllData();
