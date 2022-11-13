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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var verbose;
function insertScores(con, isVerbose) {
    return __awaiter(this, void 0, void 0, function () {
        var deptRawData, courseRawData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    verbose = isVerbose;
                    return [4 /*yield*/, getDeptWideData(con)];
                case 1:
                    deptRawData = _a.sent();
                    return [4 /*yield*/, getCourseWideData(con)];
                case 2:
                    courseRawData = _a.sent();
                    insertData(__spreadArray(__spreadArray([], deptRawData, true), courseRawData, true), con);
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = insertScores;
var dataQueryStr = "SELECT (SUM(a_grades) / (SUM(a_grades) + SUM(b_grades) + SUM(c_grades) + SUM(d_grades) + SUM(f_grades) + SUM(withdrawals))) AS a_ratio, " +
    "((SUM(a_grades) + SUM(b_grades) + SUM(c_grades)) / (SUM(a_grades) + SUM(b_grades) + SUM(c_grades) + SUM(d_grades) + SUM(f_grades) + SUM(withdrawals))) AS pass_ratio, " +
    "(SUM(a_grades) + SUM(b_grades) + SUM(c_grades) + SUM(d_grades) + SUM(f_grades) + SUM(withdrawals)) AS num_grades, " +
    "rating, difficulty, retake_rate, num_ratings, quality_rating_id " +
    "FROM grade_distributions " +
    "LEFT JOIN quality_ratings ON grade_distributions.professor_id = quality_ratings.professor_id ";
var groupBy = "GROUP BY rating, difficulty, retake_rate, num_ratings, quality_rating_id;";
function getDeptWideData(con) {
    return __awaiter(this, void 0, void 0, function () {
        var getAllProfIDsQuery, profIDArr;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getAllProfIDsQuery = "SELECT professor_id FROM professors;";
                    return [4 /*yield*/, queryDB(getAllProfIDsQuery, con)];
                case 1:
                    profIDArr = _a.sent();
                    console.log("calculating department-wide scores");
                    // const profIDArr = [{ professor_id: 664 }, { professor_id: 164 }];
                    return [2 /*return*/, Promise.all(profIDArr.map(function (_a) {
                            var professor_id = _a.professor_id;
                            return __awaiter(_this, void 0, void 0, function () {
                                var queryWithCondition, rawData;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            queryWithCondition = dataQueryStr +
                                                "WHERE grade_distributions.professor_id = ".concat(professor_id, " ") +
                                                groupBy;
                                            return [4 /*yield*/, queryDB(queryWithCondition, con)];
                                        case 1:
                                            rawData = (_b.sent())[0];
                                            return [2 /*return*/, refineRawData(rawData, professor_id)];
                                    }
                                });
                            });
                        }))];
            }
        });
    });
}
function refineRawData(data, professor_id, course_id) {
    return {
        course_id: course_id,
        professor_id: professor_id,
        a_ratio: Math.round(data.a_ratio * 100),
        num_grades: data.num_grades,
        passing_ratio: Math.round(data.pass_ratio * 100),
        quality_rating_id: data.quality_rating_id,
        score: calcScore(data)
    };
}
function getCourseWideData(con) {
    return __awaiter(this, void 0, void 0, function () {
        var getAllCourseIDsQuery, courseIDArr, resultArr;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getAllCourseIDsQuery = "SELECT course_id FROM courses;";
                    return [4 /*yield*/, queryDB(getAllCourseIDsQuery, con)];
                case 1:
                    courseIDArr = _a.sent();
                    console.log("calculating course-wide scores");
                    return [4 /*yield*/, Promise.all(courseIDArr.map(function (_a) {
                            var course_id = _a.course_id;
                            return __awaiter(_this, void 0, void 0, function () {
                                var getProfIDsForCourse, profForCourseIDArr;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            getProfIDsForCourse = "SELECT professor_id FROM professor_courses WHERE course_id = ".concat(course_id, ";");
                                            return [4 /*yield*/, queryDB(getProfIDsForCourse, con)];
                                        case 1:
                                            profForCourseIDArr = _b.sent();
                                            return [4 /*yield*/, Promise.all(profForCourseIDArr.map(function (_a) {
                                                    var professor_id = _a.professor_id;
                                                    return __awaiter(_this, void 0, void 0, function () {
                                                        var queryWithCondition, rawData;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    queryWithCondition = dataQueryStr +
                                                                        "WHERE grade_distributions.course_id = ".concat(course_id, " AND grade_distributions.professor_id = ").concat(professor_id, " ") +
                                                                        groupBy;
                                                                    return [4 /*yield*/, queryDB(queryWithCondition, con)];
                                                                case 1:
                                                                    rawData = (_b.sent())[0];
                                                                    return [2 /*return*/, refineRawData(rawData, professor_id, course_id)];
                                                            }
                                                        });
                                                    });
                                                }))];
                                        case 2: return [2 /*return*/, _b.sent()];
                                    }
                                });
                            });
                        }))];
                case 2:
                    resultArr = _a.sent();
                    return [2 /*return*/, resultArr.flat()];
            }
        });
    });
}
function calcScore(data) {
    var aRatio = data.a_ratio, num_grades = data.num_grades, rating = data.rating, num_ratings = data.num_ratings, difficulty = data.difficulty, retake_rate = data.retake_rate;
    if (num_grades === 0)
        return 0;
    var numGradesRatio = Math.log10(num_grades) / 4, boundedRating = rating ? rating / 5 : 0, numRatingsRatio = num_ratings ? Math.log10(num_ratings) / 3 : 0, boundedDifficulty = difficulty ? 1 - difficulty / 5 : 0, boundedRetakeRate = retake_rate ? retake_rate / 100 : 0;
    var aRatioMultiplier = 0.7, numGradesMultiplier = 0.15, ratingMultiplier = 0.05, numRatingsMultiplier = 0.05, difficultyMultiplier = 0.025, retakeRateMultiplier = 0.025;
    var score = (aRatio * aRatioMultiplier +
        numGradesRatio * numGradesMultiplier +
        boundedRating * ratingMultiplier +
        numRatingsRatio * ratingMultiplier +
        boundedDifficulty * difficultyMultiplier +
        boundedRetakeRate * retakeRateMultiplier) /
        0.89;
    if (verbose) {
        console.log("\nmetrics");
        console.table({
            aRatio: aRatio,
            numGradesRatio: numGradesRatio,
            boundedRating: boundedRating,
            numRatingsRatio: numRatingsRatio,
            boundedDifficulty: boundedDifficulty,
            boundedRetakeRate: boundedRetakeRate
        });
        console.log("\nweighted metrics");
        console.table({
            aRatio: aRatio * aRatioMultiplier,
            numGradesRatio: numGradesRatio * numGradesMultiplier,
            boundedRating: boundedRating * ratingMultiplier,
            numRatingsRatio: numRatingsRatio * numRatingsMultiplier,
            boundedReverseDifficulty: boundedDifficulty * difficultyMultiplier,
            boundedRetakeRate: boundedRetakeRate * retakeRateMultiplier
        });
        console.log("multiplier sum check = ", aRatioMultiplier +
            numGradesMultiplier +
            ratingMultiplier +
            ratingMultiplier +
            difficultyMultiplier +
            retakeRateMultiplier);
    }
    return Math.round(score * 100);
}
function insertData(resultData, con) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            resultData.map(function (row) { return __awaiter(_this, void 0, void 0, function () {
                var insertQuery;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            insertQuery = "INSERT INTO preview_metrics (course_id, professor_id, a_ratio, total_grades, passing_ratio, quality_rating_id, score) " +
                                "VALUES (" +
                                "".concat(row.course_id ? row.course_id : "null", ", ") +
                                "".concat(row.professor_id, ", ") +
                                "".concat(row.a_ratio, ", ") +
                                "".concat(row.num_grades, ", ") +
                                "".concat(row.passing_ratio, ", ") +
                                "".concat((_a = row.quality_rating_id) !== null && _a !== void 0 ? _a : "null", ", ") +
                                "".concat(row.score, ");");
                            return [4 /*yield*/, queryDB(insertQuery, con)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function queryDB(sqlStr, con) {
    return new Promise(function (resolve, reject) {
        con.query(sqlStr, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
}
