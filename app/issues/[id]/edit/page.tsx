import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
// import IssueForm from "../../_components/IssueForm";

const IssueForm = dynamic(
  // we lazy loading this component to fix the error "navigator is not defind"
  () => import("@/app/issues/_components/IssueForm"),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
