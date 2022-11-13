import {
  ProfessorPreview,
  CoursePreview,
  SearchQuery,
  Previews,
} from "../../types";

export function capitalize1stLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function parseCourseNum(courseNum: string): string {
  let i = 1;
  while (courseNum.charAt(i) === "0") ++i;
  return courseNum.substring(i);
}

export function queryToParamStr(query: SearchQuery): string {
  let queryStr = `type=${query.type}`;
  switch (query.type) {
    case "professor":
      return (queryStr += `&pq=${query.pq}`);
    case "course":
      return (queryStr += query.cq ? `&cq=${query.cq}` : `&dq=${query.dq}`);
    default:
      return (queryStr += `&sq=${query.sq![0]}&sq=${query.sq![1]}`);
  }
}

export function isProfessorPreview(
  elm: ProfessorPreview | CoursePreview
): elm is ProfessorPreview {
  return (elm as ProfessorPreview).pid !== undefined;
}

export function isPreviews(
  elm: ProfessorPreview[] | CoursePreview[]
): elm is Previews {
  return (elm[0] as ProfessorPreview).pid !== undefined;
}
