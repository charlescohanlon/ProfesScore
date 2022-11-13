import ProfessorRepository from "../repositories/ProfessorRepository";
import { ProfessorPreview } from "../../types";
import { ProfessorQueryData } from "../types";
import { CourseName } from "../../types";

export default class ProfessorSearchService {
  private readonly profRepo: ProfessorRepository;
  constructor(repository: ProfessorRepository) {
    this.profRepo = repository;
  }

  async searchByProf(
    tokenStr: string,
    page?: number
  ): Promise<ProfessorPreview[]> {
    const tokens = tokenStr.split(" ").filter((token) => token.length > 0);
    const professorQueryResults: ProfessorQueryData[] =
      await this.profRepo.getProfessorsByName(tokens, page);
    const previews = this.createProfessorPreviews(professorQueryResults);
    return previews;
  }

  async searchByScore(
    bounds: [number, number],
    page?: number
  ): Promise<ProfessorPreview[]> {
    const scoreQueryResults = await this.profRepo.getProfessorsByScore(
      bounds,
      page
    );
    const previews = this.createProfessorPreviews(scoreQueryResults);
    return previews;
  }

  private async createProfessorPreviews(
    professorQueryResults: ProfessorQueryData[]
  ): Promise<ProfessorPreview[]> {
    return Promise.all(
      professorQueryResults.map(
        async ({
          firstName,
          lastName,
          pid,
          aRatio,
          passingRatio,
          numGrades,
          rating,
          score,
        }) => {
          return {
            pid,
            professor: { firstName, lastName },
            taughtCourses: await this.getTaughtCourses(pid),
            aRatio,
            passingRatio,
            numGrades,
            rating,
            score,
          };
        }
      )
    );
  }

  async getTaughtCourses(pid: number): Promise<CourseName[]> {
    let taughtCourses = await this.profRepo.getTaughtCourses(pid);
    return taughtCourses.map((course) => JSON.parse(JSON.stringify(course))); // serialize courses for nextjs API
  }
}
