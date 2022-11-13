import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const course = params!.cn;
  return { props: { course } };
};

const FullCourseData: NextPage = ({
  course,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return <p>Course name is {course}</p>;
};

export default FullCourseData;
