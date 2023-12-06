import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
// import IssueForm from '../_components/IssueForm'

const IssueForm = dynamic(
  // we are lazy loading IssueForm-component for the better ux
  () => import("@/app/issues/_components/IssueForm"),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
