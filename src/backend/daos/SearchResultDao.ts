import knex from "./KnexObj";
import { Knex } from "knex";
import { CourseQueryData, ProfessorQueryData } from "../types";
import { CourseName } from "../../types";
// test

export default class SearchResultDao {
  private readonly professorResultLimit = 20;
  private readonly courseResultLimit = 2;
  private queryBuilder = knex("preview_metrics").select(
    knex.ref("professors.professor_id").as("pid"),
    knex.ref("first_name").as("firstName"),
    knex.ref("last_name").as("lastName"),
    knex.ref("a_ratio").as("aRatio"),
    knex.ref("passing_ratio").as("passingRatio"),
    knex.ref("total_grades").as("numGrades"),
    "rating",
    "score"
  );

  constructor() {
    this.joinProfessorTables();
  }

  searchForProfessor(
    tokens: string[],
    page?: number
  ): Promise<ProfessorQueryData[]> {
    this.addProfessorPagination(page);
    tokens.map((token) =>
      // adds parenthesis to token portion of query
      this.queryBuilder.andWhere((qB) =>
        this.addWhereLikes(qB, [token], "first_name", "last_name")
      )
    );
    return this.queryBuilder;
  }

  searchForCourse(
    tokens: string[],
    department: boolean,
    page?: number
  ): Promise<CourseQueryData[]> {
    const uniqueIDSubquery = knex("preview_metrics")
      .distinct("courses.course_id")
      .as("dist");
    this.addCoursePagination(page, uniqueIDSubquery);
    this.joinProfessorTables(uniqueIDSubquery);
    this.joinCourseTables(uniqueIDSubquery);
    if (department) this.addWhereLikes(uniqueIDSubquery, tokens, "department");
    else
      this.addWhereLikes(
        uniqueIDSubquery,
        tokens,
        "abbreviation",
        "class_number"
      );

    this.queryBuilder.select(
      knex.ref("courses.course_id").as("cid"),
      "abbreviation",
      knex.ref("class_number").as("number"),
      "department"
    );
    this.joinCourseTables();
    this.queryBuilder.innerJoin(uniqueIDSubquery, function () {
      this.on("courses.course_id", "=", "dist.course_id");
    });
    return this.queryBuilder;
  }

  searchForScore(
    bounds: [number, number],
    page?: number
  ): Promise<ProfessorQueryData[]> {
    this.queryBuilder.whereBetween("score", bounds);
    this.joinCourseTables();
    this.addProfessorPagination(page);
    return this.queryBuilder;
  }

  queryTaughtCourses(pid: number): Promise<CourseName[]> {
    return knex<CourseName>("professor_courses")
      .select("abbreviation", knex.ref("class_number").as("number"))
      .innerJoin("courses", "professor_courses.course_id", "courses.course_id")
      .innerJoin("subjects", "courses.subject_id", "subjects.subject_id")
      .where("professor_id", pid);
  }

  private addProfessorPagination(page?: number, qb?: Knex.QueryBuilder) {
    if (!qb) qb = this.queryBuilder;
    this.queryBuilder.whereNull("preview_metrics.course_id");
    qb.orderBy("score", "desc").limit(this.professorResultLimit);
    if (page) qb.offset(page * this.professorResultLimit);
  }

  private addCoursePagination(page?: number, qb?: Knex.QueryBuilder) {
    if (!qb) qb = this.queryBuilder;
    qb.limit(this.courseResultLimit);
    if (page) qb.offset(page * this.courseResultLimit);
  }

  private addWhereLikes(
    qB: Knex.QueryBuilder,
    tokens: string[],
    ...columns: string[]
  ) {
    tokens.map((token) => {
      qB.andWhere((qB) =>
        columns.map((column) => {
          qB.orWhereILike(column, `%${token}%`);
        })
      );
    });
  }

  private joinProfessorTables(qb?: Knex.QueryBuilder) {
    if (!qb) qb = this.queryBuilder;
    qb.innerJoin(
      "professors",
      "preview_metrics.professor_id",
      "professors.professor_id"
    ).leftJoin(
      "quality_ratings",
      "preview_metrics.quality_rating_id",
      "quality_ratings.quality_rating_id"
    );
  }

  private joinCourseTables(qb?: Knex.QueryBuilder) {
    if (!qb) qb = this.queryBuilder;
    qb.leftJoin(
      "courses",
      "preview_metrics.course_id",
      "courses.course_id"
    ).leftJoin("subjects", "courses.subject_id", "subjects.subject_id");
  }
}
