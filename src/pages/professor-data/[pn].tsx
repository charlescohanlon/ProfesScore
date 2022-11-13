import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const professor = params!.pn;

  return { props: { professor } };
};

const FullProfessorData: NextPage = ({
  professor,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return <h1>This is the professor: {professor}</h1>;
};

export default FullProfessorData;
