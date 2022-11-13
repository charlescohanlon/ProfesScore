import { ProfessorQueryData } from "../types";
import { CourseName } from "../../types";
import SearchResultDao from "../daos/SearchResultDao";

export default class ProfessorRepository {
  private dao: SearchResultDao;
  constructor(dao: SearchResultDao) {
    this.dao = dao;
  }

  async getProfessorsByName(
    tokens: Array<string>,
    page?: number
  ): Promise<ProfessorQueryData[]> {
    return this.dao.searchForProfessor(tokens, page);
  }

  async getTaughtCourses(pid: number): Promise<CourseName[]> {
    return this.dao.queryTaughtCourses(pid);
  }

  async getProfessorsByScore(
    bounds: [number, number],
    page?: number
  ): Promise<ProfessorQueryData[]> {
    return this.dao.searchForScore(bounds, page);
  }
}
