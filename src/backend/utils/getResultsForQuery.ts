import {
  ProfessorPreview,
  CoursePreview,
  SearchQuery,
  Previews,
} from "../../types";
import SearchResultDao from "../daos/SearchResultDao";
import CourseRepository from "../repositories/CourseRepository";
import ProfessorRepository from "../repositories/ProfessorRepository";
import CourseSearchService from "../services/CourseSearchService";
import ProfessorSearchService from "../services/ProfessorSearchService";

export async function getResultsForQuery(
  query: SearchQuery,
  page?: number
): Promise<Previews> {
  const resultDAO = new SearchResultDao();
  const professorService = new ProfessorSearchService(
    new ProfessorRepository(resultDAO)
  );
  const courseService = new CourseSearchService(
    new CourseRepository(resultDAO),
    professorService
  );

  switch (query.type) {
    case "professor":
      return professorService.searchByProf(query.pq!, page);
    case "course":
      if (query.cq)
        return courseService.searchByCourse("title", query.cq!, page);
      else return courseService.searchByCourse("department", query.dq!, page);
    default:
      return professorService.searchByScore(query.sq!, page);
  }
}
