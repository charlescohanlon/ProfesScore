"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createDBCon = void 0;
var mysql_1 = __importDefault(require("mysql"));
require("dotenv");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config({ path: ".env.local" });
function createDBCon() {
    return mysql_1["default"].createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS.substring(1),
        database: "professcore"
    });
}
exports.createDBCon = createDBCon;
