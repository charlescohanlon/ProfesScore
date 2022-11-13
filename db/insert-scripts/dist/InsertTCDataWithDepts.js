"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var line_reader_1 = __importDefault(require("line-reader"));
function insertTCDataWithDepts(con) {
    return __awaiter(this, void 0, void 0, function () {
        var tcFilePath, deptFilePath, tcEntries, deptEntries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tcFilePath = "./db/data/tc.csv";
                    deptFilePath = "./db/data/depts.csv";
                    console.log("parseing: ".concat(tcFilePath, " and ").concat(deptFilePath));
                    return [4 /*yield*/, parseTCCSV(tcFilePath)];
                case 1:
                    tcEntries = _a.sent();
                    return [4 /*yield*/, parseDeptCSV(deptFilePath)];
                case 2:
                    deptEntries = _a.sent();
                    writeTCDataWithDeptsToDB(con, tcEntries, deptEntries);
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = insertTCDataWithDepts;
function parseTCCSV(tcFilePath) {
    var congregatedEntries = new Array();
    return new Promise(function (resolve) {
        line_reader_1["default"].eachLine(tcFilePath, function (line, last) {
            var course = line.split(",");
            var courseObj = {
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
                withdrawals: parseInt(course[13].trim())
            };
            var sameEntryIndex = Array.from(congregatedEntries).findIndex(function (elm) {
                return (elm.year === courseObj.year &&
                    elm.quarter === courseObj.quarter &&
                    elm.firstName === courseObj.firstName &&
                    elm.lastName === courseObj.lastName &&
                    elm.subjectAbbr === courseObj.subjectAbbr &&
                    elm.courseNumber === courseObj.courseNumber);
            });
            if (sameEntryIndex > -1) {
                congregatedEntries[sameEntryIndex].aGrades += courseObj.aGrades;
                congregatedEntries[sameEntryIndex].bGrades += courseObj.bGrades;
                congregatedEntries[sameEntryIndex].cGrades += courseObj.cGrades;
                congregatedEntries[sameEntryIndex].dGrades += courseObj.dGrades;
                congregatedEntries[sameEntryIndex].fGrades += courseObj.fGrades;
                congregatedEntries[sameEntryIndex].withdrawals += courseObj.withdrawals;
            }
            else {
                congregatedEntries.push(courseObj);
            }
            if (last)
                resolve(congregatedEntries);
        });
    });
}
function parseDeptCSV(deptFilePath) {
    var entries = new Array();
    return new Promise(function (resolve) {
        line_reader_1["default"].eachLine(deptFilePath, function (line, last) {
            var lineArr = line.split(",");
            var dept = {
                name: lineArr[0],
                abbreviations: lineArr.slice(1)
            };
            if (entries.find(function (entry) {
                return (entry.name === dept.name &&
                    entry.abbreviations === dept.abbreviations);
            })) {
                throw "Duplicate department entry: ".concat(dept);
            }
            entries.push(dept);
            if (last)
                resolve(entries);
        });
    });
}
function writeTCDataWithDeptsToDB(con, tcEntries, deptEntries) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            tcEntries.map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                var subjectDeptName, profIDSubQuery, subjectIDSubQuery, courseIDSubQuery;
                return __generator(this, function (_a) {
                    insertIfNotInTable(con, "professors", ["first_name", "last_name"], ["\"".concat(entry.firstName, "\""), "\"".concat(entry.lastName, "\"")]);
                    subjectDeptName = deptEntries.find(function (value) {
                        return value.abbreviations.includes(entry.subjectAbbr);
                    }).name;
                    insertIfNotInTable(con, "subjects", ["abbreviation", "department"], ["\"".concat(entry.subjectAbbr, "\""), "\"".concat(subjectDeptName, "\"")]);
                    profIDSubQuery = "(SELECT professor_id FROM professors WHERE first_name = \"".concat(entry.firstName, "\" AND last_name = \"").concat(entry.lastName, "\")");
                    subjectIDSubQuery = "(SELECT subject_id FROM subjects WHERE abbreviation = \"".concat(entry.subjectAbbr, "\")");
                    courseIDSubQuery = "(SELECT course_id FROM courses WHERE class_number = \"".concat(entry.courseNumber, "\" AND subject_id = ").concat(subjectIDSubQuery, ")");
                    insertIfNotInTable(con, "courses", ["class_number", "subject_id"], ["\"".concat(entry.courseNumber, "\""), subjectIDSubQuery]);
                    insertIfNotInTable(con, "professor_courses", ["professor_id", "course_id"], [profIDSubQuery, courseIDSubQuery]);
                    insertIfNotInTable(con, "grade_distributions", [
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
                    ], [
                        entry.year,
                        "\"".concat(entry.quarter, "\""),
                        entry.aGrades,
                        entry.bGrades,
                        entry.cGrades,
                        entry.dGrades,
                        entry.fGrades,
                        entry.withdrawals,
                        profIDSubQuery,
                        courseIDSubQuery,
                    ]);
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function insertIfNotInTable(con, table, keys, values) {
    function separate(arr, seperator) {
        if (seperator === void 0) { seperator = ","; }
        return arr.reduce(function (prev, curr) { return (prev += "".concat(seperator, " ").concat(curr)); });
    }
    var sepCols = separate(keys);
    var queryStr = "INSERT INTO ".concat(table, " (").concat(sepCols, ") ") +
        "SELECT * FROM (SELECT ".concat(separate(values.map(function (val, i) { return "".concat(val, " AS ").concat(keys[i]); })), ") AS t ") +
        "WHERE NOT EXISTS (SELECT ".concat(sepCols, " FROM ").concat(table, " WHERE ").concat(separate(keys.map(function (key, i) { return "".concat(key, " = ").concat(values[i]); }), " AND"), ") LIMIT 1;");
    con.query(queryStr);
}
