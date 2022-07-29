import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const handler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const con = initConnection();
  con.connect((err: Error) => {
    if (err) {
      console.error(err);
      res.status(400).json("Connection failed");
      return;
    }
    con.query("USE professcore;");
    con.query("SELECT * FROM professors;", (err: Error, result: any) => {
      if (err) {
        console.error(err);
        res.status(400).json("Database query failed");
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  });
};

export default handler;

function initConnection(): any {
  let mysql = require("mysql");
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
}
