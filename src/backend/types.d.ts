import { Course } from "../types";
/* backend types */
export interface ProfessorQueryData {
  pid: number;
  firstName: string;
  lastName: string;
  aRatio: number;
  passingRatio: number;
  numGrades: number;
  rating: number;
  score: number;
}

export type CourseQueryData = Course & ProfessorQueryData;
