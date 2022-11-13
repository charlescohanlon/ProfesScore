import { CourseQueryData } from "../types";
import SearchResultDao from "../daos/SearchResultDao";

export default class CourseRepository {
  private readonly dao: SearchResultDao;
  constructor(dao: SearchResultDao) {
    this.dao = dao;
  }

  async getCoursesForTitle(
    tokens: Array<string>,
    page?: number
  ): Promise<CourseQueryData[]> {
    return this.dao.searchForCourse(tokens, false, page);
  }

  async getCoursesForDepartment(
    tokens: Array<string>,
    page?: number
  ): Promise<CourseQueryData[]> {
    return this.dao.searchForCourse(tokens, true, page);
  }
}
