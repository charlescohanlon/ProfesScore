/* FE and BE shared types */
export type SearchType = "professor" | "course" | "score";

export interface SearchQuery {
  type: SearchType;
  pq?: string;
  cq?: string;
  dq?: string;
  sq?: [number, number];
}

export interface Professor {
  firstName: string;
  lastName: string;
}

export interface Course {
  cid: number;
  abbreviation: string;
  number: string;
  department: string;
}

export type CourseName = Omit<Course, "department">;

export type Previews = ProfessorPreview[] | CoursePreview[];
export interface ProfessorPreview {
  pid: number;
  professor: Professor;
  taughtCourses: CourseName[];
  aRatio: number;
  passingRatio: number;
  numGrades: number;
  rating: number;
  score: number;
}

export interface CoursePreview {
  course: Course;
  professors: ProfessorPreview[];
}
