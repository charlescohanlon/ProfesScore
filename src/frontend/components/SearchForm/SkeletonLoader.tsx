export function ProfessorSkeleton() {
  return (
    <div className="animate-pulse w-full h-10 bg-slate-200 rounded-full"></div>
  );
}

export function CourseAndDepartmentSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="animate-pulse w-full h-10 bg-slate-200 rounded-full"></div>
      <div className="self-center my-1 animate-pulse w-10 h-10 bg-slate-200 rounded"></div>
      <div className="animate-pulse w-full h-10 bg-slate-200 rounded-full"></div>
    </div>
  );
}

export function ScoreSkeleton() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row w-full justify-center items-center">
        <div className="my-1 mr-5 animate-pulse w-20 h-10 bg-slate-200 rounded-full"></div>
        <div className="animate-pulse w-full h-5 bg-slate-200 rounded-full"></div>
        <div className="my-2 ml-5 animate-pulse w-20 h-10 bg-slate-200 rounded-full"></div>
      </div>
      <div className="my-3 animate-pulse w-36 h-10 bg-slate-200 rounded-full"></div>
    </div>
  );
}
