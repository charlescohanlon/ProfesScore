import CourseRepository from "../repositories/CourseRepository";
import { Course, CoursePreview, ProfessorPreview } from "../../types";
import ProfessorSearchService from "../services/ProfessorSearchService";
import { CourseQueryData } from "../types";

export default class CourseSearchService {
  private readonly courseRepo: CourseRepository;
  private readonly professorService: ProfessorSearchService;
  private lastQuery?: number;
  constructor(
    courseRepo: CourseRepository,
    profService: ProfessorSearchService
  ) {
    this.courseRepo = courseRepo;
    this.professorService = profService;
  }

  async searchByCourse(
    type: "title" | "department",
    tokenStr: string,
    page?: number
  ): Promise<CoursePreview[]> {
    let courseQueryResults: CourseQueryData[];
    let tokens = tokenStr.split(" ").filter((token) => token.length > 0);

    if (type === "title") {
      courseQueryResults = await this.courseRepo.getCoursesForTitle(
        tokens,
        page
      );
    } else {
      courseQueryResults = await this.courseRepo.getCoursesForDepartment(
        tokens,
        page
      );
    }
    const previews = await this.createCoursePreviews(courseQueryResults);
    return previews;
  }

  private async createCoursePreviews(
    courseQueryResults: CourseQueryData[]
  ): Promise<CoursePreview[]> {
    const resultMap = new Map<string, ProfessorPreview[]>();
    for (const result of courseQueryResults) {
      const course: Course = {
        cid: result.cid,
        abbreviation: result.abbreviation,
        number: result.number,
        department: result.department,
      };

      const professor: ProfessorPreview = {
        pid: result.pid,
        professor: { firstName: result.firstName, lastName: result.lastName },
        taughtCourses: await this.professorService.getTaughtCourses(result.pid),
        aRatio: result.aRatio,
        passingRatio: result.passingRatio,
        numGrades: result.numGrades,
        rating: result.rating,
        score: result.score,
      };

      const courseKey = JSON.stringify(course);
      if (resultMap.has(courseKey)) {
        resultMap.get(courseKey)?.push(professor);
      } else {
        resultMap.set(courseKey, [professor]);
      }
    }
    const previews: CoursePreview[] = [];
    for (const courseKey of resultMap.keys()) {
      const course = JSON.parse(courseKey) as Course;
      previews.push({
        course,
        professors: resultMap.get(courseKey)!,
      });
    }
    return previews.sort((a, b) => a.course.cid - b.course.cid);
  }
}
